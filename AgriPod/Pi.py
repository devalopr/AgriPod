import pyrebase
import RPi.GPIO as GPIO
import subprocess
import datetime
import requests
import os

firebaseConfig = {
    "apiKey": "AIzaSyCVy7YXiWtHiy0DQiVPNynSJ4YnVGj8mnQ",
    "authDomain": "future-mystery-386708.firebaseapp.com",
    "databaseURL": "https://future-mystery-386708-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "future-mystery-386708",
    "storageBucket": "future-mystery-386708.appspot.com",
    "messagingSenderId": "1034881534169",
    "appId": "1:1034881534169:web:84d8c167a3a128ff0ad6c8",
    "measurementId": "G-65YZSV2QDB"
}


def send_to_firebase():
    db.push(data)
    print("Data sent to Firestore")


firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
storage = firebase.storage()
m_per = 0
n_per = 0
p_per = 0
k_per = 0
desired_n, desired_p, desired_k = 100, 50, 100  
npk_percentage = 20 
Pump_sec = 0
Fert_amt = 0
Farm_area = 1000
Required_irri = 10
Rainfall = 0
api_key = "27f8cc07ff23a0f6bfaa063c491e7eae"
lat = "8.9142"
lon = "76.6320"
data = {"M": m_per, "N": n_per,"P": p_per, "K": k_per, "FR": Fert_amt, "PS":Pump_sec}

button_pin = 2  
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN)  
GPIO.setup(27, GPIO.IN)  
GPIO.setup(22, GPIO.IN)  
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
gpio_pins = (17, 27, 22)


def button_callback(channel):
    print("Button was pushed!")
    image_path = capture_image()
    print(f"Image captured: {image_path}")
    upload_to_firebase(image_path)
    print("Image uploaded")
    fetch_weather_forecast(api_key, lat, lon)
    Fert_amt = calculate_fertilizer_requirement()
    db.push(data)
    print("Data sent to Firebase")


def capture_image():
    """Captures an image using the Raspberry Pi Camera."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    image_path = f"/home/devalopr/Desktop/code/images/{timestamp}.jpg"
    # Ensure the directory exists
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
    # Command to take a photo
    command = f"rpicam-still -o {image_path}"
    subprocess.run(command, shell=True)
    return image_path

def upload_to_firebase(image_path):
    """Uploads the given image to Firebase Storage."""
    cloud_path = f"images/{os.path.basename(image_path)}"
    storage.child(cloud_path).put(image_path)
    print(f"Image uploaded to Firebase Storage at {cloud_path}")
       
def read_3bit_to_percentage(gpio_pins):
    bit_values = [GPIO.input(pin) for pin in gpio_pins]
    decimal_value = bit_values[0] + (bit_values[1] << 1) + (bit_values[2] << 2)
    m_per = (decimal_value / 7) * 100
    
def calculate_irrigation():
    Pump_sec = (Required_irri - m_per - Rainfall)*42
    
def calculate_fertilizer_requirement():
    
    # Calculate the amount of fertilizer required for each nutrient
    n_fertilizer_required = (desired_n - n_per) / (npk_percentage / 100.0)
    p_fertilizer_required = (desired_p - p_per) / (npk_percentage / 100.0)
    k_fertilizer_required = (desired_k - k_per) / (npk_percentage / 100.0)
    
    # The actual amount of fertilizer needed is the maximum of the three calculated amounts
    fertilizer_required = max(n_fertilizer_required, p_fertilizer_required, k_fertilizer_required)
    
    return fertilizer_required
    
def fetch_weather_forecast(api_key, lat, lon):
    # URL for the OpenWeatherMap API (for forecast)
    url = "https://api.openweathermap.org/data/2.5/onecall"
    
    # Parameters for the API request
    params = {
        "lat": lat,
        "lon": lon,
        "appid": api_key,
        "units": "metric", 
        "exclude": "current,minutely,hourly,alerts"  # Excluding unnecessary data for simplicity
    }
    
    # Make the request
    response = requests.get(url, params=params)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        # Extract the expected rainfall from the forecast
        # Assuming we are interested in today's rainfall
        daily_forecast = data.get('daily', [])[0]  # Get today's forecast
        rainfall = daily_forecast.get('rain', 0)  # Default to 0 if no rain is forecasted
        return rainfall
    else:
        print("Failed to fetch weather data")
        return 0

GPIO.add_event_detect(button_pin, GPIO.FALLING,
                      callback=button_callback, bouncetime=200)

    
try:
    input("Press Enter to quit\n\n")
finally:
    GPIO.cleanup()

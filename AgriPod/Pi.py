import pyrebase
import RPi.GPIO as GPIO
import subprocess
import datetime
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
M_per = 0
N_per = 0
P_per = 0
K_per = 0
data = {"M": M_per, "N": N_per,"P": P_per, "K": K_per}

button_pin = 2  
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN)  
GPIO.setup(27, GPIO.IN)  
GPIO.setup(22, GPIO.IN)  
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
gpio_pins = (17, 27, 22)


def button_callback(channel):
    print("Button was pushed!")
    db.push(data)
    print("Data sent to Firestore")
    print("Button was pushed!")
    image_path = capture_image()
    print(f"Image captured: {image_path}")
    upload_to_firebase(image_path)


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
    M_percentage = (decimal_value / 7) * 100

GPIO.add_event_detect(button_pin, GPIO.FALLING,
                      callback=button_callback, bouncetime=200)

try:
    input("Press Enter to quit\n\n")
finally:
    GPIO.cleanup()

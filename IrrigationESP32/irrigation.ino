
 

//======================================== Including the libraries.
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
//======================================== 

//======================================== Insert your network credentials.
#define WIFI_SSID "Devadatham 2.4GHz"
#define WIFI_PASSWORD "dev@d@th@m21369"
//======================================== 

//Provide the token generation process info.
#include "addons/TokenHelper.h"

//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Defines the Digital Pin of the "On Board LED".
#define On_Board_LED 2

// Insert Firebase project API Key
#define API_KEY "AIzaSyCVh5i0n9nuKUk4LlxVyj2NhypB0pgSlzA"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://espfirebase-32c6d-default-rtdb.firebaseio.com/" 

//Define Firebase Data object.
FirebaseData fbdo;

// Define firebase authentication.
FirebaseAuth auth;

// Definee firebase configuration.
FirebaseConfig config;

//======================================== Millis variable to read data from firebase database.
unsigned long sendDataPrevMillis = 0;
const long intervalMillis = 10000; //--> Read data from firebase database every 10 seconds.
//======================================== 

// Boolean variable for sign in status.
bool signupOK = false;

float read_random_Float_Val;
int read_random_Int_Val;

//________________________________________________________________________________ VOID SETUP
void setup() {
  // put your setup code here, to run once:
  
  Serial.begin(115200);
  Serial.println();

  pinMode(On_Board_LED, OUTPUT);

  //---------------------------------------- The process of connecting the WiFi on the ESP32 to the WiFi Router/Hotspot.
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("---------------Connection");
  Serial.print("Connecting to : ");
  Serial.println(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");

    digitalWrite(On_Board_LED, HIGH);
    delay(250);
    digitalWrite(On_Board_LED, LOW);
    delay(250);
  }
  digitalWrite(On_Board_LED, LOW);
  Serial.println();
  Serial.print("Successfully connected to : ");
  Serial.println(WIFI_SSID);
  //Serial.print("IP : ");
  //Serial.println(WiFi.localIP());
  Serial.println("---------------");
  //---------------------------------------- 

  // Assign the api key (required).
  config.api_key = API_KEY;

  // Assign the RTDB URL (required).
  config.database_url = DATABASE_URL;

  // Sign up.
  Serial.println();
  Serial.println("---------------Sign up");
  Serial.print("Sign up new user... ");
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  Serial.println("---------------");
  
  // Assign the callback function for the long running token generation task.
  config.token_status_callback = tokenStatusCallback; //--> see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}
//________________________________________________________________________________

//________________________________________________________________________________ VOID LOOP
void loop() {
  // put your main code here, to run repeatedly:
  
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > intervalMillis || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();

    //---------------------------------------- The process of reading data from firebase database.
    Serial.println();
    Serial.println("---------------Get Data");
    digitalWrite(On_Board_LED, HIGH);
    
    if (Firebase.RTDB.getInt(&fbdo, "/Test/random_Float_Val")) {
      if (fbdo.dataType() == "float") {
        read_random_Float_Val = fbdo.floatData();
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
        Serial.print("random Float_Val : ");
        Serial.println(read_random_Float_Val);
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }

    Serial.println();
    
    if (Firebase.RTDB.getFloat(&fbdo, "/Test/random_Int_Val")) {
      if (fbdo.dataType() == "int") {
        read_random_Int_Val = fbdo.intData();
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
        Serial.print("random  Int_Val  : ");
        Serial.println(read_random_Int_Val);
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }

    digitalWrite(On_Board_LED, LOW);
    Serial.println("---------------");
    //---------------------------------------- 
  }
}
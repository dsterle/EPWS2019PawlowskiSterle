#include <Arduino.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <MFRC522.h> //library responsible for communicating with the module RFID-RC522
#include <SPI.h> //library responsible for communicating of SPI bus
#define SS_PIN    21
#define RST_PIN   22
#define ourTopic "100"
#define client_name "cranach"
#define painting_ID "2"

/* Pin Configuration:
VCC   -> 3V3
RST   -> 22
GND   -> GND
MISO  -> 19
MOSI  -> 23
SCK   -> 18
NSS   -> 21
IRQ   -> NC (Not Connected)
*/

int status = WL_IDLE_STATUS;
char ssid[] = "moxd-lab";
char pass[] = "gf3heTS11c";
char receiveMsg[1024];

WiFiClient espcClient;
PubSubClient client(espcClient);

void ByteToChar(byte* bytes, char* chars, unsigned int count)
{
    for (unsigned int i = 0; i < count; i++)
    {
      chars[i] = (char)bytes[i];
    }
}

void testCallback(char* topic, byte* payload, unsigned int length)
{
  ByteToChar(payload, receiveMsg, length);
}

void connectMQTT()
{
  Serial.println("[X] Attempting MQTT connection");
  while (!client.connected())
  {
    if (client.connect(client_name))
    {
      Serial.println("[X] MQTT connected");
      Serial.print("subscribe: ");
      Serial.println(client.subscribe(ourTopic));
    }
    else
    {
      Serial.println("[X] MQTT not connected. Try again in 1 sec");
      delay(1000);
    }
  }
}

void connectWIFI()
{
  Serial.println("[X] Attempting WiFi connection");
  while (status != WL_CONNECTED)
  {
    Serial.print("SSID: ");
    Serial.println(ssid);

    status = WiFi.begin(ssid, pass);
    delay(1000);
  }

  if (status != WL_CONNECTED)
  {
    Serial.println("[X] Couldn't get a wifi connection");
  }
  else
  {
    Serial.println("[X] WiFi connection established");
  }
}


// Defined pins to module RC522
MFRC522 mfrc522(SS_PIN, RST_PIN); 
void setup() 
{
  Serial.begin(9600);
  SPI.begin(); // Init SPI bus
  
  connectWIFI();
  client.setServer("hivemq.dock.moxd.io", 1883);
  client.setCallback(testCallback);
  connectMQTT();

  // Init MFRC522
  mfrc522.PCD_Init(); 
  Serial.println("Approach your reader card...");
  mfrc522.PCD_DumpVersionToSerial();

}

void loop() {
  if (!client.connected())
  {
    connectMQTT();
  }

  if(!mfrc522.PICC_IsNewCardPresent()){
    return;
  }
  if(!mfrc522.PICC_ReadCardSerial()){
    return;
  }
  
  //Informationsabruf des RFID-Gerätes
  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
  client.publish(ourTopic, painting_ID);
}
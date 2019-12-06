#include <Arduino.h>
#include <PubSubClient.h>
#include <WiFi.h> 
#include <MFRC522.h> //library responsible for communicating with the module RFID-RC522
#include <SPI.h> //library responsible for communicating of SPI bus

#define SS_PIN    21 //slave select pin
#define RST_PIN   22 //reset pin
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
// char ssid[] = "moxd-lab";
// char pass[] = "gf3heTS11c";
// char ssid[] = "FRITZ!Box 7430 LN";
// char pass[] = "57363119688740951515";
// char ssid[] = "prism";
// char pass[] = "hallo";

char ssid[] = "FRITZ!Box 7490";
char pass[] = "32213714005654579014";

char receiveMsg[1024];
int block = 2;  //block where the ID of the NFC Tag is written
int nfcTagsUIDs[] = {1073479220, 432423423};
char* lastTopic = (char* )"";

byte blockcontent[] = {"100"};  //ID that is written into a NFC tag
byte nfcTopic[3];  //ID that is read from the NFC Tag and the topic where the paintingID is published to
byte uid[16];

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance
MFRC522::MIFARE_Key mfrcKey;  // key which is necessary for authentication to write data into the NFC tag
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
    delay(4000);
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

int writeBlock(int blockNumber, byte arrayAddress[]) 
{
  //this makes sure that we only write into data blocks
  //every 4th block is a trailer block for the access/security info
  int largestModulo4Number = blockNumber / 4 * 4;
  int trailerBlock = largestModulo4Number + 3;  //determine trailer block for the sector
  if (blockNumber > 2 && (blockNumber + 1) % 4 == 0) {
    Serial.print(blockNumber);
    Serial.println(" is a trailer block:");
    return 2;
  } //block number is a trailer block (modulo 4); quit and send error code 2
  
  Serial.print(blockNumber);
  Serial.println(" is a data block:");
  
  //authentication of the desired block for access

  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &mfrcKey, &(mfrc522.uid));
  //this method is used to authenticate a certain block for writing or reading
  if (status != MFRC522::STATUS_OK) {
         Serial.print("PCD_Authenticate() failed: ");
         Serial.println(status);
         return 3;
  }

  //writing into the block   
  status = mfrc522.MIFARE_Write(blockNumber, arrayAddress, 16);
  if (status != MFRC522::STATUS_OK) {
           Serial.print("MIFARE_Write() failed: ");
           Serial.println(status);
           return 4;
  }
  Serial.println("block was written");
  return 0;
}

int readBlock(int blockNumber, byte arrayAddress[]) 
{
  int largestModulo4Number = blockNumber / 4 * 4;
  int trailerBlock = largestModulo4Number + 3;  

  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &mfrcKey, &(mfrc522.uid));

  if (status != MFRC522::STATUS_OK) {
         Serial.print("PCD_Authenticate() failed (read): ");
         Serial.println(status);
         return 3;
  }

  //reading the block     
  byte buffersize = 18; 
  status = mfrc522.MIFARE_Read(blockNumber, arrayAddress, &buffersize);
  if (status != MFRC522::STATUS_OK) {
          Serial.print("MIFARE_read() failed: ");
          Serial.println(status);
          return 4;
  }
  Serial.println("block was read");
  return 0;
}

boolean uidExists(byte* uid) {
  for (int i = 0; i < sizeof(nfcTagsUIDs); i++) {
    if(nfcTagsUIDs[i] == (int)uid) {
      return true;
    }
  }
  return false;
}

void setup() 
{
  Serial.begin(9600);
  SPI.begin(); // Init SPI bus
  
  connectWIFI();
  client.setServer("test.mosquitto.org", 1883);
  client.setCallback(testCallback);
  if (!client.connected()) {
     connectMQTT();
  }

  for (byte i = 0; i < 6; i++) {
    mfrcKey.keyByte[i] = 0xFF;
  }
  mfrc522.PCD_Init(); 
  Serial.println("Legen Sie einen NFC Tag auf den NFC Reader...");
}

void loop() {

  if(!mfrc522.PICC_IsNewCardPresent()){
    return;
  }
  if(!mfrc522.PICC_ReadCardSerial()){
    return;
  }

  if (!client.connected()) {
     connectMQTT();
  }

  //writeBlock(block, blockcontent); //write byte data in the block 2
  readBlock(block, nfcTopic);
  Serial.print("read content: ");
  for (int j = 0; j < 3; j++)
  {
    Serial.write (nfcTopic[j]); //transmits the ASCII numbers as human readable characters to serial monitor
  }

  Serial.print("\nuid: ");
  for (int i = 0; i < mfrc522.uid.size; i++) {
    uid[i] = mfrc522.uid.uidByte[i];
    Serial.print(uid[i]);
  }

  if(uidExists(uid)) {
    Serial.println("Topic: ");
    Serial.println((char*) nfcTopic);
    client.publish((char*) nfcTopic, painting_ID);
    Serial.println("published");
  } else {
    Serial.println("Der NFC Tag gehört nicht zum Lucas Cranach digital archive");
  }
  mfrc522.PCD_Init();
}
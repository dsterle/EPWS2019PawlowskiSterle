# Cranach erweiterte Interaktion

Willkommen zu unserem Projekt Cranach Erweiterte Interaktion!
Dieses Projekt findet im Rahmen des Kurses "Web-Development" an der TH-Köln im Studiengang Medieninformatik statt.

## Link zu der Web Anwendung 

https://dsterle.github.io/cranach_erweiterte_interaktion/

## Kontext :art:

Der Kontext ist der ein Besuch in einem Museum über Gemälde des Künstlers Lucas Cranach. Hierbei sollen dem Benutzer besondere Informationen über diese Gemälde zur Verfügung gestellt werden.

## Idee :bulb:

Nach etlichen Ideen über die Richtungen, in die unser System gehen kann (Sie finden unsere Entscheidungen unter dem Reiter Wiki im Kapitel Entscheidungslogbuch) haben wir nun eine Anwendung erstellt, die es dem Benutzer erleichtern soll, Informationen über das Gemälde, vor welchem er sich befindet, zu erhalten. Besonders wichtig war uns dabei der Gedanke, dass der Benutzer nicht extra eine native App auf seinem Smartphone installieren muss, da das mit einem zu großen Aufwand verbunden ist.
Des Weiteren war ein wichtiger Punkt für uns, dass die Gemälde im Museum eine größere Gewichtung haben als das Handy des Benutzers, denn in einem Museum möchte man nicht mit seinem Smartphone beschäftigt sein, sondern man möchte sich auf die Bilder konzentrieren.
Unsere Anwendung ist so konzipiert, dass man die Informationen über bestimmte Gemälde über seine Kopfhörer anhören kann und sein Handy dabei in der Hosentasche lassen kann. Natürlich kann man die Informationen aber auch visuell einsehen. Damit Sie sich ein besseres Bild davon machen können, folgt nun ein Szenario:

## Szenario :clapper:

Simon ist auf dem Weg zu einer Ausstellung über den Künstler Lucas Cranach. In dem Museum angekommen, bekommt er an der Rezeption den WLAN-Schlüssel und verbindet sich mit diesem. Nun öffnet er die Website des Lucas Cranach Museums. Außerdem bekommt er noch ein kleines Gerät ausgehändigt, einen NFC-Tag, welchen er lediglich vor ein Gemälde halten muss um Informationen zu diesem auf sein Handy zu bekommen. Auf dem NFC-Tag befindet sich eine Nummer, die Simon auf der Website des Museums eingibt. Nun verbindet er sein Smartphon mit seinen neuen Kopfhörern und steckt es in seine Hosentasche. Sobald Simon nun ein interessantes Gemälde sieht, über das er mehr erfahren möchte, hält er lediglich den NFC-Tag an das, vor dem Gemälde stehende, Lesegerät und über seine Kopfhörern beginnt eine Stimme über das Gemälde zu reden.

## Voraussetzungen, um das Projekt lokal aufzusetzen

* ein Microcontroller mit NFC-Reader
* ein WLAN-fähiges Gerät mit Zugang zu einem Browser (Idealerweise ein Smartphone)
* ein NFC-Tag des Lucas Cranach Museums
* ein MQTT-Broker (aktuell wird im Code der des moxd labs der TH Köln in Gummersbach verwendet)

## Projekt lokal aufsetzen

1. Repository klonen
2. Ins Verzeichnis "frontend-website" gehen
3. Command "npm install" ausführen
4. Command "npm run serve" ausführen
5. Code im Verzeichnis "painting-microcontroller" auf den Microcontroller laden
6. Microcontroller starten

Nun kann die Website geöffnet werden. Geben Sie anschließend die Nummer auf der Rückseite des NFC-Tags ein (Zu Testzwecken nehmen Sie unseren konfigurierten NFC-Tag und geben Sie "100" ein) und drücken auf "Ok". Nun halten Sie Ihr NFC-Tag an den NFC-Reader und erfahren Sie mehr über die Gemälde von Lucas Cranach... 


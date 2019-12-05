# inGuide: Unsere Anwendung

Willkommen zu unserem Projekt inGuide!
Dieses Projekt fand seinen Ursprung im Rahmen des Kurses "Web-Development" an der TH-Köln im Studiengang Medieninformatik. Aktuell wird es mit dem nun folgenden Problemraum und der Zielsetzung in dem Kurs "Entwicklungsprojekt" weiter entwickelt.

## :link: Link zur Web Anwendung 

https://dsterle.github.io/cranach_erweiterte_interaktion/

---

## Idee :bulb:

Nach etlichen Ideen über die Richtungen, in die unser System gehen kann haben wir nun im Rahmen des Kurses "Webdevelopment" eine Anwendung erstellt, die es dem Benutzer erleichtern soll, Informationen über das Gemälde, vor welchem er sich befindet, zu erhalten. Besonders wichtig war uns dabei der Gedanke, dass der Benutzer nicht extra eine native App auf seinem Smartphone installieren muss, da das mit einem zu großen Aufwand verbunden ist.
Des Weiteren war ein wichtiger Punkt für uns, dass die Gemälde im Museum eine größere Gewichtung haben als das Handy des Benutzers, denn in einem Museum möchte man nicht mit seinem Smartphone beschäftigt sein, sondern man möchte sich auf die Bilder konzentrieren.
Unsere Anwendung ist so konzipiert, dass man die Informationen über bestimmte Gemälde über seine Kopfhörer anhören und sein Handy dabei in der Hosentasche lassen kann. Natürlich kann man die Informationen aber auch visuell einsehen. Damit Sie sich ein besseres Bild davon machen können, folgt nun ein Szenario:

## Szenario :clapper:

Simon ist auf dem Weg zu einer Ausstellung über den Künstler Lucas Cranach. In dem Museum angekommen, bekommt er an der Rezeption den WLAN-Schlüssel und verbindet sich mit diesem. Nun öffnet er die Website des Lucas Cranach Museums. Außerdem bekommt er noch ein kleines Gerät ausgehändigt, einen NFC-Tag, welchen er lediglich vor ein Gemälde halten muss um Informationen zu diesem auf sein Handy zu bekommen. Auf dem NFC-Tag befindet sich eine Nummer, die Simon auf der Website des Museums eingibt. Nun verbindet er sein Smartphon mit seinen neuen Kopfhörern und steckt es in seine Hosentasche. Sobald Simon nun ein interessantes Gemälde sieht, über das er mehr erfahren möchte, hält er lediglich den NFC-Tag an das, vor dem Gemälde stehende, Lesegerät und über seine Kopfhörern beginnt eine Stimme über das Gemälde zu reden.

## :exclamation: Problemraum

Dieses Projekt ist eine Weiterentwicklung des Systems aus dem Modul „Web-Development“. Der Problemraum ist ein Museumsbesuch, bei welchem dem Nutzer detaillierte Informationen über die Gemälde bereitgestellt werden, vor denen er sich gerade befindet, ohne dass dieser die ganze Zeit auf sein Handy schauen muss.

## :checkered_flag: Zielsetzung

Die neue Zielsetzung dieses Projekts besteht darin den vorhandenen Prototypen soweit wie möglich marktreif zu machen. Hierfür sollen notwendige Features, die diese Marktreife erst ermöglichen, identifiziert und implementiert werden. Des Weiteren sollen bis jetzt nicht berücksichtigte Perspektiven (die Sicht Museumsleiters, ...) miteinbezogen werden. Die Annäherung an die Marktreife soll durch eine Evaluation unterstützt werden.

## Voraussetzungen, um das Projekt lokal aufzusetzen

* ein Microcontroller mit NFC-Reader
* ein NFC-Tag
* ein WLAN-fähiges Gerät mit Zugang zu einem Browser (Idealerweise ein Smartphone)

## Projekt lokal aufsetzen

1. Repository klonen
2. Ins Verzeichnis "frontend-website" gehen
3. Command "npm install" ausführen
4. Command "npm run serve" ausführen
5. Code im Verzeichnis "painting-microcontroller" auf den Microcontroller laden (gegebenenfalls vorher die Variablen "ssID" und "pass" im Code anpassen, um sich mit dem WLAN verbinden zu können)
6. Microcontroller starten

Nun kann die Website geöffnet werden. Geben Sie anschließend die Nummer auf der Rückseite des NFC-Tags ein (Zu Testzwecken nehmen Sie unseren konfigurierten NFC-Tag und geben Sie "100" ein) und drücken auf "Ok". Nun halten Sie Ihr NFC-Tag an den NFC-Reader und erfahren Sie mehr über das jeweilige Gemälde... 


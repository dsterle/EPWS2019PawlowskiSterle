<template>
  <div class="documentation">
    <nav class="navlist">
      <p class="inhaltsverzeichnis-headline normal-text">Inhaltsverzeichnis</p>
      <ul>
        <li class="navlist-item">
          <a href="#kontext">Kontext</a>
        </li>
        <li class="navlist-item">
          <a href="#idee">Idee</a>
        </li>
        <li class="navlist-item">
          <a href="#szenario">Szenario</a>
        </li>
        <li class="navlist-item">
          <a href="#vorraussetzungen">Vorraussetzungen</a>
        </li>
        <li class="navlist-item">
          <a href="#projektlokalaufsetzen">Projekt lokal aufsetzen</a>
        </li>
        <li class="navlist-item">
          <a href="#konzept">Konzept</a>
        </li>
        <li class="navlist-item">
          <a href="#userjourney">User Journey</a>
        </li>
        <li class="navlist-item">
          <a href="#behindthescenes">Behind the scenes</a>
        </li>
        <li class="navlist-item">
          <a href="#urluebersicht">URL-Übersicht</a>
        </li>
        <li class="navlist-item">
          <a href="#zeitplan">Zeitplan</a>
        </li>
        <li class="navlist-item">
          <a href="#entscheidungslogbuch">Entscheidungslogbuch</a>
        </li>
        <li class="navlist-item">
          <a href="#browserkompatibilitaet">Browserkompatibilität</a>
        </li>
        <li class="navlist-item">
          <a href="#offenepunkte">Offene Punkte</a>
        </li>
        <li class="navlist-item">
          <a href="#fazit">Fazit</a>
        </li>
        <li class="navlist-item">
          <a href="#problemebeiderentwicklung">Probleme bei der Entwicklung</a>
        </li>
        <li class="navlist-item">
          <a href="#projektarbeit">Projektarbeit</a>
        </li>
      </ul>
      <p class="footnote">
        Autoren: Dennis Sterle und Hendrik Gregor Pawlowski
      </p>
    </nav>
    <div class="content">
      <h1 class="first-headline removeBorder">Cranach erweiterte Interaktion</h1>
      <p
        class="hint-text"
      >Willkommen zu unserem Projekt Cranach Erweiterte Interaktion! Dieses Projekt findet im Rahmen des Kurses "Web-Development" an der TH-Köln im Studiengang Medieninformatik statt.</p>
      <h2 id="kontext" class="title-text jump-item">Kontext</h2>
      <p
        class="hint-text"
      >Der Kontext ist der ein Besuch in einem Museum über Gemälde des Künstlers Lucas Cranach. Hierbei sollen dem Benutzer besondere Informationen über diese Gemälde zur Verfügung gestellt werden.</p>
      <h2 id="idee" class="title-text jump-item">Idee</h2>
      <p
        class="hint-text"
      >Nach etlichen Ideen über die Richtungen, in die unser System gehen kann (Sie finden unsere Entscheidungen unter dem Reiter Wiki im Kapitel Entscheidungslogbuch) haben wir nun eine Anwendung erstellt, die es dem Benutzer erleichtern soll, Informationen über das Gemälde, vor welchem er sich befindet, zu erhalten. Besonders wichtig war uns dabei der Gedanke, dass der Benutzer nicht extra eine native App auf seinem Smartphone installieren muss, da das mit einem zu großen Aufwand verbunden ist. Des Weiteren war ein wichtiger Punkt für uns, dass die Gemälde im Museum eine größere Gewichtung haben als das Handy des Benutzers, denn in einem Museum möchte man nicht mit seinem Smartphone beschäftigt sein, sondern man möchte sich auf die Bilder konzentrieren. Unsere Anwendung ist so konzipiert, dass man die Informationen über bestimmte Gemälde über seine Kopfhörer anhören kann und sein Handy dabei in der Hosentasche lassen kann. Natürlich kann man die Informationen aber auch visuell einsehen. Damit Sie sich ein besseres Bild davon machen können, folgt nun ein Szenario:</p>
      <h2 id="szenario" class="title-text jump-item">Szenario</h2>
      <p
        class="hint-text"
      >Simon ist auf dem Weg zu einer Ausstellung über den Künstler Lucas Cranach. In dem Museum angekommen, bekommt er an der Rezeption den WLAN-Schlüssel und verbindet sich mit diesem. Nun öffnet er die Website des Lucas Cranach Museums. Außerdem bekommt er noch ein kleines Gerät ausgehändigt, einen NFC-Tag, welchen er lediglich vor ein Gemälde halten muss um Informationen zu diesem auf sein Handy zu bekommen. Auf dem NFC-Tag befindet sich eine Nummer, die Simon auf der Website des Museums eingibt. Nun verbindet er sein Smartphon mit seinen neuen Kopfhörern und steckt es in seine Hosentasche. Sobald Simon nun ein interessantes Gemälde sieht, über das er mehr erfahren möchte, hält er lediglich den NFC-Tag an das, vor dem Gemälde stehende, Lesegerät und über seine Kopfhörern beginnt eine Stimme über das Gemälde zu reden.</p>
      <h2
        id="vorraussetzungen"
        class="title-text jump-item"
      >Voraussetzungen, um das Projekt lokal aufzusetzen</h2>
      <ul class="listWithoutTable">
        <li>ein Microcontroller mit NFC-Reader</li>
        <li>ein WLAN-fähiges Gerät mit Zugang zu einem Browser (Idealerweise ein Smartphone)</li>
        <li>ein NFC-Tag des Lucas Cranach Museums</li>
      </ul>
      <h2 id="projektlokalaufsetzen" class="title-text jump-item">Projekt lokal aufsetzen</h2>
      <ol class="listWithoutTable">
        <li>Repository klonen</li>
        <li>Ins Verzeichnis "frontend-website" gehen</li>
        <li>Command "npm install" ausführen</li>
        <li>Command "npm run serve" ausführen</li>
        <li>Code im Verzeichnis "painting-microcontroller" auf den Microcontroller laden (gegebenenfalls vorher die</li>
        <li>Variablen "ssID" und "pass" im Code anpassen, um sich mit dem WLAN verbinden zu können)</li>
        <li>Microcontroller starten</li>
      </ol>
      <p
        class="hint-text"
      >Nun kann die Website geöffnet werden. Geben Sie anschließend die Nummer auf der Rückseite des NFC-Tags ein (Zu Testzwecken nehmen Sie unseren konfigurierten NFC-Tag und geben Sie "100" ein) und drücken auf "Ok". Nun halten Sie Ihr NFC-Tag an den NFC-Reader und erfahren Sie mehr über die Gemälde von Lucas Cranach...</p>
      <h2 id="konzept" class="headline jump-item">Konzept</h2>
      <img src="../../../_material/konzept.png" alt="konzept" />
      <h2 id="userjourney" class="title-text jump-item">User Journey</h2>
      <p
        class="hint-text"
      >Als allererstes bekommt der Benutzer das Passwort für das WLAN-Netzwerk des Museums und kann sich mit diesem verbinden. Als nächstes wird dem Benutzer ein NFC-Tag ausgehändigt. Auf diesem NFC-Tag befindet sich eine Nummer. Anschließend öffnet er auf seinem Smartphone die Website des Museums und kann diese Nummer im Frontend eingeben. Bei seinem Museumsbesuch kann der Nutzer nun zu einem beliebigen Gemälde gehen. Vor jedem Gemälde ist ein Microcontroller mit einem NFC-Lesegerät angebracht. Damit sich die URL mit spezifischen Informationen zu einem Gemälde öffnet, muss der Nutzer lediglich zu eben diesem gehen und kann seinen NFC-Tag vor den Microcontroller halten.</p>
      <h2 id="behindthescenes" class="title-text jump-item">Behind the scenes</h2>
      <p
        class="hint-text"
      >Jeder NFC-Tag ist mit einer user_ID ausgestattet und jedes Gemälde mit einer painting_ID. Die Nummer, die der Nutzer am Anfang auf der Home-Seite eingibt und bestätigt, ist die user_ID. Sobald ein Nutzer seinen NFC-Tag vor einen Microcontroller hält, liest das jeweilige NFC-Lesegerät die user_ID aus und published eine Nachricht mit dem topic user_ID und dem Inhalt painting_ID. Die Website, die auf dem Smartphone des Nutzers offen ist subscribed das topic user_ID Nun weiß die Website welche URL sie öffnen muss:</p>
      <h2 id="urluebersicht" class="title-text jump-item">URL Übersicht</h2>
      <table>
        <tr>
          <th class="url-column">URL</th>
          <th>Inhalt</th>
          <th>Beispiel</th>
        </tr>
        <tr>
          <td>/</td>
          <td>Home-Seite; hier kann der Benutzer die Nummer eingeben, die sich auf seinem Transponder befindet</td>
          <td>https://dsterle.github.io/cranach_erweiterte_interaktion/</td>
        </tr>
        <tr>
          <td>/waiting/:user_id</td>
          <td>Waiting-Seite; hier wird der Benutzer aufgefordert seinen Transponder an einen NFC-Reader vor ein Gemälde zu halten; die user_id ist die Nummer, die der Benutzer auf der Home-Seite eingegeben und bestätigt hat</td>
          <td>https://dsterle.github.io/cranach_erweiterte_interaktion/#/waiting/100</td>
        </tr>
        <tr>
          <td>/user/:user_id/painting/:painting_id</td>
          <td>Painting-Seite; hier werden dem Benutzer Information über das Gemälde mit der jeweiligen painting_id angezeigt und über Lautsprecher abgespielt</td>
          <td>https://dsterle.github.io/cranach_erweiterte_interaktion/#/user/100/painting/1</td>
        </tr>
        <tr>
          <td>/docs</td>
          <td>Docs-Seite; hier befindet sich die Dokumentation unseres Projekts</td>
          <td>https://dsterle.github.io/cranach_erweiterte_interaktion/#/docs</td>
        </tr>
      </table>
      <h2 id="zeitplan" class="title-text jump-item">Zeitplan</h2>
      <table>
        <tr>
          <th>Thema</th>
          <th>Zeitaufwand</th>
          <th>Links</th>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Recherche über die API Webbluetooth von Google</li>
              <li>Erste Implementierungsversuche um sich aus dem Browser mit einem Bluetooth Device zu verbinden</li>
            </ul>
          </td>
          <td>2 Tage</td>
          <td>
            <a
              href="https://webbluetoothcg.github.io/web-bluetooth/"
            >https://webbluetoothcg.github.io/web-bluetooth/</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Recherche über die API Web NFC von der Web NFC Community Group</li>
            </ul>
          </td>
          <td>1 Tag</td>
          <td>
            <a href="https://w3c.github.io/web-nfc/">https://w3c.github.io/web-nfc/</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Ideenfindung, Entwicklung und Ausarbeitung eines Konzepts</li>
            </ul>
          </td>
          <td>3 Tage</td>
          <td>
            <a
              href="https://github.com/dsterle/cranach_erweiterte_interaktion/wiki/Konzept"
            >https://github.com/dsterle/cranach_erweiterte_interaktion/wiki/Konzept</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Erstellen der einzelnen Screens für unser Frontend im Webbrowser</li>
            </ul>
          </td>
          <td>2 Tage</td>
          <td>
            <a
              href="https://www.figma.com/file/FNNS1oMtWXAHqQP4qxJbVq/Cranach-erweiterte-Interaktion?node-id=0%3A1"
            >https://www.figma.com/file/FNNS1oMtWXAHqQP4qxJbVq/Cranach-erweiterte-Interaktion?node-id=0%3A1</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Recherche über geeignete Library für einen NFC-Reader, um diesen mit dem ESP-32 zu verbinden</li>
              <li>Testcoding</li>
            </ul>
          </td>
          <td>1 Tag</td>
          <td>
            <a
              href="https://www.instructables.com/id/MFRC522-RFID-Reader-Interfaced-With-NodeMCU/"
            >https://www.instructables.com/id/MFRC522-RFID-Reader-Interfaced-With-NodeMCU/</a>
            <br />
            <a
              href="https://steemit.com/utopian-io/@drencolha/mfrc522-rfid-reader-arduino-library-setup-and-functions-usage-shown-with-an-example-project-tutorial"
            >https://steemit.com/utopian-io/@drencolha/mfrc522-rfid-reader-arduino-library-setup-and-functions-usage-shown-with-an-example-project-tutorial</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Recherche über geeignete Pin-verknüpfung zwischen NFC-Reader und ESP-32</li>
            </ul>
          </td>
          <td>1 Tag (+ Verzögerung durch defekten NFC-Reader)</td>
          <td>
            <a
              href="https://www.instructables.com/id/ESP32-With-RFID-Access-Control/"
            >https://www.instructables.com/id/ESP32-With-RFID-Access-Control/</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Implementierung des NFC-Teils (reading, writing, checking)</li>
            </ul>
          </td>
          <td>3 Tage</td>
          <td>
            <a
              href="https://www.instructables.com/id/RFID-Tag-Reading-and-Writing-TfCD-Project/"
            >https://www.instructables.com/id/RFID-Tag-Reading-and-Writing-TfCD-Project/</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Aneignung von Vue js</li>
            </ul>
          </td>
          <td>5 Tage</td>
          <td>
            <a href="https://vuejs.org/v2/guide/">https://vuejs.org/v2/guide/</a>
            <br />
            <a
              href="https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/"
            >https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Implementierung des Frontend-Teils</li>
            </ul>
          </td>
          <td>8 Tage</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Recherche über Möglichkeit auf Buttons von Kopfhörern zu reagieren</li>
            </ul>
          </td>
          <td>2 Tage</td>
          <td>
            <a
              href="https://github.com/gnaudio/jabra-browser-integration"
            >https://github.com/gnaudio/jabra-browser-integration</a>
            <br />
            <a
              href="https://stackoverflow.com/questions/53467169/bluetooth-headphones-button-event-detection-in-javascript "
            >https://stackoverflow.com/questions/53467169/bluetooth-headphones-button-event-detection-in-javascript</a>
            <br />
            <a
              href="https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Audio_Channels_API/Using_the_AudioChannels_API"
            >https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Audio_Channels_API/Using_the_AudioChannels_API</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Deployment der Frontend-Website auf Github Pages</li>
            </ul>
          </td>
          <td>2 Tage</td>
          <td>
            <a
              href="https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd"
            >https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd</a>
            <br />
            <a
              href="https://cli.vuejs.org/guide/deployment.html"
            >https://cli.vuejs.org/guide/deployment.html</a>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>Bug Fixing</li>
            </ul>
          </td>
          <td>3 Tage</td>
          <td></td>
        </tr>
      </table>
      <p
        class="hint-text"
      >Die angegebenen Tage Zeitaufwand sind eine Schätzung und dienen lediglich zur Übersicht.</p>
      <h2 id="entscheidungslogbuch" class="headline jump-item">Entscheidungslogbuch</h2>
      <h2 class="entscheidungs-headline removeBorder">QR</h2>
      <p
        class="hint-text"
      >Der Nutzer soll Informationen über ein Gemälde auf seinem Smartphone angezeigt bekommen. Unsere Idee ist ein QR-Code neben den Gemälden, der eine URL spezifiziert. Sobald man diesen scannt wird auf dem Smartphone die URL geöffnet.</p>
      <p
        class="sub-text"
      >Wir haben uns gegen diese Idee entschieden, da zum einen nicht jeder Nutzer einen QR-Code Scanner installiert hat und zum anderen die User Journey sehr kompliziert ist: QR-Code Scanner suchen vor ein Gemälde halten, eventuell ist das Licht schlecht oder andere Leute versperren den Weg usw...</p>
      <h2 class="entscheidungs-headline">Idee Bluetooth Beacons</h2>
      <p
        class="hint-text"
      >Man kann mithilfe des Webbrowsers nach BLE Beacons scannen, ohne eine App instaliert haben zu müssen. Der Benutezr soll also nur eine Website öffnen und somit nach in der Nähe liegenden Beacons scannen können.</p>
      <p class="sub-text">
        Das Problem ist, dass die API mit der wir arbeiten (webbluetooth) noch nicht vollständig in den Browsern implementiert ist. Man kann sich bis jetzt nur aus dem Browser heraus mit anderen Bluetooth Geräten verbinden, jedoch nicht nach Beacons scannen. Die Funktionalität ist allerdings schon in der webbluetooth API dokumentiert, wird allerdings noch in den Browsern implementiert.
        <br />
        <a
          href="https://webbluetoothcg.github.io/web-bluetooth/scanning.html"
        >https://webbluetoothcg.github.io/web-bluetooth/scanning.html</a>
      </p>
      <h2 class="entscheidungs-headline">Javascript Framework VueJS</h2>
      <p
        class="hint-text"
      >Das Problem ist, dass wir für eine Reihe aus Gemälden einen ähnlichen Screen erzeugen wollen. Das Bild soll immer an der selben Stelle stehen, der Titel soll immer gleich zentriert sein usw... Also brauchen wir eine Technologie, mit der man Screenelemente generalisieren kann und auf unterschiedlichen Content übertragen kann, ohne jedes mal das Design und die Funktionen neu zu erstelen.</p>
      <p
        class="sub-text"
      >Wir haben uns für VueJS entschieden, da wir bereits in der Vorlesung einen Workshop dazu gemacht hatten und uns ein wenig genauer in dieses Framework hineinlesen wollen. Des Weiteren hat uns die Dokumentation von VueJS sehr zugesagt. Zur Auswahl stand noch ReactJS, welches für unsere Zwecke jedoch etwas zu umfangreich ist.</p>
      <h2 class="entscheidungs-headline">Designentscheidungen</h2>
      <p class="hint-text">
        Wir haben uns für einen Mobile First Ansatz entschieden, da der Nutzer im Museum im wahrscheinlichsten Fall die Anwendung mit dem Smartphone bedient. Unsere Anwendung ist darauf ausgelegt, dass der Nutzer im Idealfall sein Smartphone in der Hosentasche lassen kann und sich die spezifischen Informationen zu einem Gemälde über Kopfhörer anhören kann, indem er lediglich den NFC-Tag vor einen Microcontroller hält. Der zweite Anwendungsfall wäre, dass der Nutzer sich lieber die Informationen durchlesen möchte. Für diesen Fall werden auf der Website nicht nur Audiodateien abgespielt, sondern die Informationen werden auch visuell dargestellt. Unsere Anwendung ist derzeit noch nicht responsive, wäre aber, sollten wir das Projekt über längeren Zeitraum verfolgen, eine Überlegung wert (eventuell hat der Nutzer ein iPad, oder eine Smartwatch, ...). Mockups und unseren Styleguide finden Sie hier:
        <br />
        <a
          href="https://www.figma.com/file/FNNS1oMtWXAHqQP4qxJbVq/Cranach-erweiterte-Interaktion?node-id=0%3A1"
        >https://www.figma.com/file/FNNS1oMtWXAHqQP4qxJbVq/Cranach-erweiterte-Interaktion?node-id=0%3A1</a>
      </p>
      <h2 class="entscheidungs-headline">Idee NFC</h2>
      <p
        class="hint-text"
      >Unsere Idee ist, dass der Nutzer bei einem Museumsbesuch sein Handy in der Hosentasche lassen kann und mit diesem nur über Kopfhörer verbunden ist. Sobald der Nutzer nun ein externes Gerät oder einen Chip vor ein Gemälde hält, so öffnet sich im Internetbrowser eine Seite und eine Audiodatei beginnt zu spielen. Der Nutzer soll hierbei keine Anwendung extra installieren müssen, sondern lediglich die Website des Cranach Archivs aufrufen müssen.</p>
      <p
        class="sub-text"
      >Unsere Idee ist dieses Konzept mit NFC umzusetzen, bei der der Nutzer einen NFC-Tag vom Museum erhält und mit diesen vor ein Gemälde halten kann, an welchen Microcontroller mit NFC-Lesegeräten installiert sind.</p>
      <h2
        class="entscheidungs-headline"
      >MQTT als Protokoll zur Umsetzung des Publish-Subscribe Paradigmas</h2>
      <p
        class="hint-text"
      >Message Queuing Telemetry Transport (MQTT) ist ein leichtgewichtiges offenes Nachrichtenprotokoll, welches Machine-to-Machine-Kommunikation ermöglicht. Es wurde entwickelt, um Nachrichten effizient zu transportieren und dabei ressourcensparend zu sein, weshalb es sich sehr gut für den IOT-Bereich eignet.</p>
      <p
        class="sub-text"
      >Wir haben uns für dieses Protokoll entschieden, da es für uns das geeignetste Protokoll zu sein scheint, um unseren Use Case zu erfüllen. In unserem System werden lediglich minimale Informationen ausgetauscht und das auch nur, wenn eine Veränderung eintritt (User hält NFC Tag an das Gemälde). Daher eignet sich zunächst einmal das Publish-Subscribe Paradigma für die Datenübertragung sehr gut. MQTT wurde extra für dieses Paradigma entwickelt und ermöglicht durch seine TLS-Erweiterung eine sichere Übertragung. Durch die lose Kopplung zwischen den Kommunikationspartnern kann eine schnelle Datenübertragung ermöglicht werden, auch zwischen mehreren Kommunikationspartnern.</p>
      <h2 class="entscheidungs-headline">howler.js als Javascript Framework für Audiomanipulation</h2>
      <p
        class="sub-text"
      >Wir haben uns innerhalb des Kurses "Frontend-Development 1" mit einem Javascript Framework names howler.js beschäftigt, mit welchem man Audiodateien abspielen und manipulieren kann. Wir benutzen dies ebenfalls in unserem Projekt um die Audios über die Gemäldeinformationen abspielen zu können.</p>
      <h2 id="browserkompatibilitaet" class="headline jump-item">Browserkompatibilität</h2>
      <table>
        <tr>
          <th>Browser</th>
          <th>Noch zu implementieren</th>
        </tr>
        <tr>
          <td>Google Chrome</td>
          <td>Audiodateien werden in seltenen Fällen nicht automatsich abgespielt</td>
        </tr>
        <tr>
          <td>Mozilla Firefox</td>
          <td>verbindet sich nicht mit dem MQTT-Broker</td>
        </tr>
        <tr>
          <td>Microsoft Edge</td>
          <td>Audiodateien werden in seltenen Fällen nicht automatsich abgespielt</td>
        </tr>
        <tr>
          <td>Opera</td>
          <td>Audiodateien werden in seltenen Fällen nicht automatsich abgespielt</td>
        </tr>
        <tr>
          <td>Safari</td>
          <td>Audiodateien werden in seltenen Fällen nicht automatsich abgespielt</td>
        </tr>
      </table>
      <p class="hint-text">
        Wir haben es leider nicht geschafft diese Punkte zu debuggen, da wir uns ebenfalls noch mit dem Themenbereich "Deployment von Vue-Anwendungen" beschäftigen wollten und somit eine Github Page für unser System angelegt haben:
        <br />
        <a
          href="https://dsterle.github.io/cranach_erweiterte_interaktion/"
        >https://dsterle.github.io/cranach_erweiterte_interaktion/</a>
      </p>
      <h2 id="offenepunkte" class="headline jump-item">Offene Punkte</h2>
      <p
        class="hint-text"
      >Die folgenden Punkte haben wir aus Zeit- oder anderweitigen Gründen nicht mehr in das Projekt integrieren können:</p>
      <ul class="listWithoutTable">
        <li>Backend der Website (REST-Architektur, Datenbank etc.); hier sollen die Informationen über Gemälde und die Audiodateien gespeichert werden</li>
        <li>Responsivität der Website (z.B. Tablet und Desktop)</li>
        <li>Verschiedene Modi für die Website (z.B. Auswahl zwischen automatischem- und manuellem Abspielen der Audios)</li>
        <li>Erstellung eines eigenen MQTT-Brokers</li>
        <li>Kompatibilität für alle Browser</li>
        <li>In unserer URL steht im Moment noch ein #, da unsere Vue Anwendung alles in die index.html hineinrendert. Der nächste Schritt wäre mithilfe von Nuxt.js mehrere html Seiten rendern zu können</li>
      </ul>
      <h2 id="fazit" class="headline jump-item">Fazit</h2>
      <p class="hint-text">
        Zum Ende hin stellt sich die Frage, ob wir unser anfänglich gestelltes Ziel erreicht haben. Die Antwort lautet: Ja! Unser Ziel war es ein System zu entwickeln, welches den Museumsbesuchern die Möglichkeit gibt, die Gemälde des Museums zu betrachten und sich zusätzliche Informationen anzueignen ohne dafür jedes Mal auf das Handy schauen zu müssen. Die Besucher müssen dafür lediglich ihren Transponder vor ein Gemälde (NFC-Reader) halten, die an das Smartphone angeschlossenen Kopfhörer einsetzen und das Handy kann in der Tasche bleiben.
        Zwar haben wir ursprünglich verschiedene Ansätze probiert (wie Sie im Entscheidungs-logbuch und im Zeitplan sehen können), sind jedoch der Ansicht die bestmögliche Umsetzung für diesen Use Case gefunden zu haben.
      </p>
      <h2 id="problemebeiderentwicklung" class="title-text jump-item">Probleme bei der Entwicklung</h2>
      <p class="hint-text">
        Eine große Herausforderung war die Aneignung von Vuejs. Da wir dieses Thema lediglich einmal in der Vorlesung behandelt haben, hat uns dieser Teil viel Zeit gekostet. Jedoch konnten wir dadurch unsere Kompetenzen in der Selbstaneignung von Wissen enorm verbessern.
        Abgesehen davon, hatten wir Probleme bei der Einbindung des Microcontrollers in unser System, da dieses Themenfeld groß ist und wir uns auch hier viele Dinge selbst aneignen mussten. Außerdem haben wir viel Zeit verloren, da wir erst nach einiger Zeit feststellen mussten, dass unser NFC-Reader defekt war.
      </p>
      <h2 id="projektarbeit" class="title-text jump-item">Projektarbeit</h2>
      <p
        class="hint-text"
      >Durch den intensiven Einsatz von Github in den vergangenen Monaten, konnten wir hervorragend kol­la­bo­ra­tiv arbeiten, ohne uns dafür extra verabreden zu müssen. Wir haben neue Möglichkeiten kennengelernt, die Github bereitstellt und uns bei der gemeinsamen Entwicklung enorm geholfen haben.</p>
      <p
        class="hint-text"
      >Zusammengefasst können wir guten Gewissens sagen, dass wir im Rahmen dieses Projekts viele Dinge gelernt und neue Kompetenzen erworben haben, die uns im weiteren Verlauf unseres Studiums, aber auch im Berufsleben helfen werden.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docs",
  data() {
    return {
      navItems: [],
      jumpItems: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";
.documentation {
  display: flex;
  color: $lighter;
  line-height: 130%;

  .navlist {
    padding-left: 32px;
    padding-top: $abstand-S;
    position: fixed;
    background: $evenDarker;
    width: 25%;
    height: 100%;

    a {
      color: white;
    }

    a:hover {
      color: $light;
    }

    .inhaltsverzeichnis-headline {
      padding-top: $abstand-M;
      padding-bottom: $abstand-L;
      font-size: 20px;
    }

    li {
      padding-top: 16px;
      font-weight: $weight-regular;
    }

    .currentListItem {
      color: $accent;
    }

    .footnote {
      font-size: $font-size-XS;
      font-style: italic;
      position: fixed;
      bottom: 5px;
    }
  }

  .content {
    scroll-behavior: smooth;
    width: 60vw;
    padding-left: 200px;
    margin-left: auto;
    margin-right: auto;

    .first-headline {
      padding-top: $abstand-L;
      color: white;
      line-height: 64px;
      font-size: 48px;
    }

    .headline,
    .title-text {
      color: $accentDark;
      font-size: 32px;
      font-weight: $weight-regular;
      border-top: $light solid 2px;
      padding-top: $abstand-XL;
      padding-right: $abstand-L;
    }
    p {
      padding: 0 0 0 0;
    }
    .entscheidungs-headline {
      // background: red;
      padding-top: $abstand-XL;
      font-size: $font-size-XL;
      line-height: $font-line-height-XL;
    }
    .removeBorder {
      border: none;
    }
    .hint-text {
      padding: $abstand-XS 0 0 0;
    }
    .sub-text {
      font-style: italic;
      line-height: $font-line-height-M;
      font-weight: normal;
    }
    img {
      padding-top: $abstand-M;
    }
    td,
    th {
      text-align: left;
      color: $lighter;
      font-weight: $weight-regular;
      // padding-left: $abstand-L;
      padding-top: $abstand-M;
      padding-bottom: $abstand-M;
      // padding-right: $abstand-L;
      // max-width: 400px;
      // width: 100%;
    }
    .url-column {
      width: 200px;
    }
    .listWithoutTable {
      padding: $abstand-L;
      li {
        padding-left: $abstand-L;
        padding-bottom: $abstand-S;
        padding-right: $abstand-L;
      }
    }
    a {
      color: $accent;
      text-decoration: none;
    }
    a:hover {
      color: $accentDark;
    }
  }
}
</style>
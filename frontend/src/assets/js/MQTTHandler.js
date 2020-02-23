server = {
    host: "test.mosquitto.org",
    port: 8081,
    reconnectTimeout: 10000
};

exports.handleMQTTConnection = function (this_component, topic) {
    // Erstelle einen MQTT-Client mit den jeweiligen Angaben für den Server
    const client = new Paho.MQTT.Client(
        server.host,
        server.port,
        ""
    );

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess: onConnect, useSSL: true });



    let currentPainting;

    // Wird aufgerufen, wenn sich der Client verbindet
    function onConnect() {
        client.subscribe(topic);
    }

    // Wird aufgerufen, wenn die Verbindung veloren geht
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
        client.connect({ useSSL: true });
    }
    // Wird aufgerufen, wenn die Nachricht ankommt
    function onMessageArrived(message) {
        // Die Nachricht beinhaltet die userid, mit der sich der Nutzer angemeldet hat
        // und die empfangene Nachricht: die Gemälde ID, des Gemäldes das geöffnet werden soll

        if (message.payloadString === this_component.$route.params.id) {
            return;
        } else if (message.payloadString === currentPainting) {
            return;
        } else {
            console.log("message: " + message.payloadString);
            this_component.$router.push({ name: 'painting', params: { userid: topic, id: message.payloadString } },
                () => { this_component.$router.go(0) });
        }
        currentPainting = message.payloadString;
    }
};
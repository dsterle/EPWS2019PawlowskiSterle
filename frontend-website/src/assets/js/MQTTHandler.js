server = {
    host: "test.mosquitto.org",
    port: 8081,
    reconnectTimeout: 10000
}

exports.handleMQTTConnection = function (this_component, topic) {
    // Erstelle einen MQTT-Client mit den jeweiligen Angaben für den Server
    var client = new Paho.MQTT.Client(
        server.host,
        server.port,
        "client"
    );

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess: onConnect, useSSL: true });

    // Wird aufgerufen, wenn sich der Client verbindet
    function onConnect() {
        client.subscribe(topic);
        console.log("subscricbed: " + topic);
    }

    // Wird aufgerufen, wenn die Verbindung veloren geht
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    // Wird aufgerufen, wenn die Nachricht ankommt
    function onMessageArrived(message) {
        console.log("message: " + message.payloadString)
        // Die Nachricht beinhaltet die userid, mit der sich der Nutzer angemeldet hat
        // und die empfangene Nachricht: die Gemälde ID, des Gemäldes das geöffnet werden soll
        var userid = topic;
        //this_component.$router.push({ path: `/user/${userid}/painting/${message.payloadString}`});
        this_component.$router.push({ name: 'painting', params: { userid: userid, id: message.payloadString } })
    }
}
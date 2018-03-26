

// host = '172.16.153.122';	// hostname or IP address
host = '18.217.3.199';	// hostname or IP address
port = 8086;
topic = '#';		// topic to subscribe to
useTLS = false;
username = null;
password = null;

var mqtt;
var reconnectTimeout = 2000;

function MQTTconnect() {
if (typeof path == "undefined") {
path = '/mqtt';
}
mqtt = new Paho.MQTT.Client(
  host,
  port,
  path,
  "web_" + parseInt(Math.random() * 100, 10)
);
    var options = {
        timeout: 3,
        useSSL: useTLS,
        cleanSession: cleansession,
        onSuccess: onConnect,
        onFailure: function (message) {
          //message.errorMessage
            $('#status').val("Connection failed: " + message.errorMessage + "Retrying");
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;

    if (username != null) {
        options.userName = username;
        options.password = password;
    }
    console.log("Host="+ host + ", port=" + port + ", path=" + path + " TLS = " + useTLS + " username=" + username + " password=" + password);
    mqtt.connect(options);
}

function onConnect() {
    $('#status').val('Connected to Server!');
    // Connection succeeded; subscribe to our topic
    mqtt.subscribe(topic, {qos: 0});
    $('#topic').val(topic);
}


function onConnectionLost(response) {
    setTimeout(MQTTconnect, reconnectTimeout);
    $('#status').val("connection lost: " + response.errorMessage + ". Reconnecting");

};
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function onMessageArrived(message) {

    var topic = message.destinationName;
    var payload = message.payloadString;
    var parse_data = JSON.parse(payload);
    //var phyPayload1 = b64DecodeUnicode(parse_data.data);
    //var buf = new Buffer(phyPayload1,'base64');
    //var payload2 = buf.toString();
    $('#ws').prepend('<li>' + topic + ' = ' + payload + '</li>');
};


$(document).ready(function() {
    MQTTconnect();
});


cleansession = true;

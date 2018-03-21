

// host = '172.16.153.122';	// hostname or IP address
host = '18.217.3.199';	// hostname or IP address
port = 8086;
topic = 'application/+/node/+/rx';		// topic to subscribe to
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
        timeout: 10,
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

function parseData (data, str) {
  var data_a = data.split(str);
  var data_b = data_a[1].split(':');
  var value = data_b[1].split(',');
  return value[0];
}
var rssi1,rssi, name, lat, long;
function onMessageArrived(message) {

    var topic = message.destinationName;
    var payload = message.payloadString;
    rssi = parseData(payload,'rssi');
    name = parseData(payload,'deviceName');
    lat = parseData(payload,'latitude');
    long = parseData(payload,'longitude');
    if (name == "Node_1") {
      $('#rssi1').prepend(parseData(payload,'rssi'));
      rssi1 = parseData(payload,'rssi');
    }
      $('#rssi1').prepend(parseData(payload,'rssi'));
      $('#name').val(parseData(payload,'deviceName'));
      $('#lat').val(parseData(payload,'latitude'));
      $('#long').val(parseData(payload,'longitude'));
      $('#ws').prepend('<li>' + parseData(payload,'deviceName') +';'+  parseData(payload,'rssi') + ';' + parseData(payload,'latitude') + ';'+ parseData(payload,'longitude') + '.' +'</li>');

};
function getdata( a, data) {
     //console.log(dot.pick(a,data));
     return dot.pick( a,data);
};

$(document).ready(function() {
    MQTTconnect();
});



cleansession = true;

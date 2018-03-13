
var serialport = require("serialport");
//var SerialPort = serialport.SerialPort; // localize object constructor
var comPort = '/dev/ttyPHA1';
var port = new serialport(comPort, {
     parser: serialport.parsers.readline("\r"),
     baudrate: 9600
  });

const
    client = require("socket.io-client"),
    socket = client.connect("http://192.168.1.11:5000");

    function delay(ms) {
       ms += new Date().getTime();
       while (new Date() < ms){}
    }

    socket.on('connect', function(){
      console.log("connected");
    });

    socket.on('message_client', function (data) {
      console.log(data);
      port.write(data);
    });
    socket.on('disconnect', function(){});
////////////////////////////
port.on("open", function () {
   console.log ("comm port ready");
});

port.on('readable', function () {
    console.log('Data:', port.read());
    socket.emit('new data2', port.read());
});

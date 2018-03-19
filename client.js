
var serialport = require("serialport");
//var SerialPort = serialport.SerialPort; // localize object constructor
var comPort = '/dev/ttyPHA1';
var port = new serialport(comPort, {
     parser: serialport.parsers.readline("\r"),
     baudrate: 9600
  });


const
    client = require("socket.io-client"),
    socket = client.connect("http://13.73.237.114:5000");

    function delay(ms) {
       ms += new Date().getTime();
       while (new Date() < ms){}
    }

    socket.on('connect', function(){
      console.log("connected!");
    });

    socket.on('message_client', function (data) {
      console.log(data);
      port.write(data);
      socket.emit('feedback', data);
    });
    var status;
    socket.on('client_control_status', function (data) {
      if (data == "run") {
        status = true;
      }else {
        status = false;
      }
      console.log("Status" + status);
    })
    socket.on('disconnect', function(){});
////////////////////////////
setInterval(function () {
  socket.emit('status', "Alive!");
  if (status == false) {
    socket.emit('control_status', "stop");
  }else {
    socket.emit('control_status', "run");
  }
  console.log(status);
}, 10000);
port.on("open", function () {
   console.log ("comm port ready");
});
port.on('data', function (data) {
  console.log('Data sent:', data);
  socket.broadcast.emit('feedback', data);
});
port.on('readable', function () {
    console.log('Data:', port.read());
    socket.emit('new data2', port.read());
});

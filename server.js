
// Setup basic express server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.engine('html', require('ejs').renderFile);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/data";

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}
function getNextSequenceValue(sequenceName){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("data");
        var sequenceDocument = dbo.counters.findAndModify({
        query:{_id: sequenceName },
        update: {$inc:{sequence_value:1}},
        new:true
          });
      return sequenceDocument.sequence_value;
    });
  }

function InsertToDatabase(data, gio, ngay) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("Error connect database");
    }
    var dbo = db.db("data");
    var myobj = { DuLieu: data, ThoiGian: gio, Ngay: ngay };
    dbo.collection("DuLieu").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

// Routing
app.get('/',function(req,res){
    res.sendFile(__dirname+'/web.html');
})

app.get('/data',function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("data");
    dbo.collection("DuLieu").find({}, function(err, result) {
      if (err) throw err;
      res.render(__dirname+'/data.ejs', {list:result} );
      db.close();
    });
  });
})

io.on('connection', function (socket) {
  console.log("New connection");
  socket.on('request', function(data) {
    console.log("Recived!");
    if (data == 12) {
      socket.emit('event', 12);
      console.log("Event sending!");
    }
  });
  socket.on('new data', function(data) {
    console.log(data);
    var date = new Date();
    InsertToDatabase(data, date.toLocaleTimeString(),date.toLocaleDateString());
    console.log("Success");
  });
});

http.listen(5000, function () {
  console.log("Server running with port 5000");
});

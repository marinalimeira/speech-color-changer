var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var log = true;
var mqtt = require('mqtt');

var port = process.env.PORT || 8080;

var mqttClient  = mqtt.connect('mqtt://broker.hivemq.com')
var mqttTopic = "marinalimeira/nodebots/rgb";

mqttClient.on('connect', function () {
  mqttClient.subscribe(mqttTopic)
  mqttClient.publish(mqttTopic, 'yellow')
})

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  socket.on('command', function(msg){
    mqttClient.publish(mqttTopic, msg);
    console.log('Sending "'+ msg + '".');
  });
});

http.listen(port, function(){
  console.log('HTTP listening on *:' + port);
});

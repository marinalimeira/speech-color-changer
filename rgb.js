var mqtt = require("mqtt");
var five = require("johnny-five");

five.Board().on("ready", function() {
  var client = mqtt.connect("mqtt://test.mosquitto.org");

  client.on('connect', function () {
    client.subscribe('marinalimeira/nodebots/rgb');
    console.log("Connected!");
  });

  var rgb = new five.Led.RGB({
    pins: [6, 5, 3],
    isAnode: true
  });

  client.on('message', function (topic, message) {
    message = message.toString().replace(/ /g,'');
    console.log("Received " + message + ".");
    try {
      rgb.color(message);
    } catch(err) {
      console.log(err);
    }
  });
});


var mqtt = require("mqtt");
var five = require("johnny-five");

five.Board().on("ready", function() {
  var client = mqtt.connect("mqtt://broker.hivemq.com");

  client.on('connect', function () {
    client.subscribe('marinalimeira/nodebots/rgb');
    console.log("Connected!");
  });

  var rgb = new five.Led.RGB({
    pins: [6, 5, 3],
    isAnode: true
  });

  var piezo = new five.Piezo(9);

  client.on('message', function (topic, message) {
    message = message.toString().replace(/ /g,'');

    console.log("Received " + message + ".");

    if (message == "playasong") {
      piezo.play({ song: [[ 440, 1/2 ], [ null, 1/6 ], [ 440, 1/2 ], [ null, 1/6 ], [ 440, 1/2 ], [ null, 1/6 ], [ 349, 1/3 ], [ null, 1/6 ], [ 523, 1/6 ], [ null, 1/6 ], [ 440, 1/2 ], [ null, 1/6 ], [ 349, 1/3 ], [ null, 1/6 ], [ 523, 1/6 ], [ null, 1/6 ], [ 440, 1 ], [ null, 1/6 ], [ 659, 1/2 ], [ null, 1/6 ], [ 659, 1/2 ], [ null, 1/6 ], [ 659, 1/2 ], [ null, 1/6 ], [ 698, 1/3 ], [ null, 1/6 ], [ 523, 1/6 ], [ null, 1/6 ], [ 415, 1/2 ], [ null, 1/6 ], [ 349, 1/3 ], [ null, 1/6 ], [ 523, 1/6 ], [ null, 1/6 ], [ 440, 1 ], [ null, 1/6 ], [ 880, 1/2 ], [ null, 1/6 ], [ 440, 1/3 ], [ null, 1/6 ], [ 440, 1/6 ], [ null, 1/6 ], [ 880, 1/2 ], [ null, 1/6 ], [ 830, 1/4 ], [ null, 1/6 ], [ 784, 1/4 ], [ null, 1/6 ], [ 740, 1/8 ], [ null, 1/6 ], [ 698, 1/8 ], [ null, 1/6 ], [ 740, 1/4 ], [ null, 1/6 ], [ null, 1/4 ], [ null, 1/6 ], [ 455, 1/4 ], [ null, 1/6 ], [ 622, 1/2 ], [ null, 1/6 ], [ 587, 1/4 ], [ null, 1/6 ], [ 554, 1/4 ], [ null, 1/6 ], [ 523, 1/8 ], [ null, 1/6 ], [ 466, 1/8 ], [ null, 1/6 ], [ 523, 1/4 ], [ null, 1/6 ], [ null, 1/4 ], [ null, 1/6 ], [ 349, 1/8 ], [ null, 1/6 ],[ 415, 1/2 ], [ null, 1/6 ], [ 349, 2/7 ], [ null, 1/6 ], [ 440, 1/8 ], [ null, 1/6 ], [ 523, 1/2 ], [ null, 1/6 ], [ 440, 2/7 ], [ null, 1/6 ], [ 523, 1/8 ], [ null, 1/6 ], [ 659, 1 ], [ null, 1/6 ], [ 880, 1/2 ], [ null, 1/6 ], [ 440, 1/3 ], [ null, 1/6 ], [ 440, 1/6 ], [ null, 1/6 ], [ 880, 1/2 ], [ null, 1/6 ], [ 830, 1/4 ], [ null, 1/6 ], [ 784, 1/4 ], [ null, 1/6 ], [ 740, 1/8 ], [ null, 1/6 ], [ 698, 1/8 ], [ null, 1/6 ], [ 740, 1/4 ], [ null, 1/6 ], [ null, 1/4 ], [ null, 1/6 ], [ 455, 1/4 ], [ null, 1/6 ], [ 622, 1/2 ], [ null, 1/6 ], [ 587, 1/4 ], [ null, 1/6 ], [ 554, 1/4 ], [ null, 1/6 ], [ 523, 1/8 ], [ null, 1/6 ], [ 466, 1/8 ], [ null, 1/6 ], [ 523, 1/4 ], [ null, 1/6 ], [ 349, 1/4 ], [ null, 1/6 ], [ 415, 1/2 ], [ null, 1/6 ], [ 349, 2/7 ], [ null, 1/6 ], [ 523, 1/8 ], [ null, 1/6 ], [ 440, 1/2 ], [ null, 1/6 ], [ 349, 2/7 ], [ null, 1/6 ], [ 261, 1/8 ], [ null, 1/6 ], [ 440, 1 ]], tempo: 100 });
    } else {
      try {
        rgb.color(message);
      } catch(err) {
        console.log(err);
      }
    }
  });
});

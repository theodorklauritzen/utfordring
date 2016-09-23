window.onload = function() {
  var canvas = document.getElementById("canvas");
  var c = canvas.getContext("2d");

  var control = new Block(c, 300, 450, 100, 20, {
    r: 255,
    g: 255,
    b: 255,
  });

  var particle = new Particle(c);

  var mouse = false;

  canvas.addEventListener("mousemove", function(evt) {
    mouse = {
      x: evt.x,
      y: evt.y
    };
  });

  var blocks = [];
  var score = {
    value: function() {
      return this.blocksDestroied;
    },
    blocksDestroied: 0,
    startTime: 0
  };

  setInterval(function() {
    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if(mouse) {
      var SPEED = 3;
      var mouseOff = control.info.width / 2;
      if(mouse.x < control.pos.x - SPEED + mouseOff && control.pos.x > 0) {
        control.pos.x -= SPEED;
      }
      if(mouse.x > control.pos.x + SPEED + mouseOff && control.pos.x < 700 - mouseOff * 2) {
        control.pos.x += SPEED;
      }
    }

    var spliceIndex = [];
    for(var i = 0; i < blocks.length; i++) {
      blocks[i].show();
      if(particle.hit(blocks[i])) {
        spliceIndex.push(i);
      }
    }
    for(var i = 0; i < spliceIndex.length; i++) {
      blocks.splice(spliceIndex, 1);
    }
    score.blocksDestroied += spliceIndex.length;

    control.show();

    particle.update();
    particle.show();
    particle.hit(control);

    if(blocks.length < 1) {
      newRow();
    }

    function newRow() {
      var p = [];
      for(var i = 0; i < 700 / 50; i++) {
        if(Math.random() < 0.5) {
          blocks.push(new Block(c, i * 50, 0, 50, 50, {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
          }));
        }
      }
      //blocks.push(p);

    }

    if(particle.stopped()) {
      c.font = "30px Arial";
      c.strokeStyle = "#CCCCCC";
      c.strokeText("You lost!", 280, 235);
    }

    c.font = "12px Arial";
    c.strokeStyle = "#CCCCCC";
    c.strokeText("score: " + score.value(), 10, 10);
  }, 1000 / 60);
}

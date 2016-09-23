function Particle(canvas) {
  var c = canvas;

  this.pos = {
    x: 50,
    y: 50
  };

  this.vel = {
    x: 4,
    y: 4
  };

  var info = {
    radius: 5,
    stopped: false
  }

  this.stopped = function() {
    return info.stopped;
  }

  this.show = function() {
    c.beginPath();
    c.fillStyle = "#FFFFFF";
    c.arc(this.pos.x, this.pos.y, info.radius, 0, 2*Math.PI);
    c.fill();
    c.closePath();
  };

  this.update = function() {
    if(this.pos.x < info.radius || this.pos.x > 700 - info.radius) {
      this.vel.x *= -1;
    }
    if(this.pos.y < info.radius) {
      this.vel.y *= -1;
    }
    if(this.pos.y > 500 - info.radius) {
      info.stopped = true;
    }

    if(!info.stopped) {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  };

  this.hit = function(block) {
    if(block.pos.x < this.pos.x - info.radius &&
      block.pos.x + block.info.width > this.pos.x + info.radius &&
      block.pos.y < this.pos.y - info.radius &&
      block.pos.y + block.info.height > this.pos.y + info.radius
    ) {
      this.vel.y *= -1;
      return true;
    } else {
      return false;
    }
  };
}

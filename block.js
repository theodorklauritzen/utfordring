function Block(canvas, x, y, w, h, col) {
  var c = canvas;

  this.pos = {
    x: x || 0,
    y: y || 0
  };

  this.color = col || {
    r: 128,
    b: 128,
    g: 128
  };

  this.info = {
    width: w || 50,
    height: h || 50
  };

  this.show = function() {
    c.fillStyle = "rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")";
    c.fillRect(this.pos.x, this.pos.y, this.info.width, this.info.height);
  };
}

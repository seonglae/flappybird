export default Class.extend({
  width: 108,
  height: 63,

  init: function (stage, x, y, speed) {
    this.stage = stage
    this.img = new Image()
    this.img.src = 'assets/cloud.png'
    this.x = x
    this.y = y
    this.speed = speed
  },

  update: function () {
    if (this.x > this.stage.width) this.x = -this.width
    this.x += this.speed
  },

  draw: function () {
    this.stage.context.drawImage(this.img, this.x, this.y)
  }
})
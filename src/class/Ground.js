export default Class.extend({
  width: 780,
  height: 253,
  x: 0,
  y: 0,

  init: function (stage) {
    this.stage = stage
    this.img = new Image()
    this.img.src = 'assets/ground.png'
    this.y = stage.height - this.height
  },

  update: function () {
    if (Math.abs(this.x) > this.width) this.x = 0
    this.x -= 3
  },

  draw: function () {
    let context = this.stage.context
    context.drawImage(this.img, this.x, this.y)
    context.drawImage(this.img, this.width - Math.abs(this.x), this.y)
  }
})

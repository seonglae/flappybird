import { BOTTOM } from '../main.js'

export default Class.extend({
  width: 72,
  height: 180,
  speed: 3,
  order: 0,

  init: function (stage, placement, x, h) {
    this.stage = stage
    this.placement = placement
    this.height = h
    this.x = x || 0
    this.y = 0

    if (this.placement == BOTTOM) this.y = stage.height - this.height

    this.img = new Image()
    this.img.src = 'assets/pipe.png'
  },

  update: function () {
    this.x -= this.speed
  },

  draw: function () {
    let context = this.stage.context,
      pattern = context.createPattern(this.img, 'repeat')

    context.fillStyle = pattern
    context.save()

    let yAddition = 0
    if (this.placement == BOTTOM) yAddition = 20

    context.translate(this.x + 4, this.y + yAddition)
    context.fillRect(0, 0, this.width - 8, this.height - 20)
    context.fillStyle = '#6e217d'

    if (this.placement == BOTTOM) context.translate(0, -this.height)

    context.fillRect(-4, this.height - 20, this.width, 20)
    context.restore()
  }
})

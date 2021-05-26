export default Class.extend({
  width: 35,
  height: 30,
  x: 100,
  y: 200,
  states: {
    FLY: 0,
    RISE: 1,
    FALL: 2
  },
  vertSpeed: 0,
  flapState: 0,
  defaultRotation: 0.8,
  minRotation: 0.1,

  init: function (stage) {
    this.stage = stage
    this.stage.canvas.addEventListener('mousedown', this.flap.bind(this))
    this.stage.canvas.addEventListener('keydown', this.flap.bind(this))
    this.img = new Image()
    this.img.src = 'assets/bird.png'
    this.flapState = 0
    this.rotation = this.defaultRotation
    this.state = this.states.FLY
  },

  update: function () {
    if (this.stage.position % 5 == 0)
      if (++this.flapState == 4) this.flapState = 0
    if (this.stage.state == this.stage.states.GAME_OVER) {
      this.vertSpeed = 10
      this.rotation += 0.3
    }
    this.y += this.vertSpeed
    this.vertSpeed += 0.6
    if (this.state == this.states.RISE) {
      if (this.rotation >= this.minRotation) this.rotation -= 0.4
      if (this.flapStartPosition + 10 < this.stage.position)
        this.state = this.states.FALL
    }
    if (this.state == this.states.FALL)
      if (this.flapStartPosition + 5 < this.stage.position)
        this.state = this.states.FLY
    if (this.state == this.states.FLY && this.rotation < this.defaultRotation)
      this.rotation += 0.04
  },

  draw: function () {
    this.stage.context.save()
    this.stage.context.translate(this.x, this.y)
    this.stage.context.rotate(this.rotation)
    this.stage.context.translate(-this.x, -this.y)
    this.stage.context.drawImage(
      this.img,
      this.flapState * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.stage.context.restore()
  },

  flap: function () {
    if (this.stage.state != this.stage.states.GAME_OVER) {
      this.vertSpeed = -7
      this.flapStartPosition = this.stage.position
      this.state = this.states.RISE
    }
  },

  reset: function () {
    this.x = 100
    this.y = this.stage.height / 2
    this.rotation = this.defaultRotation
    this.vertSpeed = 0
  }
})

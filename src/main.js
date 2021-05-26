import Pipe from './class/Pipe.js'
import Bird from './class/Bird.js'
import Ground from './class/Ground.js'
import Cloud from './class/Cloud.js'
import ScoreBoard from './class/ScoreBoard.js'

export const TOP = 0
export const BOTTOM = 1

const flappybird = { Cloud, Pipe, Bird, Ground, ScoreBoard }

const Game = Class.extend({
  width: 800,
  height: 500,
  position: 0,
  score: 0,
  pipeCreationRate: 100,
  pipesHorizontalSpacing: 240,
  pipesVerticalSpacing: 180,
  states: {
    WAIT: 0,
    PLAYING: 1,
    GAME_OVER: 2
  },

  init: function (options) {
    this.canvas = options.canvas
    this.context = this.canvas.getContext('2d')
    this.bird = new flappybird.Bird(this)
    this.ground = new flappybird.Ground(this)
    this.scoreboard = new flappybird.ScoreBoard(this)
    this.clouds = [
      new flappybird.Cloud(this, 100, 30, 0.1),
      new flappybird.Cloud(this, 300, 60, 0.4),
      new flappybird.Cloud(this, 500, 20, 0.4),
      new flappybird.Cloud(this, 700, 30, 0.1)
    ]
    this.pipes = []
    this.passedPipes = []
    this.lastPipe = null
    this.state = this.states.WAIT
    this.canvas.addEventListener('click', this.onclick.bind(this))
  },

  createPipe: function () {
    if (
      !this.lastPipe ||
      this.lastPipe.x < this.width - this.pipesHorizontalSpacing
    ) {
      let positionX = this.width,
        pipeTop,
        pipeBottom,
        hTop,
        hBottom,
        order
      hTop = parseInt(Math.random() * (this.height / 2)) + 40
      hBottom = this.height - this.pipesVerticalSpacing - hTop
      pipeTop = new flappybird.Pipe(this, TOP, positionX, hTop)
      pipeBottom = new flappybird.Pipe(this, BOTTOM, positionX, hBottom)
      order = this.pipes.length + 1
      pipeTop.order = pipeBottom.order = order
      this.pipes.push(pipeTop)
      this.pipes.push(pipeBottom)
      this.lastPipe = pipeBottom
    }
  },

  handleCollision: function () {
    if (this.bird.y < -100 || this.bird.y > this.height + 100)
      this.state = this.states.GAME_OVER
    for (let pipe of this.pipes) {
      let collides =
        this.bird.x > pipe.x - pipe.width / 2 &&
        this.bird.x < pipe.x + pipe.width &&
        this.bird.y > pipe.y &&
        this.bird.y < pipe.y + pipe.height
      if (collides) this.state = this.states.GAME_OVER
    }
  },

  updateScore: function () {
    if (this.state == this.states.PLAYING)
      for (let pipe of this.pipes)
        if (this.bird.x > pipe.x + pipe.width)
          if (this.passedPipes.indexOf(pipe.order) == -1) {
            this.passedPipes.push(pipe.order)
            this.score++
          }
  },

  showGameOverScreen: function () {
    this.context.fillStyle = '#000'
    this.context.textAlign = 'center'
    this.context.font = 'bold 30px helvetica'
    this.context.fillText('GAME OVER', 400, 240)
    this.context.fillText('SCORE: ' + this.score, 400, 280)
  },

  update: function () {
    this.position += 1
    this.handleCollision()
    this.updateScore()
    this.ground.update()
    this.bird.update()
    this.scoreboard.update()
    this.createPipe()
    for (let cloud of this.clouds) cloud.update()
    for (let pipe of this.pipes) pipe.update()
  },

  draw: function () {
    this.clear()
    this.ground.draw()
    for (let cloud of this.clouds) cloud.draw()
    for (let pipe of this.pipes) pipe.draw()
    this.bird.draw()
    this.scoreboard.draw()
    if (this.state == this.states.GAME_OVER) this.showGameOverScreen()
  },

  clear: function () {
    this.context.fillStyle = '#d9ffff'
    this.context.fillRect(0, 0, this.width, this.height)
  },

  onclick: function () {
    if (this.state == this.states.WAIT) this.state = this.states.PLAYING
    if (this.state == this.states.GAME_OVER) this.reset()
  },

  reset: function () {
    this.state = this.states.WAIT
    this.bird.reset()
    this.score = 0
    this.position = 0
    this.pipes = []
    this.lastPipe = null
  },

  loop: function () {
    this.update()
    this.draw()
    window.requestAnimationFrame
      ? window.requestAnimationFrame(this.loop.bind(this))
      : setTimeout(this.loop.bind(this), 1000 / 60)
  }
})

let game = new Game({ canvas: document.getElementById('canvas') })
game.loop()

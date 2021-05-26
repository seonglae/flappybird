export default Class.extend({
  init: function (stage) {
    this.stage = stage
  },

  update: function () {},

  draw: function () {
    let scoreText = 'Score: ' + this.stage.score
    this.stage.context.textAlign = 'left'
    this.stage.context.font = '16px Helvetica'
    this.stage.context.fillStyle = '#000'
    this.stage.context.fillText(scoreText, 12, 25)
  }
})

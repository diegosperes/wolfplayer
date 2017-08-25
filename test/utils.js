import Player from '../src/player'
import { Logger } from '../src/plugins/index'

const baseOptions = {
  parent: 'body',
  src: 'base/public/sample.mp4',
  plugins: [Logger]
}

const createPlayer = (options=baseOptions) => {
  /*
    Override trigger methods from Manager class to check if event is called.
  */
  let player = new Player(options)
  let originalTrigger = player.trigger

  player.waitEvent = function(event, callback) {
    player._waitingEvent = event
    player._waitingCallback = callback
  }

  player.trigger = function(event, args) {
    originalTrigger.apply(player, [event, args]).then(() => {
      if (player._waitingEvent === event) player._waitingCallback()
    })
  }

  return player
}

export default {
  baseOptions,
  createPlayer
}
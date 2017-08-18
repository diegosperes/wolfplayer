import utils from './utils'

import { Logger } from '../src/plugins/index.js'
import WolfPlayer from '../src/player'

describe('Logger', function() {

  beforeEach(function() {
    this.callbackError = spyOn(console, 'error')
    this.callbackInfo = spyOn(console, 'info')
    this.callbackDebug = spyOn(console, 'debug')
  })

  afterEach(function() {
    this.callbackError.calls.reset()
    this.callbackInfo.calls.reset()
    this.callbackDebug.calls.reset()
  })

  it('should listen player error event', function(done) {
    let options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    let player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.PLAYER_ERROR, ['test logger error']).then(() => {
        expect(this.callbackError).toHaveBeenCalled()
        done()
      })
    })
  })

  it('should listen logger error event', function(done) {
    let options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    let player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.LOGGER_ERROR, ['test logger error']).then(() => {
        expect(this.callbackError).toHaveBeenCalled()
        done()
      })
    })
  })

  it('should listen logger info event', function(done) {
    let options = Object.assign({logger: {logLevel: 1}}, utils.baseOptions)
    let player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.LOGGER_INFO, ['test logger info']).then(() => {
        expect(this.callbackInfo).toHaveBeenCalled()
        done()
      })
    })
  })

  it('should listen logger debug event', function(done) {
    let options = Object.assign({logger: {logLevel: 0}}, utils.baseOptions)
    let player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.LOGGER_DEBUG, ['test logger debug']).then(() => {
        expect(this.callbackDebug).toHaveBeenCalled()
        done()
      })
    })
  })
})
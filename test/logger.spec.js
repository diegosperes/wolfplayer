import utils from './utils'

import { Logger } from '../src/plugins/index.js'
import WolfPlayer from '../src/player'

describe('Logger', () => {

  let player, callbackError, callbackInfo, callbackDebug

  beforeEach(() => {
    callbackError = sinon.spy(console, 'error')
    callbackInfo = sinon.spy(console, 'info')
    callbackDebug = sinon.spy(console, 'debug')
  })

  afterEach(() => {
    console.error.restore()
    console.info.restore()
    console.debug.restore()
  })

  it('should listen player error event', (done) => {
    let options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.PLAYER_ERROR, ['test logger error']).then(() => {
        callbackError.should.have.been.called
        done()
      })
    })
  })

  it('should listen logger error event', (done) => {
    let options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.LOGGER_ERROR, ['test logger error']).then(() => {
        callbackError.should.have.been.called
        done()
      })
    })
  })

  it('should listen logger info event', (done) => {
    let options = Object.assign({logger: {logLevel: 1}}, utils.baseOptions)
    player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.LOGGER_INFO, ['test logger info']).then(() => {
        callbackInfo.should.have.been.called
        done()
      })
    })
  })

  it('should listen logger debug event', (done) => {
    let options = Object.assign({logger: {logLevel: 0}}, utils.baseOptions)
    player = new WolfPlayer(options)

    player.addListener(player.events.HOOK_READY, () => {
      player.trigger(player.events.LOGGER_DEBUG, ['test logger debug']).then(() => {
        callbackDebug.should.have.been.called
        done()
      })
    })
  })
})
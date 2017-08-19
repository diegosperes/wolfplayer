import utils from './utils'

import { Logger } from '../src/plugins/index.js'
import WolfPlayer from '../src/player'

describe('Logger', function() {

  it('does not call debug by default', function(done) {
    this.player = new WolfPlayer(utils.baseOptions)

    let assert = () => {
      expect(this.callbackDebug).not.toHaveBeenCalled()
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackDebug = spyOn(console, 'debug')
      this.player.trigger(this.player.events.LOGGER_DEBUG).then(assert)
    })
  })

  it('should call info by default', function(done) {
    this.player = new WolfPlayer(utils.baseOptions)

    let assert = () => {
      expect(this.callbackInfo).toHaveBeenCalled()
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackInfo = spyOn(console, 'info')
      this.player.trigger(this.player.events.LOGGER_INFO).then(assert)
    })
  })

  it('should listen player error event', function(done) {
    this.options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)
    this.message = 'test player error'

    let assert = () => {
      expect(this.callbackError).toHaveBeenCalledWith(`%c ${this.message}`, 'color: red')
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackError = spyOn(console, 'error')
      this.player.trigger(this.player.events.PLAYER_ERROR, [this.message]).then(assert)
    })
  })

  it('should listen logger error event', function(done) {
    this.options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)
    this.message = 'test player error'

    let assert = () => {
      expect(this.callbackError).toHaveBeenCalledWith(`%c ${this.message}`, 'color: red')
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackError = spyOn(console, 'error')
      this.player.trigger(this.player.events.LOGGER_ERROR, [this.message]).then(assert)
    })
  })

  it('should listen logger info event', function(done) {
    this.options = Object.assign({logger: {logLevel: 1}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)
    this.message = 'test logger info'

    let assert = () => {
      expect(this.callbackInfo).toHaveBeenCalledWith(`%c ${this.message}`, 'color: blue')
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackInfo = spyOn(console, 'info')
      this.player.trigger(this.player.events.LOGGER_INFO, [this.message]).then(assert)
    })
  })

  it('should listen logger debug event', function(done) {
    this.options = Object.assign({logger: {logLevel: 0}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)
    this.message = 'test logger debug'

    let assert = () => {
      expect(this.callbackDebug).toHaveBeenCalledWith(`%c ${this.message}`, 'color: DarkOrange')
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackDebug = spyOn(console, 'debug')
      this.player.trigger(this.player.events.LOGGER_DEBUG, [this.message]).then(assert)
    })
  })

  it('should show every calls when logger is in debug mode', function(done) {
    this.options = Object.assign({logger: {logLevel: 0}}, utils.baseOptions)
    this.callbackDebug = spyOn(console, 'debug')
    this.player = new WolfPlayer(this.options)

    let assert = () => {
      expect(this.callbackDebug).toHaveBeenCalledWith('%c Call API_PLAY event', 'color: DarkOrange')
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.player.trigger(this.player.events.API_PLAY).then(assert)
    })
  })

  it('does not call debug when logger is in info mode', function(done) {
    this.options = Object.assign({logger: {logLevel: 1}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)

    let assert = () => {
      expect(this.callbackDebug).not.toHaveBeenCalled()
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackDebug = spyOn(console, 'debug')
      this.player.trigger(this.player.events.LOGGER_DEBUG, ['']).then(assert)
    })
  })

  it('does not call debug when logger is in error mode', function(done) {
    this.options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)

    let assert = () => {
      expect(this.callbackDebug).not.toHaveBeenCalled()
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackDebug = spyOn(console, 'debug')
      this.player.trigger(this.player.events.LOGGER_DEBUG, ['']).then(assert)
    })
  })

  it('does not call info when logger is in error mode', function(done) {
    this.options = Object.assign({logger: {logLevel: 2}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)

    let assert = () => {
      expect(this.callbackInfo).not.toHaveBeenCalled()
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackInfo = spyOn(console, 'info')
      this.player.trigger(this.player.events.LOGGER_INFO, ['']).then(assert)
    })
  })

  it('should set level of logger', function(done) {
    this.options = Object.assign({logger: {logLevel: 3}}, utils.baseOptions)
    this.player = new WolfPlayer(this.options)
    this.message = 'test logger debug'

    let assert = () => {
      expect(this.callbackDebug).toHaveBeenCalled()
      done()
    }

    this.player.addListener(this.player.events.HOOK_READY, () => {
      this.callbackDebug = spyOn(console, 'debug')
      this.player.trigger(this.player.events.LOGGER_SETLEVEL, [0]).then(assert)
    })
  })
})
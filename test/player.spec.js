import utils from './utils'

import WolfPlayer from '../src/player'
import { Plugin } from '../src/base'

class FakePlugin extends Plugin {
  constructor(manager, options) {
    super(manager, options)
    options.constructorSpy(manager, options)
  }
}

describe('Player', function() {

  beforeEach(function() {
    this.options = Object.assign({fakeplugin: {constructorSpy: jasmine.createSpy('spy')}}, utils.baseOptions)
    this.options.plugins.push(FakePlugin)
    this.player = utils.createPlayer(this.options)
  })

  it('should register all plugin events before HOOK_START', function() {
    expect(this.player.events.LOGGER_ERROR).toBeDefined()
  })

  it('should use the same manager of player and use correct options', function(done) {
    this.player.waitEvent(this.player.events.HOOK_READY, () => {
      expect(this.options.fakeplugin.constructorSpy).toHaveBeenCalledWith(this.player, this.options.fakeplugin)
      done()
    })
  })  

  it('should create plugin in HOOK_START event', function(done) {
    let callbackReady = jasmine.createSpy('spy')
    this.player.addListener(this.player.events.HOOK_READY, callbackReady)

    this.player.waitEvent(this.player.events.HOOK_READY, () => {
      expect(this.options.fakeplugin.constructorSpy).toHaveBeenCalledBefore(callbackReady)
      done()
    })
  })
})
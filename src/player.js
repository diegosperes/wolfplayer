import BaseObject from './base.js'
import Events from './events'
import Core from './core'

export default class Player extends BaseObject {

  constructor(options) {
    super()
    this.core = new Core(options, this.manager)
    this.startPlayer()

    return this.manager
  }

  bind() {
    this.manager.addListener(Events.HOOK_PLUGIN, this.onHookPlugin, this)
  }

  startPlayer(options) {
    this.manager.trigger(Events.HOOK_START).then(() => {
      this.manager.trigger(Events.HOOK_PLUGIN)
    })
  }

  onHookPlugin() {
    this.manager.trigger(Events.HOOK_READY)
  }

}
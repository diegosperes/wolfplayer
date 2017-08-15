import BaseObject from './base.js'
import Core from './core'

export default class Player extends BaseObject {

  static get register() {
    return {
      HOOK_START: 'hook:start',
      HOOK_PLUGIN: 'hook:plugin',
      HOOK_READY: 'hook:ready'
    }
  }

  constructor(options) {
    super()
    this.core = new Core(options, this.manager)
    this.startPlayer()

    return this.manager
  }

  bind() {
    this.manager.addListener(this.events.HOOK_PLUGIN, this.onHookPlugin, this)
  }

  startPlayer(options) {
    this.manager.trigger(this.events.HOOK_START).then(() => {
      this.manager.trigger(this.events.HOOK_PLUGIN)
    })
  }

  onHookPlugin() {
    this.manager.trigger(this.events.HOOK_READY)
  }

}
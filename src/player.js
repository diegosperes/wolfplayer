import { BaseObject } from './base.js'
import Core from './core'

export default class Player extends BaseObject {

  static get eventsToRegister() {
    return {
      PLAYER_ERROR: 'player:error',
      HOOK_START: 'hook:start',
      HOOK_READY: 'hook:ready'
    }
  }

  constructor(options) {
    super()
    this.plugins = {constructors: options.plugins || [], instances: []}
    this.core = new Core(options, this.manager)
    this.registerPluginEvents()
    this.startPlayer(options)

    return this.manager
  }

  registerPluginEvents() {
    for (let plugin of this.plugins.constructors) { this.events.register(plugin.eventsToRegister) }
  }

  startPlayer(options) {
    this.manager.trigger(this.events.HOOK_START).then(() => {
      for (let plugin of this.plugins.constructors) {
        let pluginOptions = this.getPluginOptions(options, plugin)
        this.plugins.instances.push(new plugin(this.manager, pluginOptions))
      }

      this.manager.trigger(this.events.HOOK_READY)
    })
  }

  getPluginOptions(options, plugin) {
    let optionName = plugin.name.toLowerCase()
    return options[optionName]
  }
}
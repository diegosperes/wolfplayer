import Events from './events'
import EventsManager from './events-manager'
import Core from './core'

export default class Player {
  constructor(options) {
    this.eventsManager = new EventsManager()
    this.core = new Core(this.eventsManager, options)
    this.bind()
    this.startPlayer()

    return this.eventsManager
  }

  bind() {
    this.eventsManager.addListener(Events.HOOK_PLUGIN, this.onHookPlugin, this)
  }

  startPlayer(options) {
    this.eventsManager.trigger(Events.HOOK_START).then(() => {
      this.eventsManager.trigger(Events.HOOK_PLUGIN)
    })
  }

  onHookPlugin() {
    this.eventsManager.trigger(Events.HOOK_READY)
  }

}
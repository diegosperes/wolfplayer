import Events from './events'
import HTML5Video from './playback'

export default class Core {

  constructor(eventsManager, options) {
    this.options = options
    this.eventsManager = eventsManager
    this.bindHooks()
  }

  bindHooks() {
    this.eventsManager.addListener(Events.HOOK_START, this.onHookStart, this)
  }

  onHookStart() {
    this.playbackSetup()
    this.attachTo()
  }

  playbackSetup() {
    this.playback = new HTML5Video(this.options.src)
    this.playback.setup(this.options.playback)
  }

  attachTo() {
    let container = this.options.parent
    if (typeof container === 'string') container = document.querySelector(container)
    this.playback.attachTo(container)
  }
}
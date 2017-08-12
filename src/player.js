import Events from './events'
import EventsManager from './events-manager'
import HTML5Playback from './playback'

export default class Player {
  constructor(options) {
    this.options = options
    this._eventsManager = new EventsManager()
    this.bindHooks()
    this.startPlayer()

    return this._eventsManager
  }

  bindHooks() {
    this._eventsManager.addListener(Events.HOOK_START, this.onHookStart, this)
    this._eventsManager.addListener(Events.HOOK_PLUGIN, this.onHookPlugin, this)
  }

  startPlayer() {
    this._eventsManager.trigger(Events.HOOK_START).then(() => {
      this._eventsManager.trigger(Events.HOOK_PLUGIN)
    })
  }

  onHookStart() {
    this.playback = new HTML5Playback(this.options)
  }

  onHookPlugin() {
    this._attachTo()
    this._eventsManager.trigger(Events.HOOK_READY)
  }

  _attachTo() {
    let parent = this.options.parent
    if (typeof parent === 'string') parent = document.querySelector(parent)
    parent.appendChild(this.playback.videoElement)
  }
}
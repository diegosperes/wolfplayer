import BaseObject from './base.js'
import Events from './events'
import HTML5Video from './playback'

export default class Core extends BaseObject {

  constructor(options, manager) {
    super(manager)
    this.options = options
  }

  bind() {
    this.manager.addListener(Events.HOOK_START, this.onHookStart, this)
    this.manager.addListener(Events.API_PLAY, this.onPlay, this)
    this.manager.addListener(Events.API_PAUSE, this.onPause, this)
    this.manager.addListener(Events.API_SEEK, this.onSeek, this)
  }

  onHookStart() {
    this.playbackSetup()
    this.attachTo()
  }

  onPlay() { return this.playback.play() }
  onPause() { return this.playback.pause() }
  onSeek(seconds) { this.playback.seek(seconds) }

  playbackSetup() {
    this.playback = new HTML5Video(this.options.src, this.manager)
    this.playback.setup(this.options.playback)
  }

  attachTo() {
    let container = this.options.parent
    if (typeof container === 'string') container = document.querySelector(container)
    this.playback.attachTo(container)
  }
}
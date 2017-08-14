import Events from './events'
import HTML5Video from './playback'

export default class Core {

  constructor(eventsManager, options) {
    this.options = options
    this.eventsManager = eventsManager
    this.bind()
  }

  bind() {
    this.eventsManager.addListener(Events.HOOK_START, this.onHookStart, this)
    this.eventsManager.addListener(Events.API_PLAY, this.onPlay, this)
    this.eventsManager.addListener(Events.API_PAUSE, this.onPause, this)
    this.eventsManager.addListener(Events.API_SEEK, this.onSeek, this)
  }

  onHookStart() {
    this.playbackSetup()
    this.attachTo()
  }

  onPlay() { return this.playback.play() }
  onPause() { return this.playback.pause() }
  onSeek(seconds) { this.playback.seek(seconds) }

  playbackSetup() {
    this.playback = new HTML5Video(this.options.src, this.eventsManager)
    this.playback.setup(this.options.playback)
  }

  attachTo() {
    let container = this.options.parent
    if (typeof container === 'string') container = document.querySelector(container)
    this.playback.attachTo(container)
  }
}
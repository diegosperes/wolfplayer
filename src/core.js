import { BaseObject } from './base.js'
import HTML5Video from './playback'

export default class Core extends BaseObject {

  static get eventsToRegister() {
    return {
      API_PLAY: 'api:play',
      API_PAUSE: 'api:pause',
      API_SEEK: 'api:seek',
      API_RATECHANGE: 'api:ratechange',
      API_VOLUMECHANGE: 'api:volumechange'
    }
  }

  constructor(options, manager) {
    super(manager)
    this.options = options
  }

  bind() {
    this.manager.addListener(this.events.HOOK_START, this.onHookStart, this)
    this.manager.addListener(this.events.API_PLAY, this.onPlay, this)
    this.manager.addListener(this.events.API_PAUSE, this.onPause, this)
    this.manager.addListener(this.events.API_SEEK, this.onSeek, this)
    this.manager.addListener(this.events.API_RATECHANGE, this.onRatechange, this)
    this.manager.addListener(this.events.API_VOLUMECHANGE, this.onVolumechange, this)
  }

  onHookStart() {
    this.playbackSetup()
    this.attachTo()
  }

  onPlay() { return this.playback.play() }
  onPause() { return this.playback.pause() }
  onSeek(seconds) { this.playback.seek(seconds) }
  onRatechange(rate) { this.playback.changeRate(rate) }
  onVolumechange(volume) { this.playback.changeVolume(volume) }

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
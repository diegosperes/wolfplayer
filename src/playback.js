import { BaseObject } from './base.js'

export default class HTML5Playback extends BaseObject {

  static get eventsToRegister() {
    return {
      PLAYBACK_PLAY: 'playback:play',
      PLAYBACK_PAUSE: 'playback:pause',
      PLAYBACK_SEEKING: 'playback:seeking',
      PLAYBACK_SEEKED: 'playback:seeked',
      PLAYBACK_TIMEUPDATE: 'playback:timeupdate',
      PLAYBACK_PROGRESS: 'playback:progress',
      PLAYBACK_RATECHANGE: 'playback:ratechange',
      PLAYBACK_VOLUMECHANGE: 'playback:volumechange',
      PLAYBACK_BUFFERING: 'playback:buffering',
      PLAYBACK_BUFFELOAD: 'playback:bufferload',
      PLAYBACK_BUFFEFULL: 'playback:bufferfull'
    }
  }

  get eventsByType() {
    !this._eventsType && (this._eventsType = {
      play: this.events.PLAYBACK_PLAY,
      pause: this.events.PLAYBACK_PAUSE,
      seeking: this.events.PLAYBACK_SEEKING,
      seeked: this.events.PLAYBACK_SEEKED,
      timeupdate: this.events.PLAYBACK_TIMEUPDATE,
      progress: this.events.PLAYBACK_PROGRESS,
      ratechange: this.events.PLAYBACK_RATECHANGE,
      volumechange: this.events.PLAYBACK_VOLUMECHANGE,
      loadstart: this.events.PLAYBACK_BUFFERING,
      loaddata: this.events.PLAYBACK_BUFFERING,
      canplay: this.events.PLAYBACK_BUFFELOAD,
      canplaythrough: this.events.PLAYBACK_BUFFEFULL
    })

    return this._eventsType
  }

  constructor(source, manager) {
    super(manager)
    this.source = source
  }

  bind() {
    this.mediaElement = document.createElement('video')

    this.mediaElement.addEventListener('play', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('pause', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('seeking', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('seeked', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('timeupdate', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('progress', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('ratechange', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('volumechange', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('loadstart', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('loaddata', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('canplay', (event) => this._proxyEvent(event))
    this.mediaElement.addEventListener('canplaythrough', (event) => this._proxyEvent(event))
  }

  setup(options) {
    this.mediaElement.setAttribute('src', this.source)

    if ((!options || !('controls' in options)) || options.controls) this.mediaElement.setAttribute('controls', '')
    if (options && options.loop) this.mediaElement.setAttribute('loop', '')
    if (options && options.autoplay) this.mediaElement.setAttribute('autoplay', '')
    if ((!options || !('preload' in options)) || options.preload) this.mediaElement.setAttribute('preload', (options && options.preload) || 'metadata')
  }

  play() { return this.mediaElement.play() }
  pause() { return this.mediaElement.pause() }
  seek(seconds) { this.mediaElement.currentTime = seconds }
  changeRate(rate) { this.mediaElement.playbackRate = rate }
  changeVolume(volume) { this.mediaElement.volume = volume }
  attachTo(container) { container.appendChild(this.mediaElement) }

  _proxyEvent(event) { this.manager.trigger(this.eventsByType[event.type], [event]) }
}

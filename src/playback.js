import BaseObject from './base.js'
import Events from './events'

export default class HTML5Playback extends BaseObject {

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
  }

  play() { return this.mediaElement.play() }
  pause() { return this.mediaElement.pause() }
  seek(seconds) { this.mediaElement.currentTime = seconds }
  changeRate(rate) { this.mediaElement.playbackRate = rate }
  changeVolume(volume) { this.mediaElement.volume = volume }

  setup(options) {
    this.mediaElement.setAttribute('src', this.source)

    if ((!options || !('controls' in options)) || options.controls) this.mediaElement.setAttribute('controls', '')
    if (options && options.loop) this.mediaElement.setAttribute('loop', '')
    if (options && options.autoplay) this.mediaElement.setAttribute('autoplay', '')
    if ((!options || !('preload' in options)) || options.preload) this.mediaElement.setAttribute('preload', (options && options.preload) || 'metadata')
  }

  attachTo(container) {
    container.appendChild(this.mediaElement)
  }

  _proxyEvent(event) { this.manager.trigger(this._getEventType(event), [event]) }
  _getEventType(event) {
    return {
      play: Events.PLAYBACK_PLAY,
      pause: Events.PLAYBACK_PAUSE,
      seeking: Events.PLAYBACK_SEEKING,
      seeked: Events.PLAYBACK_SEEKED,
      timeupdate: Events.PLAYBACK_TIMEUPDATE,
      progress: Events.PLAYBACK_PROGRESS,
      ratechange: Events.PLAYBACK_RATECHANGE,
      volumechange: Events.PLAYBACK_VOLUMECHANGE,
    }[event.type]
  }
}
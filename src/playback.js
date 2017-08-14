import BaseObject from './base.js'
import Events from './events'

export default class HTML5Playback extends BaseObject {

  constructor(source, manager) {
    super(manager)
    this.source = source
  }

  bind() {
    this.mediaElement = document.createElement('video')

    this.mediaElement.addEventListener('play', (event) => this.onPlay(event))
    this.mediaElement.addEventListener('pause', (event) => this.onPause(event))
    this.mediaElement.addEventListener('seeking', (event) => this.onSeeking(event))
    this.mediaElement.addEventListener('seeked', (event) => this.onSeeked(event))
  }

  onPlay(event) { this.manager.trigger(Events.PLAYBACK_PLAY, [event]) }
  onPause(event) { this.manager.trigger(Events.PLAYBACK_PAUSE, [event]) }
  onSeeking(event) { this.manager.trigger(Events.PLAYBACK_SEEKING, [event]) }
  onSeeked(event) { this.manager.trigger(Events.PLAYBACK_SEEKED, [event]) }

  play() { return this.mediaElement.play() }
  pause() { return this.mediaElement.pause() }
  seek(seconds) { this.mediaElement.currentTime = seconds }

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
}
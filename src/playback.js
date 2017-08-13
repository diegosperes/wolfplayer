import Events from './events'

export default class HTML5Playback {

  constructor(source, eventsManager) {
    this.source = source
    this.eventsManager = eventsManager
    this.mediaElement = document.createElement('video')
    this.bind()
  }

  bind() {
    this.mediaElement.addEventListener('play', () => this.onPlay())
    this.mediaElement.addEventListener('pause', () => this.onPause())
  }

  onPlay(event) { this.eventsManager.trigger(Events.PLAYBACK_PLAY, [event]) }
  onPause(event) { this.eventsManager.trigger(Events.PLAYBACK_PAUSE, [event]) }

  play() { this.mediaElement.play() }
  pause() { this.mediaElement.pause() }

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
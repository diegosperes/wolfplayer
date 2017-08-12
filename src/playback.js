export default class HTML5Playback {

  constructor(source) {
    this.source = source
    this.mediaElement = document.createElement('video')
  }

  setup(options) {
    this.mediaElement.setAttribute('src', this.source)

    if ((!options || !('controls' in options)) || options.controls) this.mediaElement.setAttribute('controls', '')
  }

  attachTo(container) {
    container.appendChild(this.mediaElement)
  }
}
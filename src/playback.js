export default class HTML5Playback {

  constructor(options) {
    this.options = options
    this.videoElement = document.createElement('video')
    this.videoElement.setAttribute('src', this.options.src)
    this.videoElement.setAttribute('controls', '')
  }
}
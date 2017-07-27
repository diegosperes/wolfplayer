export default class Player {
  constructor(options) {
    this.options = options
    this._createPlayback()
    this._attachTo()
  }

  _attachTo(container) {
    let parent = this.options.parent

    if (typeof parent === 'string') {
      parent = document.querySelector(parent)
    }

    parent.appendChild(this._videoElement)
  }

  _createPlayback() {
    this._videoElement = document.createElement('video')
    this._videoElement.setAttribute('src', this.options.src)
  }
}
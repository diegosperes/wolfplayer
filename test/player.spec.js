import { expect } from 'chai'

import WolfPlayer from '../wolfplayer/index'

describe('Player', () => {
  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentNode.removeChild(video) }
  })

  it('insert video element in DOM with correct attributes', () => {
    let player = new WolfPlayer({ parent: 'body', src: 'teste' })
    let videoElement = document.querySelector('body video')

    expect(videoElement.tagName).to.be.equal('VIDEO')
    expect(videoElement.src).to.be.equal('http://localhost:9876/teste')
  })
})
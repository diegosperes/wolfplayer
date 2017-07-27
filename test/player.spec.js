import { expect } from 'chai'

import WolfPlayer from '../src/player'

describe('Player', () => {
  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentNode.removeChild(video) }
  })

  describe('insert video element in DOM when parent is a string', () => {
    it('is a string', () => {
      new WolfPlayer({ parent: 'body', src: 'teste' })
      let videoElement = document.querySelector('body video')

      expect(videoElement.tagName).to.be.equal('VIDEO')
    })

    it('is a DOM element', () => {
      new WolfPlayer({ parent: document.body, src: 'teste' })
      let videoElement = document.querySelector('body video')

      expect(videoElement.tagName).to.be.equal('VIDEO')
    })
  })

  it('insert video with correct source', () => {
    new WolfPlayer({ parent: document.body, src: 'teste' })
    let videoElement = document.querySelector('body video')

    expect(videoElement.src).to.match(/http:\/\/localhost:[0-9]{4}\/teste/)
  })
})
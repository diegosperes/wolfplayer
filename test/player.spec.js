import WolfPlayer from '../wolfplayer/index'

describe('Player', () => {
  it('insert video element in DOM with correct attributes', () => {
    let player = new WolfPlayer({ parent: 'body', src: 'teste' })
    let videoElement = document.querySelector('body > video')

    expect(videoElement.length).to.be.equal(1)
    expect(videoElement.src).to.be.equal('teste')
  })
})
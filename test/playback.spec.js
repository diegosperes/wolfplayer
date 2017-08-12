import Events from '../src/events'
import WolfPlayer from '../src/player'

let baseOptions = {
    parent: 'body',
    src: 'teste'
}

describe('Playback', () => {

  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  it('insert video with correct source', (done) => {
    let player = new WolfPlayer(baseOptions)

    player.addListener(Events.HOOK_READY, () => {
      let videoElement = document.querySelector('body video')
      expect(videoElement.src).to.match(/http:\/\/localhost:[0-9]{4}\/teste/)
      done()
    })
  })

  describe('controls', () => {

    describe('insert video with them', (done) => {

      it('by default', (done) => {
        new WolfPlayer(baseOptions).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })

      it('when controls is true', (done) => {
        let options = Object.assign({playback: {controls: true}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })

      it('when options is undefined', (done) => {
        let options = Object.assign({}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })

      it('when controls is undefined', (done) => {
        let options = Object.assign({playback: {}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })
    })

    it('does not insert video with them when controls is false', (done) => {
      let options = Object.assign({playback: {controls: false}}, baseOptions)

      new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('controls')).to.be.false
        done()
      })
    })    
  })
})
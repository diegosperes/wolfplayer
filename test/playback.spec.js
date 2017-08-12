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

  describe('preload', () => {

    describe('add attribute', () => {

      it('by default', (done) => {
        new WolfPlayer(baseOptions).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).to.be.equal('metadata')
          done()
        })
      })

      it('when preload has a value', (done) => {
        let options = Object.assign({playback: {preload: 'none'}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).to.be.equal('none')
          done()
        })
      })

      it('when preload is undefined', (done) => {
        let options = Object.assign({playback: {}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).to.be.equal('metadata')
          done()
        })
      })
    })
  })

  describe('autoplay', () => {

    it('add attribute when autoplay is true', (done) => {
      let options = Object.assign({playback: {autoplay: true}}, baseOptions)

      new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('autoplay')).to.be.true
        done()
      })
    })

    describe('does not add attribute', () => {

      it('by default', (done) => {
        new WolfPlayer(baseOptions).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).to.be.false
          done()
        })
      })

      it('when autoplay is false', (done) => {
        let options = Object.assign({playback: {autoplay: false}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).to.be.false
          done()
        })
      })

      it('when autoplay is undefined', (done) => {
        let options = Object.assign({playback: {}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).to.be.false
          done()
        })
      })
    })
  })

  describe('loop', () => {

    it('add attribute when loop is true', (done) => {
      let options = Object.assign({playback: {loop: true}}, baseOptions)

      new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('loop')).to.be.true
        done()
      })
    })

    describe('does not add attribute', () => {

      it('by default', (done) => {
        new WolfPlayer(baseOptions).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).to.be.false
          done()
        })
      })

      it('when loop is false', (done) => {
        let options = Object.assign({playback: {loop: false}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).to.be.false
          done()
        })
      })

      it('when loop is undefined', (done) => {
        let options = Object.assign({playback: {}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).to.be.false
          done()
        })
      })
    })
  })

  describe('controls', () => {

    describe('add attribute', () => {

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

      it('when controls is undefined', (done) => {
        let options = Object.assign({playback: {}}, baseOptions)

        new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })
    })

    it('does not add attribute when controls is false', (done) => {
      let options = Object.assign({playback: {controls: false}}, baseOptions)

      new WolfPlayer(options).addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('controls')).to.be.false
        done()
      })
    })
  })
})
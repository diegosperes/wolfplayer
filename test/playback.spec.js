import utils from './utils'

import WolfPlayer from '../src/player'

describe('Playback', () => {

  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  describe('when player ready', () => {

    let player
    let videoElement
    let callback

    beforeEach((done) => {
      player = new WolfPlayer(utils.baseOptions)
      callback = sinon.spy()
      player.addListener(player.events.HOOK_READY, () => { 
        videoElement = document.querySelector('body video')
        done()
      })
    })

    it('insert video with correct source', () => {
      let videoElement = document.querySelector('body video')
      expect(videoElement.src).to.match(/http:\/\/localhost:[0-9]{4}\/base\/public\/sample\.mp4/)
    })

    it('should trigger play event', (done) => {
      player.addListener(player.events.PLAYBACK_PLAY, callback)
      player.addListener(player.events.PLAYBACK_PLAY, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.play()
    })

    it('should trigger pause event', (done) => {
      player.addListener(player.events.PLAYBACK_PAUSE, callback)
      player.addListener(player.events.PLAYBACK_PAUSE, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.play().then(() => videoElement.pause())
    })

    it('should trigger timeupdate event', (done) => {
      player.addListener(player.events.PLAYBACK_TIMEUPDATE, callback)
      player.addListener(player.events.PLAYBACK_TIMEUPDATE, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.play()
    })

    it('should trigger progress event', (done) => {
      player.addListener(player.events.PLAYBACK_PROGRESS, callback)
      player.addListener(player.events.PLAYBACK_PROGRESS, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.dispatchEvent(new Event('progress'))
    })

    it('should trigger ratechange event', (done) => {
      player.addListener(player.events.PLAYBACK_RATECHANGE, callback)
      player.addListener(player.events.PLAYBACK_RATECHANGE, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.play().then(() => videoElement.playbackRate = 2)
    })

    it('should trigger volumechange event', (done) => {
      player.addListener(player.events.PLAYBACK_VOLUMECHANGE, callback)
      player.addListener(player.events.PLAYBACK_VOLUMECHANGE, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.play().then(() => videoElement.volume = 0.8)
    })

    it('should trigger seek event', (done) => {
      player.addListener(player.events.PLAYBACK_SEEKING, callback)
      player.addListener(player.events.PLAYBACK_SEEKED, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.play().then(() => videoElement.currentTime = 2)
    })

    describe('should trigger buffering event when', () => {

      it('loadstart is fired', (done) => {
        player.addListener(player.events.PLAYBACK_BUFFERING, callback)
        player.addListener(player.events.PLAYBACK_BUFFERING, () => {
          callback.should.have.been.called
          done()
        })

        videoElement.dispatchEvent(new Event('loadstart'))
      })

      it('loadeddata is fired', (done) => {
        player.addListener(player.events.PLAYBACK_BUFFERING, callback)
        player.addListener(player.events.PLAYBACK_BUFFERING, () => {
          callback.should.have.been.called
          done()
        })

        videoElement.dispatchEvent(new Event('loaddata'))
      })
    })

    it('should trigger bufferload event', (done) => {
      player.addListener(player.events.PLAYBACK_BUFFELOAD, callback)
      player.addListener(player.events.PLAYBACK_BUFFELOAD, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.dispatchEvent(new Event('canplay'))
    })

    it('should trigger bufferfull event', (done) => {
      player.addListener(player.events.PLAYBACK_BUFFEFULL, callback)
      player.addListener(player.events.PLAYBACK_BUFFEFULL, () => {
        callback.should.have.been.called
        done()
      })

      videoElement.dispatchEvent(new Event('canplaythrough'))
    })
  })

  describe('preload', () => {

    describe('add attribute', () => {

      it('by default', (done) => {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).to.be.equal('metadata')
          done()
        })
      })

      it('when preload has a value', (done) => {
        let options = Object.assign({playback: {preload: 'none'}}, utils.baseOptions)

        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).to.be.equal('none')
          done()
        })
      })

      it('when preload is undefined', (done) => {
        let options = Object.assign({playback: {}}, utils.baseOptions)

        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).to.be.equal('metadata')
          done()
        })
      })
    })
  })

  describe('autoplay', () => {

    it('add attribute when autoplay is true', (done) => {
      let options = Object.assign({playback: {autoplay: true}}, utils.baseOptions)
      let player = new WolfPlayer(options)
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('autoplay')).to.be.true
        done()
      })
    })

    describe('does not add attribute', () => {

      it('by default', (done) => {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).to.be.false
          done()
        })
      })

      it('when autoplay is false', (done) => {
        let options = Object.assign({playback: {autoplay: false}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).to.be.false
          done()
        })
      })

      it('when autoplay is undefined', (done) => {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).to.be.false
          done()
        })
      })
    })
  })

  describe('loop', () => {

    it('add attribute when loop is true', (done) => {
      let options = Object.assign({playback: {loop: true}}, utils.baseOptions)
      let player = new WolfPlayer(options)
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('loop')).to.be.true
        done()
      })
    })

    describe('does not add attribute', () => {

      it('by default', (done) => {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).to.be.false
          done()
        })
      })

      it('when loop is false', (done) => {
        let options = Object.assign({playback: {loop: false}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).to.be.false
          done()
        })
      })

      it('when loop is undefined', (done) => {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
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
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })

      it('when controls is true', (done) => {
        let options = Object.assign({playback: {controls: true}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })

      it('when controls is undefined', (done) => {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).to.be.true
          done()
        })
      })
    })

    it('does not add attribute when controls is false', (done) => {
      let options = Object.assign({playback: {controls: false}}, utils.baseOptions)
      let player = new WolfPlayer(options)
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('controls')).to.be.false
        done()
      })
    })
  })
})
import utils from './utils'

import WolfPlayer from '../src/player'

describe('Core', () => {
  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  describe('when player ready', () => {

    let player
    let callback

    beforeEach((done) => {
      player = new WolfPlayer(utils.baseOptions)
      callback = sinon.spy()
      player.addListener(player.events.HOOK_READY, () => done())
    })

    it('should trigger play event', (done) => {
      player.addListener(player.events.PLAYBACK_PLAY, callback)
      player.addListener(player.events.PLAYBACK_PLAY, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(player.events.API_PLAY)
    })

    it('should trigger pause event', (done) => {
      player.addListener(player.events.PLAYBACK_PAUSE, callback)
      player.addListener(player.events.PLAYBACK_PAUSE, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(player.events.API_PLAY).then(() => player.trigger(player.events.API_PAUSE))
    })

    it('should trigger ratechange event', (done) => {
      player.addListener(player.events.PLAYBACK_RATECHANGE, callback)
      player.addListener(player.events.PLAYBACK_RATECHANGE, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(player.events.API_PLAY).then(() => player.trigger(player.events.API_RATECHANGE, [2]))
    })

    it('should trigger volumechange event', (done) => {
      player.addListener(player.events.PLAYBACK_VOLUMECHANGE, callback)
      player.addListener(player.events.PLAYBACK_VOLUMECHANGE, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(player.events.API_PLAY).then(() => player.trigger(player.events.API_VOLUMECHANGE, [0.8]))
    })

    it('should trigger seek event', (done) => {
      player.addListener(player.events.PLAYBACK_SEEKING, callback)
      player.addListener(player.events.PLAYBACK_SEEKED, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(player.events.API_PLAY).then(() => player.trigger(player.events.API_SEEK, [2]))
    })
  })

  describe('insert video element in DOM when parent', () => {
    it('is a string', (done) => {
      let player = new WolfPlayer({ parent: 'body', src: 'base/public/sample.mp4' })

      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).to.be.equal('VIDEO')
        done()
      })
    })

    it('is a DOM element', (done) => {
      let player =  new WolfPlayer({ parent: document.body, src: 'base/public/sample.mp4' })
      
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).to.be.equal('VIDEO')
        done()
      })
    })
  })
})
import utils from './utils'

import Events from '../src/events'
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
      player.addListener(Events.HOOK_READY, () => done())
    })

    it('should trigger play event', (done) => {
      player.addListener(Events.PLAYBACK_PLAY, callback)
      player.addListener(Events.PLAYBACK_PLAY, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(Events.API_PLAY)
    })

    it('should trigger pause event', (done) => {
      player.addListener(Events.PLAYBACK_PAUSE, callback)
      player.addListener(Events.PLAYBACK_PAUSE, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(Events.API_PLAY).then(() => player.trigger(Events.API_PAUSE))
    })

    it('should trigger seek event', (done) => {
      player.addListener(Events.PLAYBACK_SEEKING, callback)
      player.addListener(Events.PLAYBACK_SEEKED, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(Events.API_PLAY).then(() => player.trigger(Events.API_SEEK, [2]))
    })
  })

  describe('insert video element in DOM when parent', () => {
    it('is a string', (done) => {
      let player = new WolfPlayer({ parent: 'body', src: 'base/public/sample.mp4' })

      player.addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).to.be.equal('VIDEO')
        done()
      })
    })

    it('is a DOM element', (done) => {
      let player =  new WolfPlayer({ parent: document.body, src: 'base/public/sample.mp4' })
      
      player.addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).to.be.equal('VIDEO')
        done()
      })
    })
  })
})
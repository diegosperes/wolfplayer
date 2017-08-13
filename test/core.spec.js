import utils from './utils'

import Events from '../src/events'
import WolfPlayer from '../src/player'

describe('Core', () => {
  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  it('should trigger play event', (done) => {
    let player = new WolfPlayer(utils.baseOptions)
    let callback = sinon.spy()

    player.addListener(Events.HOOK_READY, () => {
      player.addListener(Events.PLAYBACK_PLAY, callback)
      player.addListener(Events.PLAYBACK_PLAY, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(Events.API_PLAY)
    })
  })

  it('should trigger pause event', (done) => {
    let player = new WolfPlayer(utils.baseOptions)
    let callback = sinon.spy()

    player.addListener(Events.HOOK_READY, () => {
      player.addListener(Events.PLAYBACK_PAUSE, callback)
      player.addListener(Events.PLAYBACK_PAUSE, () => {
        callback.should.have.been.called
        done()
      })

      player.trigger(Events.API_PLAY)
      player.trigger(Events.API_PAUSE)
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
import utils from './utils'

import WolfPlayer from '../src/player'

describe('Core', function() {
  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  describe('when player ready', function() {

    beforeEach(function(done) {
      this.player = new WolfPlayer(utils.baseOptions)
      this.callback = jasmine.createSpy('spy')
      this.player.addListener(this.player.events.HOOK_READY, done)
    })

    it('should trigger play event', function(done) {
      let assert = () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      }

      this.player.addListener(this.player.events.PLAYBACK_PLAY, this.callback)
      this.player.trigger(this.player.events.API_PLAY).then(assert)
    })

    it('should trigger pause event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_PAUSE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_PAUSE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.player.trigger(this.player.events.API_PLAY).then(() => this.player.trigger(this.player.events.API_PAUSE))
    })

    it('should trigger ratechange event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_RATECHANGE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_RATECHANGE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.player.trigger(this.player.events.API_PLAY).then(() => this.player.trigger(this.player.events.API_RATECHANGE, [2]))
    })

    it('should trigger volumechange event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_VOLUMECHANGE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_VOLUMECHANGE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.player.trigger(this.player.events.API_PLAY).then(() => this.player.trigger(this.player.events.API_VOLUMECHANGE, [0.8]))
    })

    it('should trigger seek event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_SEEKING, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_SEEKED, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.player.trigger(this.player.events.API_PLAY).then(() => this.player.trigger(this.player.events.API_SEEK, [2]))
    })
  })

  describe('insert video element in DOM when parent', function() {
    it('is a string', function(done) {
      let player = new WolfPlayer({ parent: 'body', src: 'base/public/sample.mp4' })

      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).toEqual('VIDEO')
        done()
      })
    })

    it('is a DOM element', function(done) {
      let player =  new WolfPlayer({ parent: document.body, src: 'base/public/sample.mp4' })
      
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).toEqual('VIDEO')
        done()
      })
    })
  })
})
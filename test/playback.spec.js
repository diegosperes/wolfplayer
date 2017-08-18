import utils from './utils'

import WolfPlayer from '../src/player'

describe('Playback', function() {

  afterEach(function() {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  describe('when player ready', function() {

    beforeEach(function(done) {
      this.player = new WolfPlayer(utils.baseOptions)
      this.callback = jasmine.createSpy('spy')
      this.player.addListener(this.player.events.HOOK_READY, () => { 
        this.videoElement = document.querySelector('body video')
        done()
      })
    })

    it('insert video with correct source', function () {
      expect(this.videoElement.src).toMatch(/http:\/\/localhost:[0-9]{4}\/base\/public\/sample\.mp4/)
    })

    it('should trigger play event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_PLAY, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_PLAY, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.play()
    })

    it('should trigger pause event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_PAUSE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_PAUSE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.play().then(() => this.videoElement.pause())
    })

    it('should trigger timeupdate event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_TIMEUPDATE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_TIMEUPDATE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.play()
    })

    it('should trigger progress event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_PROGRESS, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_PROGRESS, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.dispatchEvent(new Event('progress'))
    })

    it('should trigger ratechange event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_RATECHANGE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_RATECHANGE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.play().then(() => this.videoElement.playbackRate = 2)
    })

    it('should trigger volumechange event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_VOLUMECHANGE, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_VOLUMECHANGE, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.play().then(() => this.videoElement.volume = 0.8)
    })

    it('should trigger seek event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_SEEKING, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_SEEKED, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.play().then(() => this.videoElement.currentTime = 2)
    })

    describe('should trigger buffering event when', function() {

      it('loadstart is fired', function(done) {
        this.player.addListener(this.player.events.PLAYBACK_BUFFERING, this.callback)
        this.player.addListener(this.player.events.PLAYBACK_BUFFERING, () => {
          expect(this.callback).toHaveBeenCalled()
          done()
        })

        this.videoElement.dispatchEvent(new Event('loadstart'))
      })

      it('loadeddata is fired', function(done) {
        this.player.addListener(this.player.events.PLAYBACK_BUFFERING, this.callback)
        this.player.addListener(this.player.events.PLAYBACK_BUFFERING, () => {
          expect(this.callback).toHaveBeenCalled()
          done()
        })

        this.videoElement.dispatchEvent(new Event('loaddata'))
      })
    })

    it('should trigger bufferload event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_BUFFELOAD, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_BUFFELOAD, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.dispatchEvent(new Event('canplay'))
    })

    it('should trigger bufferfull event', function(done) {
      this.player.addListener(this.player.events.PLAYBACK_BUFFEFULL, this.callback)
      this.player.addListener(this.player.events.PLAYBACK_BUFFEFULL, () => {
        expect(this.callback).toHaveBeenCalled()
        done()
      })

      this.videoElement.dispatchEvent(new Event('canplaythrough'))
    })
  })

  describe('preload', function() {

    describe('add attribute', function() {

      it('by default', function(done) {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).toEqual('metadata')
          done()
        })
      })

      it('when preload has a value', function(done) {
        let options = Object.assign({playback: {preload: 'none'}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).toEqual('none')
          done()
        })
      })

      it('when preload is undefined', function(done) {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.getAttribute('preload')).toEqual('metadata')
          done()
        })
      })
    })
  })

  describe('autoplay', function() {

    it('add attribute when autoplay is true', function(done) {
      let options = Object.assign({playback: {autoplay: true}}, utils.baseOptions)
      let player = new WolfPlayer(options)
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('autoplay')).toBeTruthy()
        done()
      })
    })

    describe('does not add attribute', function() {

      it('by default', function(done) {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).toBeFalsy()
          done()
        })
      })

      it('when autoplay is false', function(done) {
        let options = Object.assign({playback: {autoplay: false}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).toBeFalsy()
          done()
        })
      })

      it('when autoplay is undefined', function(done) {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('autoplay')).toBeFalsy()
          done()
        })
      })
    })
  })

  describe('loop', function() {

    it('add attribute when loop is true', function(done) {
      let options = Object.assign({playback: {loop: true}}, utils.baseOptions)
      let player = new WolfPlayer(options)
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('loop')).toBeTruthy()
        done()
      })
    })

    describe('does not add attribute', function() {

      it('by default', function(done) {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).toBeFalsy()
          done()
        })
      })

      it('when loop is false', function(done) {
        let options = Object.assign({playback: {loop: false}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).toBeFalsy()
          done()
        })
      })

      it('when loop is undefined', function(done) {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('loop')).toBeFalsy()
          done()
        })
      })
    })
  })

  describe('controls', function() {

    describe('add attribute', function() {

      it('by default', function(done) {
        let player = new WolfPlayer(utils.baseOptions)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).toBeTruthy()
          done()
        })
      })

      it('when controls is true', function(done) {
        let options = Object.assign({playback: {controls: true}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).toBeTruthy()
          done()
        })
      })

      it('when controls is undefined', function(done) {
        let options = Object.assign({playback: {}}, utils.baseOptions)
        let player = new WolfPlayer(options)
        player.addListener(player.events.HOOK_READY, () => {
          let videoElement = document.querySelector('body video')
          expect(videoElement.hasAttribute('controls')).toBeTruthy()
          done()
        })
      })
    })

    it('does not add attribute when controls is false', function(done) {
      let options = Object.assign({playback: {controls: false}}, utils.baseOptions)
      let player = new WolfPlayer(options)
      player.addListener(player.events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.hasAttribute('controls')).toBeFalsy()
        done()
      })
    })
  })
})
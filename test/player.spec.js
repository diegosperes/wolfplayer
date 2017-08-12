import Events from '../src/events'
import WolfPlayer from '../src/player'

describe('Player', () => {
  afterEach(() => {
    for (let video of document.querySelectorAll('video')) { video.parentElement.removeChild(video) }
  })

  describe('insert video element in DOM when parent', () => {
    it('is a string', (done) => {
      let player = new WolfPlayer({ parent: 'body', src: 'teste' })

      player.addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).to.be.equal('VIDEO')
        done()
      })
    })

    it('is a DOM element', (done) => {
      let player =  new WolfPlayer({ parent: document.body, src: 'teste' })
      
      player.addListener(Events.HOOK_READY, () => {
        let videoElement = document.querySelector('body video')
        expect(videoElement.tagName).to.be.equal('VIDEO')
        done()
      })
    })
  })

  it('insert video with correct source', (done) => {
    let player = new WolfPlayer({ parent: document.body, src: 'teste' })

    player.addListener(Events.HOOK_READY, () => {
      let videoElement = document.querySelector('body video')
      expect(videoElement.src).to.match(/http:\/\/localhost:[0-9]{4}\/teste/)
      done()
    })
  })
})
import EventsManager from '../src/events-manager'

/*
  Use this proxy to simulate block operation
*/
let proxy = (callback, ms) => {
  let waitTime = new Date().getTime() + ms

  return () => {
    while (new Date().getTime() < waitTime) {}
    callback()
  }
}

describe('Events Manager', () => {

  let eventsManager

  beforeEach(() => {
    eventsManager = new EventsManager()
  })

  it('add listener and call calback', (done) => {
    let callback = sinon.spy()
    eventsManager.addListener('some-event', callback)
    eventsManager.trigger('some-event', [1, 2, 3]).then(() => {
      callback.should.have.been.calledWithExactly(1, 2, 3)
      done()
    })
  })

  it('does not call calback when event is undefined', (done) => {
    let callback = sinon.spy()
    eventsManager.addListener('some-event', callback)
    eventsManager.trigger(undefined).then(() => {
      callback.should.not.have.been.called
      done()
    })
  })

  it('does not call calback when event does not exist', (done) => {
    let callback = sinon.spy()
    eventsManager.trigger('some-event').then(() => {
      callback.should.not.have.been.called
      done()
    })
  })

  it('call async callback', (done) => {
    let time = 1500
    let callback1 = sinon.spy()
    let callback2 = sinon.spy()

    eventsManager.addListener('some-event', proxy(callback1, time))
    eventsManager.addListener('some-event', proxy(callback2, time))
    eventsManager.trigger('some-event')

    setTimeout(() => {
      callback1.should.have.been.called
      callback2.should.have.been.called
      done()
    }, time)
  })
})
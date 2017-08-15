import { Events, Manager } from '../src/events'


let proxy = {
  blockOperation: (callback, ms) => {
    /*
      Use to simulate block operation
    */
    let waitTime = new Date().getTime() + ms

    return () => {
      while (new Date().getTime() < waitTime) {}
      callback()
    }
  },

  promiseOperation: (callback, ms) => {
    /*
      Use to simulate promise operation
    */
    return () => {
      return new Promise(resolve => {
        setTimeout(() => {
          callback()
          resolve()
        }, ms)
      })
    }
  }
}

describe('Events', () => {

  let events

  beforeEach(() => {
    events = new Events()
  })

  it('should register some events', () => {
    events.register({SOME_EVENT1: 'some:event1', SOME_EVENT2: 'some:event2'})
    expect(events).to.have.property('SOME_EVENT1', 'some:event1')
    expect(events).to.have.property('SOME_EVENT2', 'some:event2')
  })

  it('should throw exception when event already exist', () => {
    let _register = events.register.bind(events, {SOME_EVENT: 'some:event'})
    _register()
    expect(_register).to.throw('SOME_EVENT event already exist')
  })
})

describe('Events Manager', () => {

  let manager

  beforeEach(() => {
    manager = new Manager()
  })

  it('add listener and call calback', (done) => {
    let callback = sinon.spy()
    manager.addListener('some-event', callback)
    manager.trigger('some-event', [1, 2, 3]).then(() => {
      callback.should.have.been.calledWithExactly(1, 2, 3)
      done()
    })
  })

  it('does not call calback when event is undefined', (done) => {
    let callback = sinon.spy()
    manager.addListener('some-event', callback)
    manager.trigger(undefined).then(() => {
      callback.should.not.have.been.called
      done()
    })
  })

  it('does not call calback when event does not exist', (done) => {
    let callback = sinon.spy()
    manager.trigger('some-event').then(() => {
      callback.should.not.have.been.called
      done()
    })
  })

  it('call async callback', (done) => {
    let time = 1500
    let callback1 = sinon.spy()
    let callback2 = sinon.spy()

    manager.addListener('some-event', proxy.blockOperation(callback1, time))
    manager.addListener('some-event', proxy.blockOperation(callback2, time))
    manager.trigger('some-event')

    setTimeout(() => {
      callback1.should.have.been.called
      callback2.should.have.been.called
      done()
    }, time)
  })

  it('wait listener promise to resolve promise event', (done) => {
    let time = 1500
    let callback1 = sinon.spy()
    let callback2 = sinon.spy()

    manager.addListener('some-event', proxy.promiseOperation(callback1, time))
    manager.addListener('some-event', proxy.promiseOperation(callback2, time))
    manager.trigger('some-event').then(() => {
      callback1.should.have.been.called
      callback2.should.have.been.called
      done()
    })
  })

  it('should treat exception from callback', (done) => {
    let callback1 = () => { throw 'some-error' }
    let callback2 = sinon.spy()

    manager.addListener('some-event', callback1)
    manager.addListener('some-event', callback2)
    manager.trigger('some-event').then(() => {
      callback2.should.have.been.called
      done()
    })
  })

  it('should treat reject from promise callback', (done) => {
    let callback1 = () => { return new Promise((resolve, reject) => reject()) }
    let callback2 = sinon.spy()

    manager.addListener('some-event', callback1)
    manager.addListener('some-event', callback2)
    manager.trigger('some-event').then(() => {
      callback2.should.have.been.called
      done()
    })
  })
})
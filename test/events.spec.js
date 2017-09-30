import helpers from '../src/helpers'
import { Events, Manager } from '../src/events'

let proxy = {
  promiseOperation: (callback, ms) => {
    /*
      Use to simulate promise operation
    */
    return () => {
      return new helpers.Promise(resolve => {
        setTimeout(() => {
          callback()
          resolve()
        }, ms)
      })
    }
  }
}

describe('Events', function() {

  beforeEach(function() {
    this.events = new Events()
  })

  it('should register some events', function() {
    this.events.register({SOME_EVENT1: 'some:event1', SOME_EVENT2: 'some:event2'})
    expect(Object.keys(this.events)).toContain('SOME_EVENT1')
    expect(Object.keys(this.events)).toContain('SOME_EVENT2')
  })

  it('should not override event when exist', function() {
    this.events.register({SOME_EVENT: 'some:event'})
    this.events.register({SOME_EVENT: 'some:event1'})
    expect(this.events.SOME_EVENT).toEqual('some:event')
  })
})

describe('Events Manager', function() {

  beforeEach(function() {
    this.manager = new Manager()
  })

  it('add listener and call calback', function(done) {
    let callback = jasmine.createSpy('spy')
    this.manager.addListener('some-event', callback)
    this.manager.trigger('some-event', [1, 2, 3]).then(() => {
      expect(callback).toHaveBeenCalledWith(1, 2, 3)
      done()
    })
  })

  it('does not call calback when event is undefined', function(done) {
    let callback = jasmine.createSpy('spy')
    this.manager.addListener('some-event', callback)
    this.manager.trigger(undefined).then(() => {
      expect(callback).not.toHaveBeenCalled()
      done()
    })
  })

  it('does not call calback when event does not exist', function(done) {
    let callback = jasmine.createSpy('spy')
    this.manager.trigger('some-event').then(() => {
      expect(callback).not.toHaveBeenCalled()
      done()
    })
  })

  it('wait listener promise to resolve promise event', function(done) {
    let time = 1500
    let callback1 = jasmine.createSpy('spy')
    let callback2 = jasmine.createSpy('spy')

    this.manager.addListener('some-event', proxy.promiseOperation(callback1, time))
    this.manager.addListener('some-event', proxy.promiseOperation(callback2, time))
    this.manager.trigger('some-event').then(() => {
      expect(callback1).toHaveBeenCalled()
      expect(callback2).toHaveBeenCalled()
      done()
    })
  })

  it('should treat exception from callback', function(done) {
    let callback1 = () => { throw new Error() }
    let callback2 = jasmine.createSpy('spy')

    this.manager.addListener('some-event', callback1)
    this.manager.addListener('some-event', callback2)
    this.manager.trigger('some-event').then(() => {
      expect(callback2).toHaveBeenCalled()
      done()
    })
  })

  it('should treat reject from promise callback', function(done) {
    let callback1 = () => { return new helpers.Promise((resolve, reject) => reject( new Error() )) }
    let callback2 = jasmine.createSpy('spy')

    this.manager.addListener('some-event', callback1)
    this.manager.addListener('some-event', callback2)
    this.manager.trigger('some-event').then(() => {
      expect(callback2).toHaveBeenCalled()
      done()
    })
  })
})
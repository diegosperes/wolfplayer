export default class EventsManager {

  constructor() {
    this._events = {}
  }

  addListener(event, callback, context=window) {
    if (!(event in this._events)) this._events[event] = []

    this._events[event].push({
      callback: callback,
      context: context
    })
  }

  // TO-DO: call exception when event does not exist
  // TO-DO: treat erro from callback
  trigger(event, args) {
    if (!event in this._events) return

    return new Promise(resolve => {
      let counter = 1
      let expectedCounter = this._events[event].length

      for(let listerner of this._events[event]) {
        setTimeout(() => {
          counter += 1
          listerner.callback.apply(listerner.context, args)
          if (counter === expectedCounter) resolve()  
        }, 0)
      }
    })
  }
}
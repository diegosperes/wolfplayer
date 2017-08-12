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

  // TO-DO: treat erro from callback
  trigger(event, args) {
    return new Promise(resolve => {
      if (!event || !(event in this._events)) {
        resolve()

      } else {
        let counter = 0
        let expectedCounter = this._events[event].length

        for(let listerner of this._events[event]) {
          setTimeout(() => {
            counter += 1
            listerner.callback.apply(listerner.context, args)
            if (counter === expectedCounter) resolve()
          }, 0)
        }
      }
    })
  }
}
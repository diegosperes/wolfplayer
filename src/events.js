class Events {
  register(events) {
    for(let event in events) {
      if (event in this) continue
      this[event] = events[event]
    }
  }
}

class Manager {

  constructor() {
    this.events = new Events()
    this._eventsMap = {}
  }

  addListener(event, callback, context=window) {
    if (!(event in this._eventsMap)) this._eventsMap[event] = []

    this._eventsMap[event].push({
      callback: callback,
      context: context
    })
  }

  trigger(event, args) {
    if (!event || !(event in this._eventsMap)) return Promise.resolve()

    return new Promise(resolve => {
      let counter = 0
      let expectedCounter = this._eventsMap[event].length
      let _resolve = () => { counter += 1; if (counter === expectedCounter) resolve() }
      let _reject = (error) => { this.trigger(this.events.PLAYER_ERROR, [error]); _resolve() }

      for(let listerner of this._eventsMap[event]) {
        new Promise((innerResolve, innerReject) => {
          let result = listerner.callback.apply(listerner.context, args)
          if (result instanceof Promise) result.then(innerResolve, innerReject)
          else innerResolve()
        }).then(_resolve, _reject)
      }
    })
  }
}

export default {
  Events,
  Manager
}
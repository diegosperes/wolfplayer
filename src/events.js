class Events {
  register(events) {
    for(let event in events) {
      if (event in this) throw `${event} event already exist`
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
    return new Promise(resolve => {
      if (!event || !(event in this._eventsMap)) {
        resolve()

      } else {
        let counter = 0
        let expectedCounter = this._eventsMap[event].length

        for(let listerner of this._eventsMap[event]) {
          setTimeout(() => {
            let _resolve = () => { counter += 1; if (counter === expectedCounter) resolve() }

            try {
              let result = listerner.callback.apply(listerner.context, args)
              if (result instanceof Promise) result.then(() => _resolve(), () => _resolve())
              else _resolve()

            } catch (error) {
              _resolve()
            }
          }, 0)
        }
      }
    })
  }
}

export default {
  Events,
  Manager
}
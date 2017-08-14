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

  trigger(event, args) {
    return new Promise(resolve => {
      if (!event || !(event in this._events)) {
        resolve()

      } else {
        let counter = 0
        let expectedCounter = this._events[event].length

        for(let listerner of this._events[event]) {
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
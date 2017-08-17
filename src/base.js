import { Manager } from './events'

class BaseObject {

  static get eventsToRegister() { return {} }
  get events() { return this.manager.events }

  constructor(manager) {
    if(!manager) this.manager = new Manager()
    else this.manager = manager
    this.events.register(this.constructor.eventsToRegister)
    this.bind()
  }

  bind() {}
}

class Plugin extends BaseObject {
  constructor(manager, options) {
    super(manager)
    this.options = options || {}
  }
}

export default {
  BaseObject,
  Plugin
}
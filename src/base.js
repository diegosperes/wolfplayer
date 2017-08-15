import { Manager } from './events'

export default class Baseobject {

  static get register() { return {} }
  get events() { return this.manager.events }

  constructor(manager) {
    if(!manager) this.manager = new Manager()
    else this.manager = manager
    this.events.register(this.constructor.register)
    this.bind()
  }

  bind() { throw 'bind method not implemented' }
}
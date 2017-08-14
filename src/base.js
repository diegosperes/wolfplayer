import EventsManager from './events-manager'

export default class Baseobject {

  constructor(manager) {
    if(!manager) this.manager = new EventsManager()
    else this.manager = manager
    this.bind()
  }

  bind() { throw 'bind method not implemented' }
}
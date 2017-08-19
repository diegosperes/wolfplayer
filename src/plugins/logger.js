import { Plugin } from '../base'

const LOGGER_ERROR = 2
const LOGGER_INFO = 1
const LOGGER_DEBUG = 0

export default class Logger extends Plugin {

  static get eventsToRegister() {
    return {
      LOGGER_ERROR: 'logger:error',
      LOGGER_INFO: 'logger:info',
      LOGGER_DEBUG: 'logger:debug',
      LOGGER_SETLEVEL: 'logger:setlevel'
    }
  }

  get logLevel() {
    if (this.options.logLevel === undefined) this._logLevel = LOGGER_INFO
    else if (this._logLevel === undefined) this._logLevel = this.options.logLevel

    return this._logLevel
  }

  bind() {
    let ignore = ['PLAYER_ERROR', 'LOGGER_INFO', 'LOGGER_ERROR', 'LOGGER_DEBUG']

    for (let event in this.events) {
      if (ignore.indexOf(event) >= 0) continue
      this.manager.addListener(this.events[event], this.proxyDebug(event), this)
    }

    this.manager.addListener(this.events.LOGGER_SETLEVEL, this.onSetLevel, this)
    this.manager.addListener(this.events.PLAYER_ERROR, this.onError, this)
    this.manager.addListener(this.events.LOGGER_ERROR, this.onError, this)
    this.manager.addListener(this.events.LOGGER_INFO, this.onInfo, this)
    this.manager.addListener(this.events.LOGGER_DEBUG, this.onDebug, this)
  }

  onSetLevel(level) { this._logLevel = level }
  onError(message) { if (LOGGER_ERROR >= this.logLevel) console.error(`%c ${message}`, 'color: red') }
  onInfo(message) { if (LOGGER_INFO >= this.logLevel) console.info(`%c ${message}`, 'color: blue') }
  onDebug(message) { if (LOGGER_DEBUG >= this.logLevel) console.debug(`%c ${message}`, 'color: DarkOrange') }
  proxyDebug(event) {
    return (...args) => {
      let message = `Call ${event} event`
      this.onDebug(message)
    }
  }
}
export default class Events {

  static get HOOK_START() { return 'hook:start' }
  static get HOOK_PLUGIN() { return 'hook:plugin' }
  static get HOOK_READY() { return 'hook:ready' }

  static get PLAYBACK_PLAY() { return 'playback:play' }
  static get PLAYBACK_PAUSE() { return 'playback:pause' }
  static get PLAYBACK_SEEKING() { return 'playback:seeking' }
  static get PLAYBACK_SEEKED() { return 'playback:seeked' }

  static get API_PLAY() { return 'api:play' }
  static get API_PAUSE() { return 'api:pause' }
  static get API_SEEK() { return 'api:seek' }

}
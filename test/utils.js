import { Logger } from '../src/plugins/index.js'

const baseOptions = {
  parent: 'body',
  src: 'base/public/sample.mp4',
  plugins: [Logger]
}

export default {
  baseOptions
}
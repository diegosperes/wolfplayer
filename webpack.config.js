module.exports = {
  context: __dirname + "/src",
  entry: {
    Player: ['babel-polyfill', './player.js'],
    Plugin: './plugins/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "wolf[name].js",
    library: 'Wolf[name]',
    libraryTarget: 'umd'
  }
}
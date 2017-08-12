module.exports = {
  context: __dirname + "/src",
  entry: ['babel-polyfill', "./player.js"],
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
    filename: "wolfplayer.js",
    library: 'WolfPlayer',
    libraryTarget: 'umd'
  }
}
module.exports = {
  context: __dirname + "/wolfplayer",
  entry: "./index.js",
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
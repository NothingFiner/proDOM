const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/prodom.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js"]
  },
  devtool: 'source-maps',
  module: {
    loaders: [
    {
      test: [ /\.js?$/,],
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
          presets: ['es2015']
      }
    },
    ]
  }
};

const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "static"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader"
        }
      }
    ]
  },
  optimization: {
    minimize: true,
  }
};
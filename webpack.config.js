module.exports = {
  entry: "./index.jsx",
  mode: "development",
  devServer: {},
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["transform-react-jsx"]
          }
        }
      }
    ]
  }
};

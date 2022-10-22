const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".js", ".mjs", ".ts", ".tsx", ".scss", ".css", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Demo cards",
      filename: "index.html",
      template: "./src/index.html",
      templateParameters: {

      },
      meta: {
        charset: {
          charset: "UTF-8"
        },
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        compatible: {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge"
        }
      }
    })
  ]
};

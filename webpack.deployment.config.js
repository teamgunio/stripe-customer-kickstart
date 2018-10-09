const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const Dotenv = require('dotenv-webpack');

const outputDirectory = "dist";

module.exports = {
  mode: 'production',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new Dotenv({
      systemvars: true,
    }),
  ]
};

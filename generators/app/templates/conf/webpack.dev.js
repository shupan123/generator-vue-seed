const {resolve} = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const context = process.cwd();

module.exports = merge(commonConfig, {
  watch: true,
  output: {
    path: resolve(context, './dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: true
    }),
    new ExtractTextPlugin('style.css')
  ]
});

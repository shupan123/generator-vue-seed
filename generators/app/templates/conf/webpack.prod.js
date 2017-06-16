const {resolve} = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const {DefinePlugin, LoaderOptionsPlugin, optimize} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const context = process.cwd();

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  output: {
    path: resolve(context, './dist'),
    publicPath: './',
    filename: '[name].[chunkhash:6].js'
  },
  plugins: [
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: true
    }),
    new ExtractTextPlugin('style.[chunkhash:6].css')
  ]
});

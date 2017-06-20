const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {optimize, HashedModuleIdsPlugin} = require('webpack');
const {resolve} = require('path');
const context = process.cwd();

const extractCSS = type => {
  return ExtractTextPlugin.extract({
    fallback: type,
    use: [
      {loader: 'css-loader', options: {sourceMap: true}},
      {loader: 'less-loader', options: {sourceMap: true}}
    ]
  });
};

module.exports = {
  context,
  entry: {
    vendor: ['vue'],
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve(context, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            postcss: [require('autoprefixer')({
              browsers: ['ie > 8', '> 5%']
            })],
            loaders: {
              less: extractCSS('vue-style-loader')
            }
          }
        }
      },
      {
        test: /\.less$/,
        use: extractCSS('style-loader')
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new HashedModuleIdsPlugin()
  ]
};

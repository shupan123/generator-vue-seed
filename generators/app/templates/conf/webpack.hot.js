const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const {HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack');

module.exports = merge(devConfig, {
  plugins: [
    new HotModuleReplacementPlugin(), // 开启全局的模块热替换(HMR)
    new NamedModulesPlugin() // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
  ]
});

const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = webpackMerge.merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
});

const path = require('path');
const plugins = require('./src/plugins/webpack');

module.exports = {
  parallel: false, // Fixes <script setup> components not compiling: https://github.com/vuejs/vue-cli/issues/6282
  publicPath: './',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
    plugins,
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.resolve.alias.set(
      'bn.js',
      path.resolve(path.join(__dirname, 'node_modules', 'bn.js'))
    );
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  }
};

const { join, resolve } = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const __isWindows__ = process.platform === 'win32';
const args = require('minimist')(process.argv);

//配置HTTPS
const ENABLE_SSL = args['https'];

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: ENABLE_SSL || __isWindows__ ? 'localhost' : '0.0.0.0',
    port: process.env.PORT || 3000,
    https: ENABLE_SSL && {
      key: fs.readFileSync(join(__dirname, 'ssl/ssl.localhost.key')),
      cert: fs.readFileSync(join(__dirname, 'ssl/ssl.localhost.crt'))
    },
    allowedHosts: ENABLE_SSL ? ['localhost'] : [],
    proxy: {
      '/api': {
        target: 'http://localhost',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

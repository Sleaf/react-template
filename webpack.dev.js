const { join, resolve } = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const devServer = {
  disableHostCheck: true,
  historyApiFallback: true,
  compress: true,
  host: process.platform === 'win32' ? 'localhost' : '0.0.0.0',
  port: process.env.PORT || 3000,
  proxy: {
    '/api': {
      target: 'http://localhost',
      secure: false,
      changeOrigin: true,
    },
  },
};

//配置HTTPS
// const ENABLE_SSL = true;
const ENABLE_SSL = false;
if (ENABLE_SSL) {
  Object.assign(devServer, {
    host: 'localhost',
    https: {
      key: fs.readFileSync(join(__dirname, 'ssl/ssl.localhost.key')),
      cert: fs.readFileSync(join(__dirname, 'ssl/ssl.localhost.crt'))
    },
    allowedHosts: ['localhost'],
  })
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer,
});

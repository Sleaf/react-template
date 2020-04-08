import fs from 'fs';
import os from 'os';
import { resolve } from 'path';
import merge from 'webpack-merge';
import common, { isWindows, PUBLIC_PATH } from './webpack.common';
import mockServer from './mockServer/index';

const args = require('minimist')(process.argv);

// Configs
const ENABLE_SSL: boolean = args['https'];
const ENABLE_MOCK_SERVER: boolean = args['mock'];

// Network
const exportPort = Number(process.env.PORT) || 3000;
const ips = os.networkInterfaces();
const availableIpv4 = Object.values(ips)
  .map(item => item.filter(addr => addr.family === 'IPv4' && !addr.internal)) // 只输出外网地址
  .reduce((acc, item) => acc.concat(item), [])
  .map(item => item.address);

export default merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    publicPath: PUBLIC_PATH,
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: ENABLE_SSL ? 'localhost' : availableIpv4[0] || (isWindows ? '127.0.0.1' : '0.0.0.0'),
    port: exportPort,
    https: ENABLE_SSL && {
      key: fs.readFileSync(resolve(__dirname, 'ssl/ssl.localhost.key')),
      cert: fs.readFileSync(resolve(__dirname, 'ssl/ssl.localhost.crt')),
    },
    before: ENABLE_MOCK_SERVER ? mockServer : undefined,
    proxy: {
      '/api': {
        target: 'http://localhost',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

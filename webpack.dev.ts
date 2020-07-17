import fs from 'fs';
import os from 'os';
import { resolve } from 'path';
import merge from 'webpack-merge';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import common, { BUILD_RESOURCE_NAME, isWindows, PUBLIC_PATH } from './webpack.common';
import mockServer from './mockServer/index';

const args = require('minimist')(process.argv);

// Configs
const ENABLE_SSL: boolean = args['https'];
const ENABLE_MOCK_SERVER: boolean = args['mock'];

// Network
const exportPort = Number(process.env.PORT) || 3000;
const ips = os.networkInterfaces();
const availableIpv4 = Object.values(ips)
  .map(item => item!.filter(addr => addr.family === 'IPv4' && !addr.internal)) // 只输出外网地址
  .reduce((acc, item) => acc.concat(item), [])
  .map(item => item.address);

const devServer = {
  disableHostCheck: true,
  historyApiFallback: {
    rewrites: [{ from: new RegExp(`^${PUBLIC_PATH}(?!${BUILD_RESOURCE_NAME})`), to: PUBLIC_PATH }],
  },
  hot: true,
  compress: true,
  quiet: true,
  overlay: true,
  host: ENABLE_SSL ? 'localhost' : isWindows ? availableIpv4[0] || '127.0.0.1' : '0.0.0.0',
  port: exportPort,
  https: ENABLE_SSL && {
    key: fs.readFileSync(resolve(__dirname, 'ssl/ssl.localhost.key')),
    cert: fs.readFileSync(resolve(__dirname, 'ssl/ssl.localhost.crt')),
  },
  before: ENABLE_MOCK_SERVER ? mockServer : undefined,
  proxy: {
    [`${PUBLIC_PATH}api`]: {
      target: 'http://localhost',
      secure: false,
      changeOrigin: true,
    },
  },
};

export default merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer,
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Server is running: http${ENABLE_SSL ? 's' : ''}://${availableIpv4[0]}:${devServer.port}${PUBLIC_PATH}`,
        ],
      },
      clearConsole: true,
    }),
  ],
});

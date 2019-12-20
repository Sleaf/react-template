import { resolve } from 'path';
import fs from 'fs';
import merge from 'webpack-merge';
import common, { __isWindows__ } from './webpack.common';
import mockServer from './mockServer/index';

const args = require('minimist')(process.argv);

// Configs
const ENABLE_SSL: boolean = args['https'];
const ENABLE_mockServer: boolean = args['mock'];

export default merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: ENABLE_SSL || __isWindows__ ? 'localhost' : '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    https: ENABLE_SSL && {
      key: fs.readFileSync(resolve(__dirname, 'ssl/ssl.localhost.key')),
      cert: fs.readFileSync(resolve(__dirname, 'ssl/ssl.localhost.crt')),
    },
    before: ENABLE_mockServer ? mockServer : undefined,
    proxy: {
      '/api': {
        target: 'http://localhost',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

import { resolve } from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import pkg from './package.json';

// Plugins
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// env
export const isWindows = process.platform === 'win32';
const isDev = process.env.NODE_ENV === 'development';
const isPrd = process.env.NODE_ENV === 'production';

// config
const additionHash = isPrd ? '.[hash]' : '';
export const PUBLIC_PATH = '/';
export const BUILD_RESOURCE_NAME = 'resources';

// css loader
const toStyleLoader = (suffix: string | Array<string>, loaderPrefix, options?) => {
  const suffixList = Array.isArray(suffix) ? suffix : [suffix];
  return {
    test: new RegExp(`\\.(${suffixList.join('|')})$`),
    use: [
      { loader: MiniCssExtractPlugin.loader, options: { hmr: isDev } },
      'css-loader',
      'postcss-loader',
      {
        loader: `${loaderPrefix}-loader`,
        options: {
          sourceMap: isDev,
          ...options,
        },
      },
    ],
  };
};
const styleSupportList = [
  { suffix: ['css'], loaderPrefix: 'css' },
  {
    suffix: ['less'],
    loaderPrefix: 'less',
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  },
  { suffix: ['sass', 'scss'], loaderPrefix: 'sass' },
  { suffix: ['styl'], loaderPrefix: 'stylus' },
];

export default {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: PUBLIC_PATH,
    filename: `${BUILD_RESOURCE_NAME}/js/[name]${additionHash}.js`,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: resolve(__dirname, 'src'),
        use: ['thread-loader', 'babel-loader?cacheDirectory=true'],
      },
      ...styleSupportList.map(({ suffix, loaderPrefix, options }) => toStyleLoader(suffix, loaderPrefix, options)),
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `${BUILD_RESOURCE_NAME}/images/[hash].[ext]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          size: 16,
          hash: 'sha512',
          digest: 'hex',
          name: `${BUILD_RESOURCE_NAME}/fonts/[hash].[ext]`,
        },
      },
    ],
  },
  plugins: [
    // 复制静态资源
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: BUILD_RESOURCE_NAME, toType: 'dir' }],
    }),
    // 全局变量定义
    new webpack.DefinePlugin({
      isPrd: JSON.stringify(isPrd),
      isDev: JSON.stringify(isDev),
      isWindows: JSON.stringify(process.platform === 'win32'),
    }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: `${BUILD_RESOURCE_NAME}/css/style${additionHash}.css`,
      chunkFilename: `${BUILD_RESOURCE_NAME}/css/[id]${additionHash}.css`,
    }),
    // 确保 vendors 的 chunkhash 只随内容变化
    // @see https://webpack.js.org/guides/caching/#module-identifiers
    new webpack.HashedModuleIdsPlugin(),
    new HtmlwebpackPlugin({
      title: 'Loading...',
      version: `${pkg.version}`,
      publishDate: new Date().toLocaleString(),
      filename: 'index.html',
      favicon: 'src/assets/favicon.ico',
      template: 'src/index.html',
      inject: true,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    // typescript type check
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
};

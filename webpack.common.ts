import { resolve } from 'path';
import webpack from 'webpack';
import os from 'os';
import HappyPack from 'happypack';
import pkg from './package.json';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// Plugins
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

// env
export const __isWindows__ = process.platform === 'win32';
const __isDev__ = process.env.NODE_ENV === 'development';
const __isPrd__ = process.env.NODE_ENV === 'production';
const additionHash = __isPrd__ ? '.[hash]' : '';

// css loader
const toStyleLoader = (suffix: string | Array<string>, loaderPrefix, options?) => {
  const suffixList = Array.isArray(suffix) ? suffix : [suffix];
  return {
    test: new RegExp(`\\.(${suffixList.join('|')})$`),
    use: [
      { loader: MiniCssExtractPlugin.loader, options: { hmr: __isDev__ } },
      'css-loader',
      'postcss-loader',
      {
        loader: `${loaderPrefix}-loader`,
        options: {
          sourceMap: __isDev__,
          ...options,
        },
      },
    ],
  };
};
const styleSupportList = [
  { suffix: ['css'], loaderPrefix: 'css' },
  { suffix: ['less'], loaderPrefix: 'less', options: { javascriptEnabled: true } },
  { suffix: ['sass', 'scss'], loaderPrefix: 'sass' },
  { suffix: ['styl'], loaderPrefix: 'stylus' },
];

export default {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: `resources/js/[name]${additionHash}.js`,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        loader: 'happypack/loader?id=happy-babel',
      },
      ...styleSupportList.map(({ suffix, loaderPrefix, options }) => toStyleLoader(suffix, loaderPrefix, options)),
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `resources/images/[hash].[ext]`,
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
          name: `resources/fonts/[hash].[ext]`,
        },
      },
    ],
  },
  plugins: [
    // 复制静态资源
    new CopyWebpackPlugin([{ from: 'public', to: 'resources', toType: 'dir' }]),
    // 全局变量定义
    new webpack.DefinePlugin({
      __isPrd__: JSON.stringify(__isPrd__),
      __isDev__: JSON.stringify(__isDev__),
      __isWindows__: JSON.stringify(process.platform === 'win32'),
    }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: `resources/css/style${additionHash}.css`,
      chunkFilename: `resources/css/[id]${additionHash}.css`,
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
    // parallel build
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happy-babel',
      //如何处理  用法和loader 的配置一样
      loaders: ['babel-loader?cacheDirectory=true'],
      //共享进程池
      threads: os.cpus().length * 2,
    }),
    // typescript type check
    new ForkTsCheckerWebpackPlugin(),
    // tree shaking
    new WebpackDeepScopeAnalysisPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
};

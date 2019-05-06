import { resolve } from 'path';
import webpack from 'webpack';
import os from 'os';
import pkg from './package.json';
// Plugins
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

export default {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'resources/js/[name].[hash].js',
    publicPath: '/',
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
      {
        test: /\.(c|le)ss$/,
        use: (process.env.NODE_ENV === 'development'
          ? ['css-hot-loader', 'style-loader']
          : [MiniCssExtractPlugin.loader])
          .concat([
            'css-loader',
            'postcss-loader',
            'less-loader?javascriptEnabled=true',
          ]),
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          publicPath: '/',
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
          publicPath: '/',
        },
      },
    ],
  },
  plugins: [
    // 复制静态资源
    new CopyWebpackPlugin([{ from: 'src/static', to: 'resources', toType: 'dir' },]),
    // 提取css
    new MiniCssExtractPlugin({ filename: 'resources/css/style.[hash].css' }),
    // 确保 vendors 的 chunkhash 只随内容变化
    // @see https://webpack.js.org/guides/caching/#module-identifiers
    new webpack.HashedModuleIdsPlugin(),
    new HtmlwebpackPlugin({
      title: 'Loading...',
      version: `${pkg.version}`,
      buildTime: new Date().toLocaleString(),
      filename: 'index.html',
      favicon: 'src/assets/favicon.ico',
      template: 'src/index.html',
      inject: true,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
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
      threadPool: HappyPack.ThreadPool({ size: os.cpus().length * 2 }),
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    // typescript type check
    new ForkTsCheckerWebpackPlugin(),
    // tree shaking
    new WebpackDeepScopeAnalysisPlugin(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
      '@': resolve(__dirname, './src'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

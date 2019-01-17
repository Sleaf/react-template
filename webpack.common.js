const { resolve } = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolveToStaticPath = relativePath => resolve(__dirname, relativePath);
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/index.js',
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'resources/js/[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
        test: /\.(jpg|png|gif|webp)$/,
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
    // 复制错误页面
    new CopyWebpackPlugin([{ from: 'src/static', to: 'resources', toType: 'dir' },]),
    //提取css
    new MiniCssExtractPlugin({
      filename: 'resources/css/style.[hash].css',
    }),
    // 确保 vendors 的 chunkhash 只随内容变化
    // @see https://webpack.js.org/guides/caching/#module-identifiers
    new webpack.HashedModuleIdsPlugin(),
    new HtmlwebpackPlugin({
      title: 'Loading...',
      filename: 'index.html',
      favicon: 'src/assets/favicon.ico',
      template: 'src/index.html',
      inject: 'body',
      version: `${pkg.version}`,
    }),
    //parallel build
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happy-babel',
      //如何处理  用法和loader 的配置一样
      loaders: [
        'react-hot-loader/webpack',
        'babel-loader?cacheDirectory=true',
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    //tree shaking
    new WebpackDeepScopeAnalysisPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolveToStaticPath('./src'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

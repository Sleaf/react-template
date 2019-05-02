const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const args = require('minimist')(process.argv);

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      // 使用 cssnano 优化
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          // zindex 不优化
          zindex: {
            disabled: true,
          },
        },
        canPrint: true,
      }),
      new UglifyJsPlugin({
        exclude: /node_modules/,
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
        sourceMap: false,
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'vendors',
    // },
    // runtimeChunk: {
    //   name: 'runtime',
    // },
  },
  plugins: [
    // 移除 dist 目录
    new CleanWebpackPlugin(),
    // 图形化分析工具
    ...(args['analyze'] ? [new BundleAnalyzerPlugin()] : []),
  ],
});

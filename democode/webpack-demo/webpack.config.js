const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output:{
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: 'build/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
              ],
              plugins: [
                'transform-runtime',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]_[hash:base64:5]',
                modules: true,
                minimize: true,
              },
            },
            {
              loader: 'less-loader',
            }
          ],
        }),
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './build/index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      // name: 'common',
      // chunks: 'all',
    },
    minimize: true,
  },
};

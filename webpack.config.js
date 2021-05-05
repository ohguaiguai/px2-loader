const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 使用自定义的 loader, 方法一
const px2remLoaderPath = path.resolve(__dirname, 'loaders/my-px2rem-loader.js');
const px2vwLoaderPath = path.resolve(__dirname, 'loaders/my-px2vw-loader.js');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolveLoader: {
    alias: {
      'px2rem-loader': px2remLoaderPath,
      'px2vw-loader': px2vwLoaderPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            // loader: 'px2rem-loader',
            loader: 'px2vw-loader',
            options: {
              // remUnit: 75,
              // remPrecision: 8, // 保留8位小数
              vwPrecision: 8,
              exclude: /antd\.css/,
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

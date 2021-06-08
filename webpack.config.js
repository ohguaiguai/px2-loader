const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const reactDevLoaderPath = path.resolve(
//   __dirname,
//   'loaders/react-dev-loader.js'
// );

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  // resolveLoader: {
  //   alias: {
  //     'react-dev-loader': reactDevLoaderPath,
  //   },
  // },
  devServer: {
    inline: true,
    port: 8008,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'react-dev-loader',
            options: {},
          },
        ],
        exclude: /node_modules/,
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
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

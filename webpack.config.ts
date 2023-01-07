console.log('The custom config is used');
const webpack = require('webpack');
const path = require('path');
module.exports = {
  // entry: path.resolve('src/main.ts'),
  mode: 'development',
  target: 'electron-main', //electron-main or web
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /cryptonic\.node$/,
        use: [
          {
            loader: 'node-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __dirname: false,
    }),
  ],
  resolve: {},
};

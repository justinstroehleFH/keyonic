const webpack = require('webpack');
module.exports = {
  mode: 'development',
  target: 'electron-main', //electron-main or web
  node: {
    __dirname: true,
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
};

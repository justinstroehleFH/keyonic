const webpack = require('webpack');
module.exports = {
  mode: 'development',
  target: 'node18.12', //electron-main or web
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

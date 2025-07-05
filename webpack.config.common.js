const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const webpackConfig = require("./webpack.config.js");

module.exports = merge(webpackConfig, {
  entry:
  {
    index: {
      import: 'src\\index.ts',
      dependOn: 'shared'
    },
    // https://webpack.js.org/guides/code-splitting/#entry-dependencies
    another: {
      import: './src/map/another-module.ts',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  optimization: {
    runtimeChunk: 'single',
  },

  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'scripts/main-[id]-[fullhash].js',
    publicPath: '/',
    clean: true,

  },
  optimization: {
    runtimeChunk: 'single',
  },

  module: {
      rules: [
        {
          test: /\.s?[ac]ss$/i,
          exclude: /\.module\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader',
            'sass-loader'
  
          ],
  
        },
      ]
    },
  plugins: [
    new BundleTracker({
      path: path.join(__dirname, '../static/bundles'),
      filename: 'webpack-stats.json'
    }),
     new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
});


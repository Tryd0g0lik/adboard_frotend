const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const webpackConfig = require("./webpack.config.js");
const merge = require("merge");
// const CopyPlugin = require("copy-webpack-plugin");
// const ChunksWebpackPlugin = require('chunks-webpack-plugin');

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
    path: path.resolve(__dirname, '../static/ads'),
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


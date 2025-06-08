const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
// const ChunksWebpackPlugin = require('chunks-webpack-plugin');

module.exports = {
  mode: 'none',
  cache: false, // the cache is close
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     maxSize: 200000,
  //   },
  // },
  // https://webpack.js.org/guides/code-splitting/#entry-dependencies
  optimization: {
    runtimeChunk: 'single',
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Удалите все комментарии
          },
        },
        extractComments: false, // Не сохранять комментарии в отдельный файл
      }),
    ],

  },
  // performance: {
  //   maxAssetSize: 70000, // Set max asset size to 300 KiB
  //   maxEntrypointSize: 70000, // Set max entry point size to 300 KiB
  //   // hints: 'warning', // Can be 'error', 'warning', or false
  // },
  target: 'web',
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
    new Dotenv(),
    new CleanWebpackPlugin(), // the 'dist/' is cleans
    // new ChunksWebpackPlugin(
    //   { generateChunksFiles: false }
    // ),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "src/pictures", to: "pictures" },
    //   ]
    // }),

    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: "index.html"
    }),

    new ESLintPlugin({
      files: 'src/',

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

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "node_modules"),
    ],
    alias: {
      "@ADBoards": path.resolve(__dirname, "src/adboard"),
      "@ADBoards-handlers": path.resolve(__dirname, "src/adboard/scripts/handlers"),
      "@ADS": path.resolve(__dirname, "src/ads"),
      "@ADS-handlers": path.resolve(__dirname, "src/ads/scripts/handlers"),
      "@ENV": path.resolve(__dirname, "dotenv__.ts"),
      // "@Interfaces": path.resolve(__dirname, "src/interfaces.ts"),
    }
  },

};


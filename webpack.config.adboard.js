const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const webpackConfig = require("./webpack.config.js");
const merge = require("merge");

module.exports = merge(webpackConfig, {
  entry:
  {
    index: {
      import: 'src/adboard/index.ts',
      dependOn: 'shared'
    },
    // https://webpack.js.org/guides/code-splitting/#entry-dependencies
    another: {
      import: 'src/adboard/map/another-module.ts',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  optimization: {
    runtimeChunk: 'single',
  },

  output: {
    path: path.resolve(__dirname, '../adboard/static/adboard'),
    filename: 'scripts/main-[id]-[fullhash].js',
    publicPath: '/',
    clean: true,


  },

  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './babel.config.js'),
            }
          },
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),

        ]

      },
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
    // new CopyPlugin({
    //   patterns: [
    //     { from: "src/pictures", to: "pictures" },
    //   ]
    // }),
    new BundleTracker({
      path: path.join(__dirname, '../adboard/static/bundles'),
      filename: 'webpack-stats.json'
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: '[file].map.[query]',
      include: path.resolve(__dirname, '../adboard/static/bundles'),
      columns: true
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


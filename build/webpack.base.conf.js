var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var lodash = require('lodash');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // entry: {
  //   vendor: './src/scss/vendor.scss',
  //   app: './src/main.js',
  // },
  //multi pages
  entry: lodash.assign({
    vendor: './src/scss/vendor.scss',
  }, utils.getEntries('./src/modules/**/*.js')),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /basic\.scss$/,
        loader: ExtractTextPlugin.extract({use: ['css-loader', 'postcss-loader', 'sass-loader']}),
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      process.env.NODE_ENV === 'production' ?
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          include: [resolve('src'), resolve('test')],
          query: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]',
            outputPath: utils.assetsPath('/'),
            publicPath: '../'
          }
        } : {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          include: [resolve('src'), resolve('test')],
          query: {
            limit: 10000,
            name: utils.assetsPath('images/[name].[hash:7].[ext]'),
          }
        },
      process.env.NODE_ENV === 'production' ? {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src'), resolve('test')],
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
          outputPath: utils.assetsPath('/'),
          publicPath: '../'
        }
      } : {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src'), resolve('test')],
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        }
      }
    ]
  }
}

const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const extractBaseCSS = new ExtractTextPlugin("css/[name].css");
const extractCriticalCSS = new ExtractTextPlugin("css/critical.css");

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  // define as many entry points as you want here
  entry: {
    app: APP_DIR + '/js/index.js'
    // page1: APP_DIR + '/js/page1.js',
    // page2: APP_DIR + '/js/page2.js'
  },
  output: {
    sourceMapFilename: 'bundle.map',
    filename: '[name].js',
    path: BUILD_DIR
  },
  devServer: {
    contentBase: BUILD_DIR
  },
  devtool: 'source-map',
  module: {
    rules: [
        {
          test : /\.jsx$/,
          exclude: /node_modules/,
          loader : 'babel-loader'
        },
        {
          test: /\.js$/,
          loader: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
          use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        },
        {

          test: /\.scss/i,
          exclude: /\.crit.scss/,
          loader: extractBaseCSS.extract({
            use: [
              "css-loader", // translates CSS into CommonJS
              'resolve-url-loader',
              "sass-loader?sourceMap" // compiles Sass to CSS
            ]
            })
          },
          {
            test: /\.crit.scss/i,
            loader: extractCriticalCSS.extract({
              use: [
                "css-loader", // translates CSS into CommonJS
                'resolve-url-loader',
                "sass-loader?sourceMap" // compiles Sass to CSS
              ]
            })
          }]
    },
    plugins : [
      new WebpackNotifierPlugin({
        excludeWarnings: true
      }),
      new FlowBabelWebpackPlugin({
        warn: true
      }),
      new CleanWebpackPlugin([BUILD_DIR + '/**/*.*'], {
        watch: true,
        verbose:  true
      }),
      new HtmlWebpackPlugin({
        title: 'insert title here',
        description: 'insert description here',
        author: 'James Westwood',
        keywords: '----, ----, ----, ----',
        hash: true,
        filename: BUILD_DIR + '/index.html',
        template: APP_DIR + '/templates/main.ejs',
        inlineSource: '.(crit.css)$',
        excludeChunks: ['library']
      }),
      extractBaseCSS,
      extractCriticalCSS,
      new StyleExtHtmlWebpackPlugin('css/critical.css'), // inline critical css in head
      new CopyWebpackPlugin([
        {
          from: APP_DIR + '/fonts',
          to :  'fonts'
        }
      ]),
      new CopyWebpackPlugin([
        {
          from: APP_DIR + '/css/**/*.+(png|jpg)',
          flatten: true,
          to: 'css'
        }
      ]),
      new CopyWebpackPlugin([ // copy any images referenced in our component postcss files
        {
          from: APP_DIR + '/js/components/**/*.+(png|jpg)',
          flatten: true,
          to: 'css'
        }
      ])
  ]
};

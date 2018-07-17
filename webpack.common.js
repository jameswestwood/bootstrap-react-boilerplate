const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  // define as many entry points as you want here
  entry: {
    app: APP_DIR + '/js/index.tsx'
    // page1: APP_DIR + '/js/page1.js',
    // page2: APP_DIR + '/js/page2.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: BUILD_DIR
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader : 'ts-loader',
          /*
          options: {
            transpileOnly: true //HMR doesn't work without this - https://github.com/TypeStrong/ts-loader/tree/master/examples/hot-module-replacement
          }*/
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
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ],
        }
      ]
    },
    plugins : [
      new WebpackNotifierPlugin({
        excludeWarnings: true
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
        excludeChunks: ['library']
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      /*new StyleExtHtmlWebpackPlugin('css/critical.css'), // inline critical css in head*/
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

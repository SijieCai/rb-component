'use strict';
var path = require('path');
var args = require('minimist')(process.argv.slice(2));
var allowedEnvs = [
  'dev',
  'hot',
  'dist'
];
var env = args.env;
if (allowedEnvs.indexOf(env) === -1) {
  throw new Error('please specify a environment such \'dev\' or \'dist\'');
}
process.env.REACT_WEBPACK_ENV = env;
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}
var docRoot = path.join(__dirname, '/doc/app');
var srcRoot = path.join(__dirname, '/src');
var base = {
  entry: { doc: docRoot },
  output: {
    path: 'doc/build',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    alias: {
      components: srcRoot,
      doc: docRoot
    }
  },
  module: {
    preLoaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [docRoot, srcRoot],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader?name=[path][name].[ext]&limit=200000'
      }
    ]
  },
  postcss: function () {
    return [
      autoprefixer,
      precss
    ];
  },
  plugins: [],
  devServer: {
    port: 8361,
    historyApiFallback: {
      rewrites: [{
          from: /\/doc/,
          to: '/index.html'
        }]
    }
  }
};
var configs = {};
configs.dev = _.merge({
  cache: true,
  devtool: 'inline-source-map'
}, base);
configs.hot = _.merge({
  cache: true,
  devtool: 'inline-source-map'
}, base);
configs.hot.module.loaders[0].loader = 'react-hot-loader!babel-loader';
configs.dist = _.merge({
  cache: false,
  devtool: 'eval',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, base);
module.exports = configs[env];
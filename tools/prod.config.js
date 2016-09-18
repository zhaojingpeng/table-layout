var path                = require('path');
var webpack             = require("webpack");
var webpackConfigExtend = require('webpack-config-extend');
var CleanWebpackPlugin  = require('clean-webpack-plugin');
var CopyWebpackPlugin   = require('copy-webpack-plugin');

var dist = path.join(__dirname, '../../');

module.exports = webpackConfigExtend(require('./base.config'), {
  //devtool: 'source-map',
  separateStylesheet: true,

  output: {
    path: path.join(dist, 'assets'),
  },

  plugins: [
    new CleanWebpackPlugin([
        //'back-end/views', 
        'assets'
      ], {
      root: dist,
      verbose: true,
      dry: false
    }),

    new CopyWebpackPlugin([
      //{ from: 'views', to: path.join(dist, 'back-end/views') },
      { from: 'src/assets', to: path.join(dist, 'assets') },
    ]),
    // this allows uglify to strip all warnings
    // from Vue.js source code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // This minifies not only JavaScript, but also
    // the templates (with html-minifier) and CSS (with cssnano)!
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
})

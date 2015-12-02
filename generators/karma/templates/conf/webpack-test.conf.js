// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var conf = require('./gulp.conf');
var path = require('path');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}],
    loaders: [{ test: /\.js$/, exclude: /(node_modules|.*\.spec\.js)/, loader: 'isparta-instrumenter'}],
<% if (framework === 'react') { -%>
    postLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel'}]
<% } else if (framework === 'angular1') { -%>
    postLoaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel']}]
<% } else { -%>
    postLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel'}]
<% } -%>
  }
};

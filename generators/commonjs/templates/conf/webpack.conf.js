// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var conf = require('./gulp.conf');
var path = require('path');

module.exports = {
  debug: true,
  devtool: '#eval-source-map',

<% if (framework === 'react') { -%>
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './' + path.join(conf.paths.src, 'index')
  ],
<% } else { -%>
  entry: './' + path.join(conf.paths.src, 'index'),
<% } -%>

  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
<% if (framework === 'react') { -%>
    new webpack.HotModuleReplacementPlugin(),
<% } -%>
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}],
<% if (framework === 'react') { -%>
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}]
<% } else if (framework === 'angular1') { -%>
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel']}]
<% } else { -%>
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel'}]
<% } -%>
  }
};
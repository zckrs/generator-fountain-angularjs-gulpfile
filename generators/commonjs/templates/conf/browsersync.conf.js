var conf = require('./gulp.conf');
<% if (framework === 'react') { -%>
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConf = require('./webpack.conf');
var webpackBundler = webpack(webpackConf);
<% } -%>

module.exports = function() {
  return {
    server: {
      baseDir: [ conf.paths.tmp, conf.paths.src ],
      routes: { '/node_modules': 'node_modules' }<% if (framework === 'react') { %>,<% } %>
<% if (framework === 'react') { -%>
      middleware: [
        webpackDevMiddleware(webpackBundler, { stats: { colors: true } }),
        webpackHotMiddleware(webpackBundler)
      ]
<% } -%>
    }
  };
};

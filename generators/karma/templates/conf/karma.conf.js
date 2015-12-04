const path = require('path');
const conf = require('./gulp.conf');

const pathSrcJs = path.join(conf.paths.src, 'index.spec.js');
<% if (framework === 'angular1') { -%>
const pathSrcHtml = path.join(conf.paths.src, '/**/*.html');
<% } -%>

const preprocessors = {};
<% if (dependencyManagement === 'commonjs') { -%>
preprocessors[pathSrcJs] = ['webpack'];
<% } -%>
<% if (framework === 'angular1') { -%>
preprocessors[pathSrcHtml] = ['ng-html2js'];
<% } -%>

module.exports = function (config) {
  var configuration = {
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
<% if (framework === 'angular1') { -%>
      require('karma-ng-html2js-preprocessor'),
<% } -%>
      require('karma-coverage'),
      require('karma-webpack')
    ],

    basePath: '../',

    files: [ pathSrcJs ],

<% if (singleRun) { -%>
    singleRun: true,

    autoWatch: false,
<% } else { -%>
    singleRun: false,

    autoWatch: true,
<% } -%>

    preprocessors,

<% if (singleRun) { -%>
    reporters: ['progress', 'junit', 'coverage'],
<% } else { -%>
    reporters: ['progress'],
<% } -%>

<% if (framework === 'angular1') { -%>
    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/',
      moduleName: 'app'
    },

<% } -%>
<% if (dependencyManagement === 'commonjs') { -%>
    webpack: require('./webpack-test.conf.js'),

    webpackMiddleware: { noInfo: true },

<% } -%>
    logLevel: 'WARN',

    frameworks: [ 'phantomjs-shim', 'jasmine' ],

    junitReporter: { outputDir: 'test-reports' },

    browsers: [ 'PhantomJS' ]
  };

  config.set(configuration);
};

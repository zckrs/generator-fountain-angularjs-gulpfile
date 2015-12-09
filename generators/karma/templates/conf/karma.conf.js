const path = require('path');
const conf = require('./gulp.conf');

<% if (dependencyManagement === 'commonjs') { -%>
const pathSrcJs = path.join(conf.paths.src, 'index.spec.js');
<% } -%>
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
<% if (dependencyManagement === 'systemjs') { -%>
    frameworks: [ 'phantomjs-shim', 'jspm', 'jasmine' ],
<% } else { -%>
    frameworks: [ 'phantomjs-shim', 'jasmine' ],
<% } -%>

    browsers: [ 'PhantomJS' ],

    basePath: '../',

<% if (dependencyManagement === 'commonjs') { -%>
<%   if (framework === 'angular2') { -%>
    files: [
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/es6-shim/es6-shim.js',
      pathSrcJs
    ],
<%   } else { -%>
    files: [ pathSrcJs ],
<%   } -%>

<% } -%>
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
<% if (dependencyManagement === 'systemjs') { -%>
    jspm: {
<%   if (framework === 'angular2') { -%>
      loadFiles: [
        'node_modules/es6-shim/es6-shim.js',
        'jspm_packages/npm/reflect-metadata@0.1.2/Reflect.js',
        // Very strange bug, using *.js fail with an "ENFILE" file error
        'src/app/hello.js',
        'src/app/hello.spec.js'
      ]
<%   } else if (framework === 'angular1') { -%>
      loadFiles: [ 'src/**/*.js' ]
<%   } else { -%>
      loadFiles: [ 'src/app/**/*.js' ]
<%   } -%>
    },

<% } -%>
    logLevel: 'INFO',

    junitReporter: { outputDir: 'test-reports' },

    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
<% if (framework === 'angular1') { -%>
      require('karma-ng-html2js-preprocessor'),
<% } -%>
<% if (dependencyManagement === 'commonjs') { -%>
      require('karma-webpack'),
<% } -%>
<% if (dependencyManagement === 'systemjs') { -%>
      require('karma-jspm'),
<% } -%>
      require('karma-coverage')
    ]
  };

  config.set(configuration);
};

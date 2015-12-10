const path = require('path');
const conf = require('./gulp.conf');
<% if (dependencyManagement === 'inject') { -%>
const wiredep = require('wiredep');
<% } -%>

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

<% if (dependencyManagement === 'inject') { -%>
function listFiles() {
  var wiredepOptions = Object.assign({}, conf.wiredep, {
<% if (framework === 'react') { -%>
    overrides: {
      react: { main: [ 'react-with-addons.js' ] }
    },
<% } -%>
    dependencies: true,
    devDependencies: true
  });

  var patterns = [
    ...wiredep(wiredepOptions).js,
<% if (framework === 'angular1') { -%>
    path.join(conf.paths.tmp, '/**/*.js'),
    pathSrcHtml
<% } -%>
<% if (framework === 'react') { -%>
    path.join(conf.paths.tmp, '/app/**/*.js')
<% } -%>
  ];

  var files = patterns.map(pattern => ({ pattern: pattern }));
  files.push({
    pattern: path.join(conf.paths.src, '/assets/**/*'),
    included: false,
    served: true,
    watched: false
  });
  return files;
}

<% } -%>
module.exports = function (config) {
  var configuration = {
<% if (dependencyManagement === 'systemjs') { -%>
    frameworks: [ 'phantomjs-shim', 'jspm', 'jasmine' ],
<% } else if (dependencyManagement === 'inject' && framework === 'angular1') { -%>
    frameworks: [ 'phantomjs-shim', 'jasmine', 'angular-filesort' ],
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
<% if (dependencyManagement === 'inject') { -%>
    files: listFiles(),

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

<%   if (dependencyManagement === 'inject') { -%>
    angularFilesort: {
      whitelist: [ path.join(conf.paths.tmp, '/**/!(*.html|*.spec|*.mock).js') ]
    },
<%   } -%>
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
<% if (dependencyManagement === 'inject' && framework === 'angular1') { -%>
      require('karma-angular-filesort'),
<% } -%>
      require('karma-coverage')
    ]
  };

  config.set(configuration);
};

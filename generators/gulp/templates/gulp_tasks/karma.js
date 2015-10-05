'use strict';

var joinPath = require('path').join;

var gulp = require('gulp');
var karma = require('karma');

var conf = require('./gulpconf');

var pathSrcHtml = [
  joinPath(conf.paths.src, '/**/*.html')
];

var pathSrcJs = [
  joinPath(conf.paths.src, '/**/!(*.spec).js')
];

var karmaServer = {};
var preprocessors = {};

pathSrcHtml.forEach(function (path) {
  preprocessors[path] = ['ng-html2js'];
});

var reporters = ['progress'];

var localConfig = {
  configFile: joinPath(__dirname, '/../karma.conf.js'),
  reporters: reporters,
  preprocessors: preprocessors
};

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);

function karmaSingleRun(done) {
  pathSrcJs.forEach(function (path) {
    preprocessors[path] = ['coverage'];
  });

  reporters.push('coverage');

  karmaServer = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });
  karmaServer.start();
}

function karmaAutoRun(done) {
  localConfig.singleRun = false;
  localConfig.autoWatch = true;

  karmaServer = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });
  karmaServer.start();
}

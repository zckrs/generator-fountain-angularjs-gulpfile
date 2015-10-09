import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import karma from 'karma';

import * as conf from './gulpconf';

let pathSrcHtml = [
  pathsJoin(conf.paths.src, '/**/*.html')
];

let pathSrcJs = [
  pathsJoin(conf.paths.src, '/**/!(*.spec).js')
];

let karmaServer = {};
let preprocessors = {};

pathSrcHtml.forEach(function (path) {
  preprocessors[path] = ['ng-html2js'];
});

let reporters = ['progress'];

let localConfig = {
  configFile: pathsJoin(__dirname, '/../karma.conf.js'),
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

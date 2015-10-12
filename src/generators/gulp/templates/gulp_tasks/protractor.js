import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import { protractor as protractor } from 'gulp-protractor';
import browserSync from 'browser-sync';

import * as conf from './gulpconf';

const argv = process.argv.slice(3); // forward args to protractor

// Downloads the selenium webdriver
gulp.task('webdriver_update', require('gulp-protractor').webdriver_update);

gulp.task('protractor', gulp.series('webdriver_update', runOnServe));
gulp.task('protractor:dist', gulp.series('webdriver_update', runOnDist));

function runOnServe() {
  browserSync.init({
    server: {
      baseDir: [conf.paths.tmp, conf.paths.src],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    open: false,
    browser: []
  });

  return gulp.src(pathsJoin(conf.paths.e2e, '/**/*.js'))
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: argv
    }))
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
    });
}

function runOnDist() {
  browserSync.init({
    server: {
      baseDir: [conf.paths.dist]
    },
    open: false,
    browser: []
  });

  return gulp.src(pathsJoin(conf.paths.e2e, '/**/*.js'))
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: argv
    }))
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
    });
}

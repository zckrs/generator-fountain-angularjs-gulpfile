'use strict';

var joinPath = require('path').join;

var gulp = require('gulp');
var browserSync = require('browser-sync');

var conf = require('./gulpconf');

gulp.task('browser-sync', browserSyncServe);
gulp.task('browser-sync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: [conf.paths.tmp, conf.paths.src],
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });

  gulp.watch(joinPath(conf.paths.src, '/app/**/*.html'), browserSync.reload);

  done();
}

function browserSyncDist(done) {
  browserSync.init({
    server: {
      baseDir: [conf.paths.dist]
    }
  });

  done();
}

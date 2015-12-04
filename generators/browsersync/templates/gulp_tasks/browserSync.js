const path = require('path');

const gulp = require('gulp');
const browserSync = require('browser-sync');

const conf = require('../conf/gulp.conf');

const browserSyncConf = require('../conf/browsersync.conf');
const browserSyncDistConf = require('../conf/browsersync-dist.conf');

gulp.task('browser-sync', browserSyncServe);
gulp.task('browser-sync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init(browserSyncConf());

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), browserSync.reload);

  done();
}

function browserSyncDist(done) {
  browserSync.init(browserSyncDistConf());

  done();
}

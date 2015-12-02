import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import browserSyncConf from '../conf/browsersync.conf';

import * as conf from '../conf/gulp.conf';

gulp.task('browser-sync', browserSyncServe);
gulp.task('browser-sync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init(browserSyncConf());

  gulp.watch(pathsJoin(conf.paths.src, '/app/**/*.html'), browserSync.reload);

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

import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import browserSync from 'browser-sync';

import * as conf from './gulpconf';

gulp.task('browser-sync', browserSyncServe);
gulp.task('browser-sync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: [conf.paths.tmp, conf.paths.src],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

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

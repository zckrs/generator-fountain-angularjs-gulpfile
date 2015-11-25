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
<% if (dependencyManagement === 'inject') { -%>
        '/bower_components': 'bower_components'
<% } else if (dependencyManagement === 'commonjs') { -%>
        '/node_modules': 'node_modules'
<% } else if (dependencyManagement === 'systemjs') { -%>
        '/jspm_packages': 'jspm_packages',
        '/config.js': 'config.js'
<% } -%>
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

import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

import * as conf from './gulpconf';

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(pathsJoin(conf.paths.src, '/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel({
      plugins: ['transform-es2015-modules-systemjs']
    }))
    .pipe(gulp.dest(pathsJoin(conf.paths.tmp)));
}

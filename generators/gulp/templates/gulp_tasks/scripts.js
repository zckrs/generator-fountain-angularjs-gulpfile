import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

import * as conf from './gulpconf';

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(pathsJoin(conf.paths.src, '/app/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format());
}

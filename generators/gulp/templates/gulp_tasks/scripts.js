const path = require('path');

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(path.join(conf.paths.src, '/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest(path.join(conf.paths.tmp)));
}

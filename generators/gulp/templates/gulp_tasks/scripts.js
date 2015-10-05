'use strict';

var joinPath = require('path').join;

var gulp = require('gulp');
var eslint = require('gulp-eslint');

var conf = require('./gulpconf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(joinPath(conf.paths.src, '/app/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format());
}

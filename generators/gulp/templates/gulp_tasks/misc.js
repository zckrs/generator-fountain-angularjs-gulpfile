'use strict';

var joinPath = require('path').join;

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var mainBowerFiles = require('main-bower-files');

var conf = require('./gulpconf');

gulp.task('clean', clean);
gulp.task('fonts', fonts);
gulp.task('other', other);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function fonts() {
  return gulp.src(mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(joinPath(conf.paths.dist, '/fonts/')));
}

function other() {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    joinPath(conf.paths.src, '/**/*'),
    joinPath('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

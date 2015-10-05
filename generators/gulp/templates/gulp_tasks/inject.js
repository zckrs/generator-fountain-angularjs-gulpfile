'use strict';

var joinPath = require('path').join;

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var extend = require('deep-extend');

var conf = require('./gulpconf');

gulp.task('inject', inject);

function inject() {
  var injectStyles = gulp.src(joinPath(conf.paths.tmp, '/index.css'), { read: false });

  var injectScripts = gulp.src([
    joinPath(conf.paths.src, '/app/**/*.module.js'),
    joinPath(conf.paths.src, '/app/**/*.js'),
    joinPath('!' + conf.paths.src, '/app/**/*.spec.js'),
    joinPath('!' + conf.paths.src, '/app/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(joinPath(conf.paths.src, '/index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(extend({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}

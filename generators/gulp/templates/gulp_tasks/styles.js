'use strict';

var joinPath = require('path').join;

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var extend = require('deep-extend');

var conf = require('./gulpconf');

gulp.task('styles', styles);

function styles() {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    joinPath(conf.paths.src, '/app/**/*.scss'),
    joinPath('!' + conf.paths.src, '/app/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    joinPath(conf.paths.src, '/app/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}

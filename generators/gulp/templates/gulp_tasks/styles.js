import 'babel-core/polyfill';
import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import { stream as wiredep } from 'wiredep';

import * as conf from './gulpconf';

const $ = gulpLoadPlugins();

gulp.task('styles', styles);

<% if (cssPreprocessor !== 'css') { -%>
function styles() {
<%   if (cssPreprocessor == 'scss') { -%>
  let sassOptions = {
    style: 'expanded'
  };
<% } -%>

  let injectFiles = gulp.src([
    pathsJoin(conf.paths.src, '/app/**/*.<%- cssPreprocessor %>'),
    pathsJoin('!' + conf.paths.src, '/app/index.<%- cssPreprocessor %>')
  ], { read: false });

  let injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    pathsJoin(conf.paths.src, '/app/index.<%- cssPreprocessor %>')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
<%   if (cssPreprocessor == 'scss') { -%>
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
<% } -%>
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}
<% } else { -%>
function styles(done) {
  $.util.log('Nothing to do for CSS');
  browserSync.reload('*.css');
  done();
}
<% } -%>

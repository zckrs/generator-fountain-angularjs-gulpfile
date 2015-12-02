import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

import * as conf from '../conf/gulp.conf';

const $ = gulpLoadPlugins();

gulp.task('styles', styles);

<% if (cssPreprocessor !== 'css') { -%>
function styles() {
<%   if (cssPreprocessor == 'scss') { -%>
  let sassOptions = {
    style: 'expanded'
  };
<% } -%>

  return gulp.src([
    pathsJoin(conf.paths.src, '/app/index.<%- cssPreprocessor %>')
  ])
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

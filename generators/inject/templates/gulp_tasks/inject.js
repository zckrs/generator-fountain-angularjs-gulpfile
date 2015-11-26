import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import { stream as wiredep } from 'wiredep';

import * as conf from './gulpconf';

const $ = gulpLoadPlugins();

gulp.task('inject', inject);

function inject() {
<% if (cssPreprocessor === 'css') { -%>
  let injectStyles = gulp.src(pathsJoin(conf.paths.src, '/app/**/*.css'), { read: false });
<% } else {-%>
  let injectStyles = gulp.src(pathsJoin(conf.paths.tmp, '/index.css'), { read: false });
<% } -%>

  let injectScripts = gulp.src([
    pathsJoin(conf.paths.tmp, '/**/*.module.js'),
    pathsJoin(conf.paths.tmp, '/**/*.js'),
    pathsJoin('!' + conf.paths.tmp, '/**/*.spec.js'),
    pathsJoin('!' + conf.paths.tmp, '/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  let injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(pathsJoin(conf.paths.src, '/index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}

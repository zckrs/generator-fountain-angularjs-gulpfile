import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import gulpLoadPlugins from 'gulp-load-plugins';

import * as conf from './gulpconf';

const $ = gulpLoadPlugins();

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
    .pipe(gulp.dest(pathsJoin(conf.paths.dist, '/fonts/')));
}

function other() {
  let fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    pathsJoin(conf.paths.src, '/**/*'),
    pathsJoin('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

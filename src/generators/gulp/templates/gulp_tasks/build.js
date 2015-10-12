import 'babel-core/polyfill';
import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import uglifySaveLicense from 'uglify-save-license';

import * as conf from './gulpconf';

const $ = gulpLoadPlugins();

gulp.task('build', gulp.series(partials, build));

function partials() {
  return gulp.src(pathsJoin(conf.paths.src, '/app/**/*.html'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'gulpAngular',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp));
}

function build() {
  let partialsInjectFile = gulp.src(pathsJoin(conf.paths.tmp, '/templateCacheHtml.js'), { read: false });
  let partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: conf.paths.tmp,
    addRootSlash: false
  };

  let htmlFilter = $.filter('*.html', { restore: true });
  let jsFilter = $.filter('**/*.js', { restore: true });
  let cssFilter = $.filter('**/*.css', { restore: true });
  let assets;

  return gulp.src(pathsJoin(conf.paths.tmp, '/index.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets({
      searchPath: [conf.paths.tmp, conf.paths.src]
    }))
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(pathsJoin(conf.paths.dist, '/')));
}

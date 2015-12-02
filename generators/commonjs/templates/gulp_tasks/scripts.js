import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';

import * as conf from '../conf/gulp.conf';

import webpack from 'webpack';
import webpackConf from '../conf/webpack.conf';
<% if (framework !== 'react') { -%>

import browserSync from 'browser-sync';
<% } -%>

function webpackWrapper(watch, test, done) {
  var webpackBundler = webpack(webpackConf);

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));
    if(watch) {
      watch = false;
      done();
<% if (framework == 'react') { -%>
    }
<% } else { -%>
    } else {
      browserSync.reload();
    }
<% } -%>
  };

  if (watch) {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}

gulp.task('scripts', function (done) {
  webpackWrapper(false, false);
  done();
});

gulp.task('scripts:watch', function (done) {
  webpackWrapper(true, false, done);
});

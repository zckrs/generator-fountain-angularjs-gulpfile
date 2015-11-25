import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import * as conf from './gulpconf';

import browserSync from 'browser-sync';
import webpack from 'webpack-stream';

var $ = require('gulp-load-plugins')();

function webpackWrapper(watch, test, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
    },
    output: { filename: 'index.js' }
  };

  if(watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if(watch) {
      watch = false;
      callback();
    }
  };

  return gulp.src(pathsJoin(conf.paths.src, '/index.js'))
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(conf.paths.tmp));
}

gulp.task('scripts', function () {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', function (callback) {
  return webpackWrapper(true, false, callback);
});

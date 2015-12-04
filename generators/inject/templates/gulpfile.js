const path = require('path');

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([
  'gulp_tasks/misc.js',
  'gulp_tasks/build.js',
  'gulp_tasks/styles.js',
  'gulp_tasks/scripts.js',
  'gulp_tasks/inject.js',
  'gulp_tasks/browserSync.js',
  'gulp_tasks/karma.js',
  'gulp_tasks/protractor.js'
]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('inject', gulp.series(gulp.parallel('styles', 'scripts'), 'inject'));
gulp.task('build', gulp.series('inject', gulp.parallel('fonts', 'other'), 'build'));

gulp.task('serve', gulp.series('inject', watch, 'browser-sync'));
gulp.task('serve:dist', gulp.series('default', 'browser-sync:dist'));
gulp.task('default', gulp.series('clean', 'build'));

function watch(done) {
  gulp.watch([pathsJoin(conf.paths.src, '/*.html'), 'bower.json'], gulp.parallel('inject'));

  gulp.watch([
<% if (cssPreprocessor !== 'css') { -%>
    pathsJoin(conf.paths.src, '/app/**/*.<%- cssPreprocessor %>'),
<% } -%>
    pathsJoin(conf.paths.src, '/app/**/*.css')
  ], gulp.series('styles'));

  gulp.watch(pathsJoin(conf.paths.src, '/app/**/*.js'), gulp.series('scripts', 'inject'));

  done();
}

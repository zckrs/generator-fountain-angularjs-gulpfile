/*eslint-env es6 */

import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
// import nsp from 'gulp-nsp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';

gulp.task('default', gulp.series(eslintCheck, gulp.series(istanbulCover, mochaTest)));

function eslintCheck() {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function istanbulCover() {
  return gulp.src('generators/**/index.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: istanbul.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
}

function mochaTest() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .once('error', function errorHandler(err) {
      gutil.log(gutil.colors.red('[Mocha]'), err.toString());
      process.exit(1);
    })
    .pipe(istanbul.writeReports());
}

// function nodeSecurityProject(cb) {
//   nsp('package.json', cb);
// }

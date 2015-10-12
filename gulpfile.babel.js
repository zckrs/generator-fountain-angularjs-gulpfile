import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import babel from 'gulp-babel';
// import nsp from 'gulp-nsp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';

// gulp.task('prepublish', gulp.parallel(compileGenerators, copyTemplates, nodeSecurityProject));
gulp.task('prepublish', gulp.parallel(compileGenerators, copyTemplates));
gulp.task('default', gulp.series(eslintCheck, 'prepublish', gulp.series(istanbulCover, mochaTest)));

function eslintCheck() {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function istanbulCover() {
  return gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter
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

function compileGenerators() {
  return gulp.src('src/generators/**/index.js')
    .pipe(babel())
    .pipe(gulp.dest('generators/'));
}

function copyTemplates() {
  return gulp.src('src/generators/**/templates/**/*')
    .pipe(gulp.dest('generators/'));
}

// function nodeSecurityProject(cb) {
//   nsp('package.json', cb);
// }

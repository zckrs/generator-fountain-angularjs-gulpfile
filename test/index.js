/*eslint new-cap: 1*/

import { join as pathsJoin } from 'path';
import { test as helpers } from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('fountain-angular-gulpfile:app', () => {
  describe('common assert', () => {
    before(function (done) {
      this.answers = {
        cssPreprocessor: 'sass',
        jsPreprocessor: 'js',
        htmlPreprocessor: 'html'
      };
      helpers.run(pathsJoin(__dirname, '../generators/app'))
        .withPrompts(this.answers)
        .on('end', done);
    });

    it('should creates file', () => {
      assert.file([
        '.yo-rc.json',
        'package.json',
        'gulpfile.babel.js',
        'gulp_tasks/browserSync.js',
        'gulp_tasks/build.js',
        'gulp_tasks/gulpconf.js',
        'gulp_tasks/inject.js',
        'gulp_tasks/karma.js',
        'gulp_tasks/misc.js',
        'gulp_tasks/protractor.js',
        'gulp_tasks/scripts.js',
        'gulp_tasks/styles.js'
      ]);
    });

    it('should fill package.json dep', () => {
      // TODO complete assert on package.json
      assert.JSONFileContent('package.json', {
        devDependencies: {
          'babel-core': '^5.8.25',
          'browser-sync': '^2.9.8',
          gulp: 'gulpjs/gulp#4.0',
          'gulp-angular-filesort': '^1.1.1',
          'gulp-angular-templatecache': '^1.7.0',
          'gulp-autoprefixer': '^3.0.1',
          'gulp-eslint': '^1.0.0',
          'gulp-filter': '^3.0.1',
          'gulp-flatten': '^0.2.0',
          'gulp-hub': 'frankwallis/gulp-hub#registry-init',
          'gulp-inject': '^1.5.0',
          'gulp-load-plugins': '^1.0.0-rc.1',
          'gulp-minify-css': '^1.2.1',
          'gulp-minify-html': '^1.0.4',
          'gulp-ng-annotate': '^1.1.0',
          'gulp-protractor': '^1.0.0',
          'gulp-replace': '^0.5.4',
          'gulp-rev': '^6.0.1',
          'gulp-rev-replace': '^0.4.2',
          'gulp-sass': '^2.0.4',
          'gulp-sourcemaps': '^1.5.2',
          'gulp-uglify': '^1.4.1',
          'gulp-useref': '^1.3.0',
          'gulp-util': '^3.0.6',
          karma: '^0.13.9',
          'karma-angular-filesort': '^1.0.0',
          'karma-coverage': '^0.5.2',
          'karma-jasmine': '^0.3.6',
          'karma-ng-html2js-preprocessor': '^0.1.2',
          'karma-phantomjs-launcher': '^0.2.1',
          'main-bower-files': '^2.9.0',
          'uglify-save-license': '^0.4.1',
          wiredep: '^2.2.2'
        }
      });
    });

    it('should fill gulpfile.babel.js', () => {
      // TODO complete assert on gulpfile and tasks
      assert.fileContent('gulpfile.babel.js', 'gulp.registry(hub);');
    });


  });
});

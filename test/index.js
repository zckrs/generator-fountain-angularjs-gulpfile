/*eslint new-cap: 1*/

import { join as pathsJoin } from 'path';
import { test as helpers } from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('foutain-angular-gulpfile:app', () => {
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
        gulp: 'gulpjs/gulp#4.0'
      }
    });
  });

  it('should fill files', () => {
    // TODO complete assert on gulpfile and tasks
    assert.fileContent('gulpfile.babel.js', 'gulp.registry(hub);');
  });


});

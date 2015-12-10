'use strict';

const _ = require('lodash');
const fileUtils = require('../../src/file-utils');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: true });
    this.option('dependencyManagement', { type: String, required: true });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      framework: this.options.framework,
      dependencyManagement: this.options.dependencyManagement
    };
  },

  writing: {
    package: function () {
      var newPkg = { devDependencies: { eslint: '^1.10.3' } };

      if (this.props.dependencyManagement === 'commonjs') {
        _.merge(newPkg, {
          devDependencies: { 'eslint-loader': '^1.1.1' }
        });
      } else {
        _.merge(newPkg, {
          devDependencies: { 'gulp-eslint': '^1.0.0' }
        });
      }

      fileUtils.mergeJson.call(this, 'package.json', newPkg);
    },

    conf: function () {
      const eslint = {
        extends: 'eslint:recommended',
        env: { es6: true, browser: true, jasmine: true },
        ecmaFeatures: { modules: true },
        globals: { module: true, inject: true }
      };

      if (this.props.framework === 'react') {
        _.merge(eslint, {
          plugins: ['react'],
          ecmaFeatures: { jsx: true },
          rules: { 'react/jsx-uses-react': 1 }
        });
      }

      if (this.props.dependencyManagement === 'inject') {
        if (this.props.framework === 'react') {
          _.merge(eslint, {
            globals: { React: true, ReactDOM: true }
          });
        }

        if (this.props.framework === 'angular1') {
          _.merge(eslint, {
            globals: { angular: true }
          });
        }

        if (this.props.framework === 'angular2') {
          _.merge(eslint, {
            globals: { ng: true }
          });
        }
      }

      this.fs.writeJSON(this.destinationPath('conf/eslint.conf.json'), eslint);
    },

    rc: function () {
      ['conf', 'gulp_tasks', 'src'].forEach(path => {
        this.fs.copyTpl(
          this.templatePath(`${path}/.eslintrc`),
          this.destinationPath(`${path}/.eslintrc`)
        );
      });
    },

    wireing: function() {
      if (this.props.dependencyManagement === 'commonjs') {
        fileUtils.replaceInFile.call(
          this,
          'conf/webpack.conf.js',
          / {2}module: \{/
        );
      } else if (this.props.dependencyManagement === 'systemjs') {
        this.fs.copyTpl(
          this.templatePath('gulp_tasks/scripts.js'),
          this.destinationPath('gulp_tasks/scripts.js'),
          { full: true }
        );
      } else if (this.props.dependencyManagement === 'inject') {
        fileUtils.replaceInFile.call(
          this,
          'gulp_tasks/scripts.js',
          / {2}return gulp\.src[^\n]*/,
          { full: false }
        );
      }
    }
  }
});

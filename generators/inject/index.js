'use strict';

var handleJson = require('../../src/file-utils');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: true });
    this.option('cssPreprocessor', { type: String, required: true });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      framework: this.options.framework,
      cssPreprocessor: this.options.cssPreprocessor
    };
  },

  writing: {
    package: function () {
      let dependencies, devDependencies = {};

      handleJson.updateJson.call(this, 'package.json', function (packageJson) {
        dependencies = packageJson.dependencies;
        delete packageJson.dependencies;
        return packageJson;
      });

      handleJson.mergeJson.call(this, 'package.json', {
        devDependencies: {
          'gulp-babel': '^6.1.0',
          'gulp-inject': '^3.0.0',
          'main-bower-files': '^2.9.0',
          wiredep: '^2.2.2',
          'gulp-angular-filesort': '^1.1.1'
        }
      });

      if (this.props.framework === 'react') {
        delete dependencies['react-dom'];
      }

      if (this.props.framework === 'angular1') {
        devDependencies['angular-mocks'] = dependencies.angular;
      }

      handleJson.mergeJson.call(this, 'bower.json', {
        name: 'fountain-inject',
        version: '0.0.1',
        dependencies: dependencies,
        devDependencies: devDependencies
      });
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        { cssPreprocessor: this.props.cssPreprocessor }
      );
    },

    indexHtml: function () {
      handleJson.replaceInFile.call(this, 'src/index.html', /<\/head>/, {
        head: true
      });

      handleJson.replaceInFile.call(this, 'src/index.html', /<\/html>/, {
        head: false
      });
    }
  },

  installing: function () {
    this.bowerInstall();
  }
});

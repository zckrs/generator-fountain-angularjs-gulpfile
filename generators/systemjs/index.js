const _ = require('lodash');
const handleJson = require('../../src/file-utils');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: false });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      framework: this.options.framework
    };
  },

  writing: {
    package: function () {
      handleJson.updateJson.call(this, 'package.json', (packageJson) => {
        packageJson.jspm = {
          dependencies: packageJson.dependencies
        };
        _.forEach(packageJson.jspm.dependencies, function (version, name) {
          packageJson.jspm.dependencies[name] = `npm:${name}@${version}`;
        });
        delete packageJson.dependencies;
        if (this.props.framework === 'angular1') {
          packageJson.jspm.devDependencies = {
            'angular-mocks': `npm:angular-mocks@${packageJson.devDependencies['angular-mocks']}`
          };
          delete packageJson.devDependencies['angular-mocks'];
        }
        return packageJson;
      });

      handleJson.mergeJson.call(this, 'package.json', {
        devDependencies: {
          jspm: '0.16.15'
        }
      });
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );
    },

    config: function () {
      this.fs.copyTpl(
        this.templatePath('config.js'),
        this.destinationPath('config.js')
      );
    },

    indexHtml: function () {
      handleJson.replaceInFile.call(this, 'src/index.html', /<\/html>/, {
        framework: this.props.framework
      });
    }
  },

  installing: function () {
    this.runInstall('jspm');
  }
});

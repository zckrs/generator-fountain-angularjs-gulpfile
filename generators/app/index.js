'use strict';

var generators = require('yeoman-generator');
var extend = require('deep-extend');
var _ = require('lodash');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('travis', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include travis config'
    });

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include boilerplate files'
    });

    this.option('babel', {
      type: Boolean,
      required: false,
      desc: 'Compile ES2015 using Babel'
    });

    this.option('cli', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Add a CLI'
    });

    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('projectRoot', {
      type: String,
      required: false,
      defaults: 'lib',
      desc: 'Relative path to the project code root'
    });
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: {
    askFor: function () {
      if (this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
        return;
      }

      var done = this.async();

      var prompts = [{
        name: 'description',
        message: 'Description',
        when: !this.pkg.description
      }, {
        name: 'homepage',
        message: 'Project homepage url',
        when: !this.pkg.homepage
      }, {
        name: 'githubAccount',
        message: 'GitHub username or organization',
        when: !this.pkg.repository
      }, {
        name: 'authorName',
        message: 'Author\'s Name',
        when: !this.pkg.author,
        store: true
      }, {
        name: 'authorEmail',
        message: 'Author\'s Email',
        when: !this.pkg.author,
        store: true
      }, {
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        when: !this.pkg.author,
        store: true
      }, {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        when: !this.pkg.keywords,
        filter: _.words
      }, {
        name: 'babel',
        type: 'confirm',
        message: 'Use es2015 (precompiled with Babel)',
        when: this.options.babel === undefined
      }, {
        name: 'includeCoveralls',
        type: 'confirm',
        message: 'Send coverage reports to coveralls',
        when: this.options.coveralls === undefined
      }];

      this.prompt(prompts, function (props) {
        this.props = extend(this.props, props);

        if (props.githubAccount) {
          this.props.repository = props.githubAccount + '/' + this.props.name;
        }

        done();
      }.bind(this));
    }
  },

  writing: function () {
    // Re-read the content at this point because a composed generator might modify it.
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = {
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      repository: this.props.repository,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [
        this.props.babel ? 'dist' : this.options.projectRoot
      ],
      main: this.props.babel ? 'dist/index.js' : path.join(
        this.options.projectRoot,
        'index.js'
      ),
      keywords: this.props.keywords
    };

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON('package.json', extend(pkg, currentPkg));
  },

  default: function () {
    // Compose here
    // this.composeWith('node:eslint', {
    //   options: {
    //     es2015: this.props.babel
    //   }
    // }, {
    //   local: require.resolve('../eslint')
    // });
  },

  installing: function () {
    this.npmInstall();
  }
});

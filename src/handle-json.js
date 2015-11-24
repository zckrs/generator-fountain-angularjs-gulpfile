var _ = require('lodash');

exports.mergeJson = function mergeJson(fileName, newContent) {
  var content = this.fs.readJSON(this.destinationPath(fileName), {});

  _.merge(content, newContent, function (a, b) {
    if (_.isArray(a)) {
      return _.uniq(a.concat(b));
    }
  });

  this.fs.writeJSON(this.destinationPath(fileName), content);
};

exports.updateJson = function mergeJson(fileName, update) {
  var content = this.fs.readJSON(this.destinationPath(fileName), {});

  var newContent = update(content);

  this.fs.writeJSON(this.destinationPath(fileName), newContent);
};

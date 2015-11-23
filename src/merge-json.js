var _ = require('lodash');

module.exports = function mergeJson(fileName, newContent) {
  var content = this.fs.readJSON(this.destinationPath(fileName), {});

  _.merge(content, newContent, function (a, b) {
    if (_.isArray(a)) {
      return _.uniq(a.concat(b));
    }
  });

  this.fs.writeJSON(this.destinationPath(fileName), content);
};

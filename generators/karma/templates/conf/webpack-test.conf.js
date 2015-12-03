module.exports = {
  debug: true,
  devtool: 'inline-source-map',

  module: {
    preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}],
    loaders: [{ test: /\.js$/, exclude: /(node_modules|.*\.spec\.js)/, loader: 'isparta-instrumenter'}],
<% if (framework === 'react') { -%>
    postLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel'}]
<% } else if (framework === 'angular1') { -%>
    postLoaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel']}]
<% } else { -%>
    postLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel'}]
<% } -%>
  }
};

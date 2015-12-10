/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
<% if (cssPreprocessor === 'css') { -%>
  exclude: [/\/bootstrap\.js$/],
<% } -%>
<% if (cssPreprocessor === 'scss') { -%>
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
<% } -%>
  directory: 'bower_components'
};

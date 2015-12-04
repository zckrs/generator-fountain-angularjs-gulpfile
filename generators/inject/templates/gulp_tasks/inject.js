const path = require('path');

const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const inject = require('gulp-inject');

const conf = require('./gulp.conf');

gulp.task('inject', inject);

function inject() {
<% if (cssPreprocessor === 'css') { -%>
  let injectStyles = gulp.src(path.join(conf.paths.src, '/app/**/*.css'), { read: false });
<% } else {-%>
  let injectStyles = gulp.src(path.join(conf.paths.tmp, '/index.css'), { read: false });
<% } -%>

  let injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/**/*.module.js'),
    path.join(conf.paths.tmp, '/**/*.js'),
    path.join('!' + conf.paths.tmp, '/**/*.spec.js'),
    path.join('!' + conf.paths.tmp, '/**/*.mock.js')
  ])
  .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  let injectOptions = {
    ignorePath: [ conf.paths.src, conf.paths.tmp ],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/index.html'))
    .pipe(inject(injectStyles, injectOptions))
    .pipe(inject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}

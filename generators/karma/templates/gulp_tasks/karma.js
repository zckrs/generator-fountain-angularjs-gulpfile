import { join as pathsJoin } from 'path';

import gulp from 'gulp';
import karma from 'karma';

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);

function karmaSingleRun(done) {
  const localConfig = {
    configFile: pathsJoin(process.cwd(), 'conf', 'karma.conf.js')
  };

  const karmaServer = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });

  karmaServer.start();
}

function karmaAutoRun(done) {
  const localConfig = {
    configFile: pathsJoin(process.cwd(), 'conf', 'karma-auto.conf.js')
  };

  const karmaServer = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });

  karmaServer.start();
}

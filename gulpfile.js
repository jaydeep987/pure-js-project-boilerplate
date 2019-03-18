/* eslint-disable */
var gulp = require('gulp');
var clean = require('gulp-clean');
var Server = require('karma').Server;

gulp.task('clean', function () {
  return gulp
    .src(['dist/*', 'coverage/*'])
    .pipe(clean());
});

var karmaConfig = {
  configFile: __dirname + '/karma.conf.js',
  singleRun: true,
};

gulp.task('test', gulp.parallel(function(done) {
  return new Server(karmaConfig, done).start();
}));

gulp.task('test:chrome', gulp.parallel(function(done) {
  return new Server(Object.assign({}, karmaConfig, {
    browsers: ['Chrome'],
  }), done).start();
}));

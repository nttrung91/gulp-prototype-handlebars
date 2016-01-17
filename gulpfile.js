var gulp = require('gulp');
var handlebars = require('./index');

gulp.task('handlebars', function () {
  return gulp.src('./test.json')
  .pipe(handlebars({
    partials: ['./partials'],
    helpers: './helpers'
  }))
  .pipe(gulp.dest('dist/templates/'));
});

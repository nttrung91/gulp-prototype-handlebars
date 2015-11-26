var gulp = require('gulp');
var handlebars = require('./index');

gulp.task('handlebars', function () {

    var options = {
      test: "hello"
    }

    return gulp.src('templates/pages/*.json')
        .pipe(handlebars(options))
        .pipe(gulp.dest('dist/templates/'));
});

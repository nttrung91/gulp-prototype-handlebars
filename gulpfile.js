var gulp = require('gulp');
var handlebars = require('./index');

gulp.task('prototype', function () {
    return gulp.src('pages/*.json')
        .pipe(handlebars())
        .pipe(gulp.dest('dist/templates/'));
});

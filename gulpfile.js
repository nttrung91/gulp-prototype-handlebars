var gulp = require('gulp');
var handlebars = require('./index');

gulp.task('prototype', function () {
    return gulp.src('templates/pages/*.json')
        .pipe(handlebars())
        .pipe(gulp.dest('dist/templates/'));
});

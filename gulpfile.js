/**
 * Created by dirk-janrutten on 11/09/16.
 */

var nodemon = require("gulp-nodemon");
var gulp = require('gulp');
var standard = require("gulp-standard");
var flow = require('gulp-flowtype');

gulp.task('development', function () {
    return nodemon({
        script: 'src/index.js',
        exec: 'babel-node',
        env: { 'NODE_ENV': 'development' },
        tasks: ['standard', 'typecheck']
    });
});

gulp.task('standard', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(standard())
        .pipe(standard.reporter('default', {
            breakOnError: false,
            quiet: true
        }))
});

gulp.task('typecheck', function() {
    return gulp.src('src/**/*.js')
        .pipe(flow())
});

gulp.task('travis', ["standard", "typecheck"]);


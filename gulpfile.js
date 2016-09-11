/**
 * Created by dirk-janrutten on 11/09/16.
 */

var gulp = require('gulp');

var nodemon = require("gulp-nodemon");
var standard = require("gulp-standard");
var flow = require('gulp-flowtype');
var runSequence = require('run-sequence');
var open = require('open');

var flags = {
    travis: false,
    started: false
};

gulp.task('development', function () {

    var tasks = ['typecheck', 'standard'];

    return nodemon({
        script: 'src/index.js',
        exec: 'babel-node',
        env: { 'NODE_ENV': 'development' },
        tasks: tasks
    });
});

gulp.task('travis', function(){
    flags.travis = true;
    return runSequence('typecheck', 'standard');
});


// Add typecheck to make sure that typecheck is performed before standard. We want
//these tasks to run in sequence otherwise the log messages of the tasks will conflict.
gulp.task('standard', ['typecheck'], function () {
    return gulp.src(['src/**/*.js'])
        .pipe(standard())
        .pipe(standard.reporter('default', {
            breakOnError: flags.travis, //if we are running travis then we want this to break, we don't want this when running nodemon
            breakOnWarning: flags.travis,
            quiet: true
        }));
});

gulp.task('typecheck', function() {
    return gulp.src('src/**/*.js')
        .pipe(flow({
            abort: flags.travis //if we are running travis then we want this to abort, we don't want this when running nodemon
        }));
});




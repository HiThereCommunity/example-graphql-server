/**
 * Copyright (c) 2016, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * This file contains all the gulp tasks.
 */

var gulp = require('gulp');

var nodemon = require("gulp-nodemon");
var standard = require("gulp-standard");
var flow = require('gulp-flowtype');

/**
 * Global variables that can be accessed by all the tasks.
 */
var flags = {
    //This variable indicates to the tasks whether travis is running or not.
    //In case travis is running we want the tasks to crash in case an error occurs.
    //Default value for this false.
    travis: false
};

/**
 * Task that start the server in development and does the following:
 *
 * - Turns on nodemon
 * - On every file change (and on start) performs the task 'typecheck' and 'standard'
 */
gulp.task('development', function () {

    //On start of this task we run the 'typecheck' and 'standard' tasks. This is done
    //because nodemon only runs the tasks whenever the file is changed,
    //not on start.
    gulp.run('typecheck');
    gulp.run('standard');

    return nodemon({
        script: 'src/index.js',
        exec: 'babel-node',
        env: { 'NODE_ENV': 'development' },
        tasks: ['standard', 'typecheck']
    });
});

/**
 * The task that is run when travis CI is run. This
 * performs the tasks 'typecheck' and 'standard'.
 *
 * Important to note here is that we want each of the two tasks to crash in case
 * an error occurs. To force the tasks to do this we set the property "travis" is the flags object to true.
 */
gulp.task('travis', function() {
    flags.travis = true;
    gulp.run('typecheck');
    gulp.run('standard');
});

/**
 * This tasks checks for linting using the 'standard' module for all the .js files contained in the folder /src.
 */
gulp.task('standard', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(standard())
        .pipe(standard.reporter('default', {
            breakOnError: flags.travis, //if we are running travis then we want this to break, we don't want this when running nodemon
            breakOnWarning: flags.travis,
            quiet: true
        }));
});

/**
 * This task performs static type checking on the .js files contained in the folder /src.
 */
gulp.task('typecheck', function() {
    return gulp.src('src/**/*.js')
        .pipe(flow({
            abort: flags.travis //if we are running travis then we want this to abort, we don't want this when running nodemon
        }));
});




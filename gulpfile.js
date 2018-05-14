// include modules
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    criticalCss = require('gulp-penthouse'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    jest = require('gulp-jest').default,
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    vueify = require('gulp-vueify');
    
// js (browser)
gulp.task('js', function()
{
    return browserify({
            entries: ['./_js/ilovecookies.js']
        })
        .transform(babelify.configure({
            presets : ['es2015', 'es2017'],
            plugins : ['transform-runtime']
        }))
        .bundle()
        .on('error', function(err) { console.log(err.toString()); this.emit('end'); })
        .pipe(source('ilovecookies.min.js'))
        .pipe(buffer())
        .pipe(uglify()).on('error', function(e){ console.log(e); })
        .pipe(gulp.dest('.'))
        .pipe(browserSync.reload({stream: true}));
});

// js (babel)
gulp.task('js-babel', function()
{
    /* use this, if you want to export js as a module that
    can be published on npm and/or imported via "import" */
    return gulp
        .src('./_js/*.js')
        .pipe(babel({
            presets : ['es2015', 'es2017'],
            plugins : ['transform-runtime']
        }))
        .pipe(gulp.dest('.'));
});

// watch
gulp.task('watch', function()
{
    gulp.watch('./_js/*.js', function() { runSequence('js','js-babel'); });
});

// default
gulp.task('default', function()
{
    runSequence('js','js-babel','watch');   
});
const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpConcat = require('gulp-concat');
const gulpBabel = require('gulp-babel');
const gulpUglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function sassAutoPrefixer() {
    return gulp
        .src('public/css/src/*.scss')
        .pipe(
            gulpSass({
                outputStyle: 'compressed',
            })
        )
        .pipe(
            gulpAutoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest('public/css/dest'))
        .pipe(browserSync.stream());
}

function js() {
    return gulp
        .src('public/js/src/*.js')
        .pipe(gulpConcat('app.js'))
        .pipe(
            gulpBabel({
                presets: ['@babel/preset-env'],
            })
        )
        .pipe(gulpUglify())
        .pipe(gulp.dest('public/js/dest'))
        .pipe(browserSync.stream());
}

function browser() {
    browserSync.init({
        server: {
            baseDir: './',
        },
    });
}

function pluginJs() {
    return gulp
        .src(['node_modules/scrollreveal/dist/scrollreveal.min.js', 'public/js/dest/plugin.js'])
        .pipe(gulpConcat('plugin.js'))
        .pipe(gulp.dest('public/js/dest'))
        .pipe(browserSync.stream());
}

function watch() {
    gulp.watch('public/css/src/*.scss', sassAutoPrefixer);
    gulp.watch('public/js/src/*.js', js);
    gulp.watch(['*.html']).on('change', browserSync.reload);
}

exports.sassAutoPrefixer = sassAutoPrefixer;

exports.js = js;

exports.pluginJs = pluginJs;

exports.browser = browser;

exports.watch = watch;

exports.default = gulp.parallel(sassAutoPrefixer, watch, browser, js, pluginJs);

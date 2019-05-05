'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
sass.compiler = require('node-sass');

function clean() {
    return del([ 'assets' ]);
}

// Styles
function styles() {
    return gulp.src('./public/assets/scss/styles.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('styles.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/assets/dest/'));
}

// Scripts
function scripts() {
    return gulp.src('./public/assets/js/main.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/assets/dest/'));
}
function watch() {
    gulp.watch('./public/assets/scss/**/*.scss', styles);
    gulp.watch('./public/assets/js/**/*.js', scripts);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

exports.default = build;
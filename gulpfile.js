const { src, dest, parallel, series, watch } = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const fileInclude = require('gulp-file-include');

function browserSyncFunc() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true,
        open: false
    })
}

function scriptsFunc() {
    return src([
        'dist/scripts/app.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/scripts/'))
        .pipe(browserSync.stream());
}

function stylesFunc() {
    return src([
        'dist/styles/app.scss'
    ])
        .pipe(sass())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleanCss( { level: { 1: { specialComments: 0 } } } ))
        .pipe(dest('app/styles/'))
        .pipe(browserSync.stream())
}

function componentsFunc() {
    return src([
        'dist/pages/*.html'
    ])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app/'))
        .pipe(browserSync.stream())
}

function watchFunc() {
    watch(['dist/**/*.js'], scriptsFunc);
    watch(['dist/**/*.scss'], stylesFunc);
    watch(['dist/**/*.html'], componentsFunc);
}

exports.browsersync = browserSyncFunc;
exports.scripts = scriptsFunc;
exports.styles = stylesFunc;

exports.default = parallel(stylesFunc, scriptsFunc, componentsFunc, browserSyncFunc, watchFunc);
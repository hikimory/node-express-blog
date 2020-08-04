const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

function styles(){
  return (
    gulp
        .src('dev/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(
          autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
          })
        )
        .pipe(cssnano())
        .pipe(gulp.dest('public/stylesheets'))
    );
}

function scripts()
{
  return (
    gulp
    .src([
      'dev/js/auth.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(terser())
    .pipe(gulp.dest('public/javascripts')));
}

function startWatch(){
  gulp.watch('dev/scss/**/*.scss', styles);
  gulp.watch('dev/js/**/*.js',scripts);
}

exports.default = gulp.parallel(styles, scripts, startWatch)
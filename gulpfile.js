'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    notify:false
  });
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
  .pipe(gulp.dest('build'))
  .on('end',browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({}))
  .pipe(autoprefixer({
    browsers: ['last 5 versions']
  }))
  .on("error", notify.onError({
    message: "Error: <%= error.message %>",
    title: "sass error"
  }))
  .pipe(csso())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('build/css/'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('watch', function(){
  gulp.watch('src/index.html',gulp.series('html'));
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
});

gulp.task('default', gulp.series(
  gulp.parallel('html','sass'),
  gulp.parallel('watch','serve')
));


const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// aggregate css files
gulp.task('styles', function() {
  return gulp.src('./styles/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload());
});

// handle es6 js files
gulp.task('scripts', function () {
  return gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

// export html to dist
gulp.task('html', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
})

gulp.task('watch', function() {
  gulp.watch('./styles/*.css', gulp.series('styles'));
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
  gulp.watch('./index.html', gulp.series('html'));
})

gulp.task('default', gulp.parallel('connect', 'styles', 'scripts', 'watch'));
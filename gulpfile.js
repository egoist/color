var
  config = require('./config'),
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  stylus = require('gulp-stylus'),
  swig = require('gulp-swig'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  serve = require('gulp-serve'),
  minifyHTML = require('gulp-minify-html');


gulp.task('serve', serve({
  root: ['./'],
  port: 3001
}))

gulp.task('js', function() {
  gulp.src(['./src/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'))
})

gulp.task('html', function() {
  var opts = {
    defaults: {
      cache: false,
      locals: {
        buildTime: new Date().getTime(),
        title: config.title
      }
    }
  };
  gulp.src('./src/html/index.html')
    .pipe(swig(opts))
    .pipe(minifyHTML())
    .pipe(gulp.dest('./'))
})

gulp.task('css', function() {
  gulp.src('./src/styl/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('watch', function() {
  gulp.watch('./src/html/index.html', ['html'])
  gulp.watch('./src/styl/*.styl', ['css'])
  gulp.watch('./src/js/*.js', ['js'])
})

gulp.task('build', ['js', 'css', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])

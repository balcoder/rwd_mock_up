var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync').create();

gulp.task('css', function(){
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream())
});
gulp.task('images', function(){
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('copy', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream())
});

gulp.task('browsersync', function(){
  browsersync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

gulp.task('watch', ['browsersync','css'], function(){
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/*.html', ['copy']);
});

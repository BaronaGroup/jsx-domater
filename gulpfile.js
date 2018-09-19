/* eslint-env node */

const gulp = require('gulp'),
  ts = require('gulp-typescript'),
  clean = require('gulp-clean'),
  tsProject = ts.createProject('tsconfig.json')

gulp.task('clean-build', function () {
  return gulp.src('build', {read: false})
    .pipe(clean())
})

gulp.task('clean-dist', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean())
})

gulp.task('clean', ['clean-build', 'clean-dist'])

gulp.task('ts', function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('build'))
})

gulp.task('dist', ['clean', 'ts'], function() {
  // Typescript is supposed to do this for us, but it creates js failes instead of json files and still attempts
  // to require the json files, which of course fails. This is a quick and easy workaround.
  return gulp
    .src('build/src/**/*')
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['ts'])

gulp.task('default', ['clean', 'build'])
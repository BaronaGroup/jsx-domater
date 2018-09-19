/* eslint-env node */

const gulp = require('gulp'),
  ts = require('gulp-typescript'),
  clean = require('gulp-clean'),
  tsProject = ts.createProject('tsconfig.json')

gulp.task('clean-build', function () {
  return gulp.src('build', {read: false})
    .pipe(clean())
})

gulp.task('clean', ['clean-build'])

gulp.task('ts', function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('build'))
})

gulp.task('build', ['ts'])

gulp.task('default', ['clean', 'build'])
/* eslint-env node */

const gulp = require('gulp'),
  ts = require('gulp-typescript'),
  clean = require('gulp-clean'),
  tsProject = ts.createProject('tsconfig-prod.json')

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

gulp.task('copy-translations', function() {
  // Typescript is supposed to do this for us, but it creates js failes instead of json files and still attempts
  // to require the json files, which of course fails. This is a quick and easy workaround.
  return gulp
    .src('server/translations/*.json')
    .pipe(gulp.dest('build/translations'))
})

gulp.task('build', ['ts', 'copy-translations'])

gulp.task('default', ['clean', 'build'])
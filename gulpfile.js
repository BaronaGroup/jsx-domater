/* eslint-env node */

const gulp = require('gulp'),
  ts = require('gulp-typescript'),
  gulpClean = require('gulp-clean'),
  tsProject = ts.createProject('tsconfig.json')


function cleanBuild() {
  return gulp.src('build/*', {read: false})
    .pipe(gulpClean())
}

function cleanDist() {
  return gulp.src('dist/*', {read: false})
    .pipe(gulpClean())
}

const clean = gulp.parallel(cleanBuild, cleanDist)


function buildTS() {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('build'))
}


function copySrcToDist() {
  // Typescript is supposed to do this for us, but it creates js failes instead of json files and still attempts
  // to require the json files, which of course fails. This is a quick and easy workaround.
  return gulp
    .src('build/src/**/*')
    .pipe(gulp.dest('dist'))
}

const dist = gulp.series(clean, buildTS, copySrcToDist),
  build = buildTS,
  defaultBuild = gulp.series(clean, buildTS)

module.exports = {
  build,
  clean,
  dist,
  default: defaultBuild
}

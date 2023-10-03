const { src, dest, series, watch } = require('gulp')
const fileinclude = require('gulp-file-include')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')
const includes = require('gulp-include')
const fs = require('fs')
const sass = require('gulp-sass')(require('sass'))

const buildDir = './docs'

const contextData = JSON.parse(fs.readFileSync('./src/templates/data/pages.json'))

function dev () {
  watch('./src/**/*', series(html, styles))
}

function html () {
  return src('./src/templates/**/*.tpl.html')
    .pipe(includes())
    .pipe(fileinclude({
      prefix: '@@',
      context: contextData
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ extname: '' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest(buildDir))
}

function styles () {
  return src('./src/sass/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest(`${buildDir}/assets`))
}

exports.default = series(html, styles)
exports.dev = dev

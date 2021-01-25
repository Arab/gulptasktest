const { series, src, dest } = require('gulp');
const del = require('del');
var imageResize = require('gulp-image-resize');


function clean(cb) {
  return del(['./dist/images/**', '!./dist/images'],cb);
}

function copyFiles() {
  return src('./source/images/*.jpg')
    .pipe(imageResize({
      width : 500,
      height : 500,
      crop : true,
      upscale : false
    }))
    .pipe(dest('./dist/images/'));
}

exports.copyFiles = copyFiles;
exports.clean = clean;
exports.default = series(clean, copyFiles);

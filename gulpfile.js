const { series, src, dest, task } = require("gulp");
const del = require("del");
const imageResize = require("gulp-image-resize");
const run = require("gulp-run-command").default;

function changelog() {
  return run("npx lerna-changelog")();
}

function clean(cb) {
  return del(["./dist/images/**", "!./dist/images"], cb);
}

function copyFiles() {
  return src("./source/images/*.jpg")
    .pipe(
      imageResize({
        width: 500,
        height: 500,
        crop: true,
        upscale: false,
      })
    )
    .pipe(dest("./dist/images/"));
}

exports.copyFiles = copyFiles;
exports.clean = clean;
exports.changelog = changelog;
exports.default = series(clean, copyFiles);

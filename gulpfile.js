var { watch, src, dest } = require("gulp");
var sassify = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

function sass() {
  return (
    src(["./**/*.scss", "!node_modules/**/*.scss"], { base: "." })
      .pipe(sourcemaps.init())
      // gulp-sass kullanarak Sass dosyasını CSS'e çeviriyor. "nested", "compact", "expanded", "compressed" değerleri kullanılabilir.
      .pipe(sassify({ outputStyle: "expanded" }))
      .on("error", function swallowError(error) {
        console.log(error.toString());
        this.emit("end");
      })
      .pipe(sourcemaps.write())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 4 version"],
          cascade: false
        })
      )
      .pipe(dest("./"))
  );
}

exports.sass = sass;
exports.watch = function() {
  watch("./**/*.scss", sass);
};

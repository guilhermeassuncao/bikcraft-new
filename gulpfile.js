//Modulos Instalados
const gulp = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpConcat = require("gulp-concat");
const gulpBabel = require("gulp-babel");
const gulpUglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

//Compila Sass e Adiciona os Prefixos
function sassAutoPrefixer() {
    return gulp
        .src("public/css/src/*.scss")
        .pipe(
            gulpSass({
                outputStyle: "compressed",
            })
        )
        .pipe(
            gulpAutoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest("public/css/dest/style.css"))
        .pipe(browserSync.stream());
}

//Concatena, Transpila e Minifica o JS
function js() {
    return gulp
        .src("public/js/src/*.js")
        .pipe(gulpConcat("app.js"))
        .pipe(
            gulpBabel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(gulpUglify())
        .pipe(gulp.dest("public/js/dest"))
        .pipe(browserSync.stream());
}

//Iniciar o Browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
}

//Executa Tarefas quando ocorre alguma alteração
function watch() {
    gulp.watch("public/css/src/*.scss", sassAutoPrefixer);
    gulp.watch("js/main/*.js", js);
    gulp.watch("public/js/src/*.js", js);
    gulp.watch(["*.html"]).on("change", browserSync.reload);
}

//Tarefa SassAutoPrefixer
exports.sassAutoPrefixer = sassAutoPrefixer;

//Tarefa JS
exports.js = js;

//Tarefa Browser
exports.browser = browser;

//Tarefa Watch
exports.watch = watch;

//Tarefa Default
exports.default = gulp.parallel(sassAutoPrefixer, watch, browser, js);


var gulp = require('gulp');
var includer = require('gulp-html-ssi');
var sass = require('gulp-sass');
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var webserver = require('gulp-webserver');
var concat = require("gulp-concat");


gulp.task('html:ssi', function() {
    gulp.src('./source/**/*.html')
        .pipe(includer())
        .pipe(gulp.dest('./build/'));
});

gulp.task('html:watch', function() {
    gulp.watch(['./source/**/*.html'], ['html:ssi']);
}); 

gulp.task("js:concat", function() {
    gulp.src(["./source/**/*.js"])
        .pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
        .pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
    
});

gulp.task("js:watch", function() {
    gulp.watch(["./source/**/*.js"], ["js:concat"]);
});

gulp.task("template:watch", function () {
   gulp.watch(["./source/**/*/mustache"], ["template:copy"]); 
});

gulp.task("template:copy", function() {
    gulp.src(["./source/**/*.mustache"])
        .pipe(gulp.dest("./build"));
});

gulp.task("data:watch", function() {
    gulp.watch(["./source/**/*.json"], ["data:copy"]);
});

gulp.task("data:copy", function() {
    gulp.src(["./source/**/*.json"])
        .pipe(gulp.dest("./build"));
});

gulp.task("img:watch", function () {
    gulp.watch(["./source/**/*.jpg", "./source/**/*.png", "./source/**/*.svg"], ["img:copy"]); 
});
gulp.task("img:copy", function () {
    gulp.src(["./source/**/*.jpg", "./source/**/*.png", "./source/**/*.svg"]) 
        .pipe(gulp.dest("./build"));
});

gulp.task('sass:compile', function () {
    gulp.src('./source/scss/master.scss')
        .pipe(sass({
            outputStyle: 'expanded', //compressed
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('sass:watch', function () {
    gulp.watch('./source/**/*.scss', ['sass:compile']);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch('./build/**/*.html').on('change', browserSync.reload);
});


gulp.task('images', function(){
  gulp.src('./source/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('./build/assets'))
});

gulp.task('default', ['html:ssi', 'html:watch', 'sass:compile', 'sass:watch', "js:watch", "js:concat", "img:watch", "img:copy", "template:watch", "template:copy", "data:watch", "data:copy", 'browserSync']);
 

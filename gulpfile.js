var gulp = require('gulp'),
    clean = require('gulp-clean'),
    html5Lint = require('gulp-html5-lint'),
    htmlmin = require('gulp-htmlmin'),
    csslint = require('gulp-csslint'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    assetRev = require('gulp-asset-rev');

/*----------html 处理 start----------*/

//html文件夹监听入口（added, changed, or deleted 时触发）
gulp.task('html-watch', function () {
    return gulp.watch(['src/views/**/*'], ['html-build']);
});

//html语法检查
gulp.task('html-lint', function () {
    return gulp.src(['src/views/**/*.html'])
        .pipe(html5Lint());
});

//html文件夹删除
gulp.task('html-dir-remove', ['html-lint'], function () {
    return gulp.src(['build/views/'])
        .pipe(clean());
});

//html压缩
gulp.task('html-min', ['html-dir-remove'], function () {
    return gulp.src(['src/views/**/*.html'])
        .pipe(assetRev())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build/views/'));
});

//html文件夹构建入口
gulp.task('html-build', ['html-min']);

/*----------html 处理 end----------*/

/*----------css 处理 start----------*/

//css文件夹监听入口（added, changed, or deleted 时触发）
gulp.task('css-watch', function () {
    return gulp.watch(['src/css/**/*'], ['css-build']);
});

//css语法检查（排除不需要检查的fonts和libs目录）
gulp.task('css-lint', function () {
    return gulp.src(['src/css/**/*.css', '!src/css/{fonts,libs}/**/*'])
        .pipe(csslint())
        .pipe(csslint.formatter());
});

//css文件夹删除
gulp.task('css-dir-remove', ['css-lint'], function () {
    return gulp.src(['build/css/'])
        .pipe(clean());
});

//css文件夹下不需要压缩的静态资源文件复制（将fonts和libs目录下的所有文件复制到构建目录下的css文件夹里面去）
gulp.task('css-static-copy', ['css-dir-remove'], function () {
    return gulp.src(['src/css/{fonts,libs}/**/*'])
        .pipe(gulp.dest('build/css/'));
});

//css压缩（排除不需要压缩的fonts和libs目录）
gulp.task('css-min', ['css-static-copy'], function () {
    return gulp.src(['src/css/**/*.css', '!src/css/{fonts,libs}/**/*'])
        .pipe(assetRev())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('build/css/'));
});

//css文件夹构建入口
gulp.task('css-build', ['css-min']);

/*----------css 处理 end----------*/

/*----------js 处理 start----------*/

//js文件夹监听入口（added, changed, or deleted 时触发）
gulp.task('js-watch', function () {
    return gulp.watch(['src/js/**/*'], ['js-build']);
});

//js语法检查（排除不需要检查的libs和plugins目录）
gulp.task('js-hint', function () {
    return gulp.src(['src/js/**/*.js', '!src/js/{libs,plugins}/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//js文件夹删除
gulp.task('js-dir-remove', ['js-hint'], function () {
    return gulp.src(['build/js/'])
        .pipe(clean());
});

//js文件夹下不需要压缩的静态资源文件复制（将libs和plugins目录下的所有文件复制到构建目录下的js文件夹里面去）
gulp.task('js-static-copy', ['js-dir-remove'], function () {
    return gulp.src(['src/js/{libs,plugins}/**/*'])
        .pipe(gulp.dest('build/js/'));
});

//js压缩（排除不需要压缩的libs和plugins目录）
gulp.task('js-min', ['js-static-copy'], function () {
    return gulp.src(['src/js/**/*.js', '!src/js/{libs,plugins}/**/*'])
        .pipe(uglify({
            //mangle: false, //取消混淆
            //compress: false //取消压缩
        }))
        .pipe(gulp.dest('build/js/'));
});

//js文件夹构建入口
gulp.task('js-build', ['js-min']);

/*----------js 处理 end----------*/

/*----------images 处理 start----------*/

//images文件夹监听入口（added, changed, or deleted 时触发）
gulp.task('images-watch', function () {
    return gulp.watch(['src/images/**/*.{png,jpg,jpeg,gif}'], ['images-build']);
});

//images文件夹删除
gulp.task('images-dir-remove', function () {
    return gulp.src(['build/images/'])
        .pipe(clean());
});

//images压缩（png,jpg,jpeg,gif）
gulp.task('images-min', ['images-dir-remove'], function () {
    return gulp.src(['src/images/**/*.{png,jpg,jpeg,gif}'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

//images文件夹构建入口
gulp.task('images-build', ['images-min']);

/*----------images 处理 end----------*/

//所有监控任务
gulp.task('all-watch', ['html-watch', 'css-watch', 'js-watch', 'images-watch']);

//所有构建任务
gulp.task('all-build', ['html-build', 'css-build', 'js-build', 'images-build']);

//开始构建主入口
gulp.task('start-build', ['all-watch', 'all-build', 'http-server']);

/*----------http 服务器 start----------*/

gulp.task('http-server', function () {
    connect.server({
        root: 'build/',
        host: 'localhost',
        port: 8085,
        livereload: false
    });
});

/*----------http 服务器 end----------*/
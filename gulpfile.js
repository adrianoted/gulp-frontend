//   DEV
//   - gulp pre:statics
//   - gulp statics
//   - gulp

//   PROD
//   - NODE_ENV=prod gulp pre:statics
//   - NODE_ENV=prod gulp statics
//   - NODE_ENV=prod gulp   


//Dev Dependencies
var install = require("gulp-install"),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    del = require('del'),

    minifyHTML = require('gulp-minify-html'),
    nunjucksRender = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    jsonMerge = require('gulp-merge-json'),

    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    stripCssComments = require('gulp-strip-css-comments'),
    cleanCSS = require('gulp-clean-css'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    buffer = require('vinyl-buffer'),

    env = require('gulp-env'),
    browserSync = require('browser-sync');


//Variables
var env, outputDir, reload,
    sassStyle, autoPrefixBrowserList,
    srcPaths, buildPaths;

autoPrefixBrowserList = ['last 3 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];
reload = browserSync.reload;

//Automatically install packages/dependencies if the relative configurations are found in the gulp file stream respectively
gulp.src(["./package.json", "./bower.json"])
    .pipe(install());

//LOG Errors
function errorLog(err) {
    console.error(err.message);
    this.emit('end');
}

//Environment builds << NODE_ENV=prod gulp >> 
env = process.env.NODE_ENV || 'dev';

if (env === 'dev') {
    outputDir = 'builds/dev/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/prod/';
    sassStyle = 'compressed';
}

//Sources paths
srcPaths = {
    module: './node_modules/',
    content: 'sources/content/**/*.json',
    njk: 'sources/views/templates/*.njk',
    html: 'builds/dev/*.html',
    sass: 'sources/sass/**/*.scss',
    js: 'sources/scripts/**/*.js',
    img: 'sources/img/*',
    fonts: 'sources/fonts/**/*'
};

//Builds paths
buildPaths = {
    html: outputDir + '*.html',
    njk: outputDir,
    css: outputDir + 'css',
    js: outputDir + 'js',
    img: outputDir + 'img',
    fonts: outputDir + 'fonts'
};

// remove the content.json
gulp.task('clean', function(cb) {
   return del(['./sources/content/content.json'], cb)
});

//CREATE FIRST THE FILE MANUALLY IF DOESN'T EXISTS: gulp content
//Edit content files when gulp is running => then re run to compile the merged json file
gulp.task('content', function() {
    gulp.src(srcPaths.content)
        .pipe(jsonMerge({
            fileName: 'content.json'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('sources/content'))
        .pipe(reload({ stream: true }));
});

//TASKS
gulp.task('html', function() {
    return gulp.src(srcPaths.html)
        .pipe(gulpif(env === 'prod', minifyHTML()))
        .pipe(gulpif(env === 'prod', gulp.dest(outputDir)))
        .pipe(reload({ stream: true }));
});

gulp.task('nunjucks', function() {
    return gulp.src(srcPaths.njk)
        .pipe(data(function() {
            return require('./sources/content/content.json');
        }))
        .pipe(nunjucksRender({
            path: ['sources/views']
        }))
        .on('error', errorLog)
        .pipe(gulp.dest(buildPaths.njk))
        .pipe(reload({ stream: true }));
});

// STYLESHEETS
var cssVendors = [
    srcPaths.module + 'font-awesome/css/font-awesome.css',
    srcPaths.module + 'bootstrap/dist/css/bootstrap.css'
];

gulp.task('css-vendors', function() {
    gulp.src(cssVendors)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('vendors.css'))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write('../maps')))
        .pipe(gulp.dest(buildPaths.css))
        .pipe(reload({ stream: true }));
});

//SCRIPTS 
var jsVendors = [
    'jquery',
    'bootstrap'
];

gulp.task('js-vendors', function() {
    var b = browserify({
        debug: false
    });
    jsVendors.forEach(function(lib) {
        b.require(lib);
    });
    return b.bundle()
        .pipe(source('vendors.js'))
        .pipe(buffer())
        .pipe(gulpif(env === 'dev', sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(env === 'dev', sourcemaps.write('../maps')))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest(buildPaths.js))
        .pipe(reload({ stream: true }));
});

gulp.task('sass', function() {
    return gulp.src(srcPaths.sass)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(sass({ outputStyle: sassStyle }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade: true
        }))
        .pipe(gulpif(env === 'prod', stripCssComments()))
        .pipe(gulpif(env === 'dev', sourcemaps.write('../maps')))
        .pipe(gulp.dest(buildPaths.css))
        .pipe(reload({ stream: true }));
});

gulp.task('js', function() {
    return browserify({
            entries: './sources/scripts/main.js',
            debug: true
        })
        .external(jsVendors) // Specify all vendors as external source
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(env === 'dev', sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(env === 'dev', sourcemaps.write('../maps')))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest(buildPaths.js))
        .pipe(reload({ stream: true }));
});

// FONTS
var fontVendors = [
    srcPaths.module + 'font-awesome/fonts/*'
]

gulp.task('font-vendors', function() {
    return gulp.src(fontVendors)
        .pipe(gulp.dest(buildPaths.fonts))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
    return gulp.src(srcPaths.fonts)
        .pipe(gulp.dest(buildPaths.fonts))
        .pipe(reload({ stream: true }));
});

//IMG
gulp.task('img', function() {
    return gulp.src(srcPaths.img)
        .pipe(gulp.dest(buildPaths.img))
        .pipe(reload({ stream: true }));
});

//BrowserSync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: outputDir
        }
    });
});

//Watch
gulp.task('watch', function() {
    gulp.watch('sources/**/*.njk', ['nunjucks']);
    gulp.watch(srcPaths.html, ['html']);
    gulp.watch(srcPaths.sass, ['sass']);
    gulp.watch(srcPaths.js, ['js']);
    gulp.watch(srcPaths.img, ['img']);
    gulp.watch(srcPaths.fonts, ['fonts']);
});

gulp.task('pre:statics', ['clean']);
gulp.task('statics', ['content', 'css-vendors', 'js-vendors', 'font-vendors']);
gulp.task('default', ['nunjucks', 'html', 'sass', 'js', 'fonts', 'img', 'browser-sync', 'watch']);
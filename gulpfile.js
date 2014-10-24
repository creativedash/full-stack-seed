
// Module Dependencies
var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    ngmin           = require('gulp-ngmin'),
    jshint          = require('gulp-jshint'),
    stripDebug      = require('gulp-strip-debug'),
    uglify          = require('gulp-uglify');


// Default Task
gulp.task('default', ['build'], function(){
    gulp.watch('client/scripts/**/*', ['angular']);
    gulp.watch('client/styles/**/*', ['sass']);
});


// Build Only Task
gulp.task('build', ['angular', 'sass', 'vendor_scripts', 'images']);


// Process Angular Files
gulp.task('angular', function(){
    return gulp.src([
            'client/scripts/app.js',
            'client/scripts/services/**/*',
            'client/scripts/factories/**/*',
            'client/scripts/directives/**/*',
            'client/scripts/filters/**/*',
            'client/scripts/controllers/**/*'
        ])
        .pipe(concat('app.js'))
        .pipe(jshint())
        .pipe(gulp.dest('public/scripts'))
        .pipe(ngmin())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public/scripts'))
});


// Process SASS
gulp.task('sass', function(){
    return gulp.src([
            'bower_components/normalize.css/normalize.css',
            'bower_components/famous-angular/dist/famous-angular.css',
            'client/styles/main.scss'
        ])
        .pipe(concat('main.css'))
        .pipe(sass({ onError: function(e){ notify().write(e); }}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/styles'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('public/styles'));
});


// Concatenate Vendor Scripts
gulp.task('vendor_scripts', function(){
    return gulp.src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/famous/dist/famous-global.min.js',
            'bower_components/famous-angular/dist/famous-angular.min.js'
        ])
        .pipe(uglify({ 
            mangle: false,
            compress: false,
            preserveComments: 'all'
        }))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('public/scripts'));
});


// Process Images
gulp.task('images', function(){
    return gulp.src('client/images/**/*').pipe(gulp.dest('public/images'));
});


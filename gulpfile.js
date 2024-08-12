global.Promise      = require('bluebird');
var gulp            = require('gulp');
var argv            = require('yargs').argv;
var nodifer         = require('node-notifier');
var live_server     = require('live-server');
var glob            = require('glob');
var es              = require('event-stream');
var takana          = require('takana');

var _JS_        = require('./_assets/_gulp/gulp-js.js');
var _SCSS_      = require('./_assets/_gulp/gulp-scss.js');
var _HTML_      = require('./_assets/_gulp/gulp-html.js');
var _DEPLOY_    = require('./_assets/_gulp/gulp-deploy.js');
var _ZIP_       = require('./_assets/_gulp/gulp-zip.js');
// var _SCREENSHOT_       = require('./_assets/_gulp/gulp-screenshot.js');

var _projectName = '';


var browserSync = require('browser-sync').create();







/*--------------------------------------------------------------------*/
// all
/*--------------------------------------------------------------------*/
gulp.task('deploy', ['sass-all', 'js-all', 'ejs-all'], function(done){
    glob('./dev/**/index.html', function(err, files) {
        if(err) done(err);
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _DEPLOY_(project);
        });
        es.merge(tasks).on('end', done);
    })
})


gulp.task('zip',  function(done){
    glob('./dev/**/index.html', function(err, files) {        
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            console.log(project);
            return _ZIP_(project);
        });
        es.merge(tasks).on('end', done);
    })
})

// gulp.task('screenshot',  function(done){
   
//   gulp.src('./docs/deploy/golf_300x250/index.html')
//   .pipe(localScreenshots({
//     width: ['1600', '1000', '480', '320']
//    }))
//   .pipe(gulp.dest('./images'));

// })






gulp.task('dev-all-basic', function(){
    gulp.watch(["dev/**/*.js", "dev/_common/js/*.js", "!dev/**/_bundled/*.js"], ["js-all"]);
    gulp.watch(["dev/*/*.ejs", "dev/_common/templates/*.ejs"], ["ejs-all"]);
    gulp.watch(["dev/**/_styles/scss/*.scss", "dev/_common/styles/*.scss"], ["sass-all"]);

    gulp.start('ejs-all');
    gulp.start('sass-all');
    gulp.start('js-all');

    var params = {
        port: 1111, // Set the server port. Defaults to 8080.
        host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0.
        open: true, // When false, it won't load your browser by default.
        ignore: 'node-modules', // comma-separated string for paths to ignore
        wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec.
    };

    browserSync.init({
        server: {
            baseDir: "./",
            
            port: 1111,
            directory: true
        }
    });


    //live_server.start(params);
});

gulp.task('dev', ['dev-all-basic'], function(){
    loadTakana();
});


gulp.task('js-all', function(done){
    glob('./dev/*/_js/main.js', function(err, files) {
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _JS_(project, browserSync)
        });
        es.merge(tasks).on('end', done);
    });
})

gulp.task('sass-all', function(done) {
     glob('./dev/**/_styles/scss/main.scss', function(err, files) {
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _SCSS_(project, browserSync);
        });
        es.merge(tasks).on('end', done);
    });
})

gulp.task('ejs-all', function(done) {
     glob('./dev/**/index.ejs', function(err, files) {
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _HTML_(project, browserSync);
        });
        es.merge(tasks).on('end', done);
    });
})
/*--------------------------------------------------------------------*/
// all
/*--------------------------------------------------------------------*/







function loadTakana(){
    takana.run({path:__dirname, includePaths:[] });
}



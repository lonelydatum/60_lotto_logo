var gulp            = require('gulp');

var imagemin = require('gulp-imagemin')


gulp.task('default',  function(done){
	return gulp.src("raw-in/bunny.jpg")
		.pipe(gulp.dest("raw-out"))
})
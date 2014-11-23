'use strict';

var gulp = require('gulp');

// plugins
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var vulcanize = require('gulp-vulcanize');
var del = require('del');


gulp.task('help', function() {
	console.log('This are the following available tasks:');
	console.log('');
	console.log('  build:      builds the distribution version (default)');
	console.log('  serve:      serves a development version of the program');
	console.log('  serve-dist: serves the distribution version (w/o livereload)');
	console.log('  clean:      clean temporary and distribution files');
});

// configuration
var config = {
	src: 'src',
	tmp: '.tmp',
	dist: 'www',
	port: 9649,
	liveport: 19649,
	winport: 9648,
	distport: 9647,
};


// Common tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function(done) {
	del([
		config.tmp,
		config.dist+'/**/*',
		'!'+config.dist+'/.git',
	], done);
});

gulp.task('jshint', function() {
	return gulp.src(['gulpfile.js', config.src+'/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		//.pipe(jshint.reporter('fail'))
		.pipe(connect.reload());
});


// Develop tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('dev-styles', ['jshint', 'clean'], function() {
	return gulp.src(config.src+'/**/*.scss')
		.pipe(sass({expand: true}))
		.pipe(autoprefixer({browsers: ['last 2 version', 'ie 9']}))
		.pipe(gulp.dest(config.tmp))
		.pipe(connect.reload());
});

gulp.task('dev-htmls', function() {
	return gulp.src(config.src+'/**/*.html')
		.pipe(connect.reload());
});

gulp.task('serve', ['jshint','dev-styles'], function() {
	connect.server({
		root: [ config.tmp, config.src, '.' ],
		port: config.port,
		livereload: {port: config.livereload},
		hostname: '0.0.0.0',
	});

	gulp.watch(['gulpfile.js', config.src+'/**/*.js'], ['jshint']);
	gulp.watch([config.src+'/**/*.scss'], ['dev-styles']);
	gulp.watch([config.src+'/**/*.html'], ['dev-htmls']);
});

gulp.task('serve-win', ['jshint','dev-styles'], function() {
	connect.server({
		root: [ config.tmp, config.src, '.' ],
		port: config.winport,
		livereload: false,
		hostname: '0.0.0.0',
	});
});


// Distibution tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('dist-copy-src', ['jshint','clean'], function() {
	return gulp.src(config.src+'/**/*.{js,html}')
		.pipe(gulp.dest(config.tmp));
});

gulp.task('dist-copy-bc', ['clean'], function() {
	return gulp.src('bower_components/**/*')
		.pipe(gulp.dest(config.tmp+'/bower_components'));
});

gulp.task('vulcanize-carousel', ['dist-copy-src','dev-styles'], function(done) {
	gulp.src(config.tmp+'/carousel/carousel.html')
		.pipe(vulcanize({
			dest: config.tmp+'/carousel',
			strip: true,
			inline: true,
			excludes: {
				imports: [
					'polymer.html',
				],
			},
		}))
		.pipe(gulp.dest(config.tmp+'/carousel'))
		// workaround becaus reason gulp do not detect end of task when return used, http://stackoverflow.com/questions/23584962/gulp-js-starts-sass-task-but-doesnt-finish
		.pipe({
			emit: function() {},
			on: function() {if (done) { done(); done = null;}},
		});
		//setTimeout(done, 400);
});

gulp.task('vulcanize-polymer', ['dist-copy-bc'], function(done) {
	gulp.src(config.tmp+'/bower_components/polymer/polymer.html')
		.pipe(vulcanize({
			dest: config.tmp+'/bower_components/polymer',
			strip: true,
			inline: true,
		}))
		.pipe(gulp.dest(config.tmp+'/bower_components/polymer'))

		// workaround becaus reason gulp do not detect end of task when return used, http://stackoverflow.com/questions/23584962/gulp-js-starts-sass-task-but-doesnt-finish
		.pipe({
			emit: function() {},
			on: function() {if (done) { done(); done = null;}},
		});
		//setTimeout(done, 400);
});

gulp.task('dist-copy-vcarousel', ['vulcanize-carousel'], function() {
	return gulp.src(config.tmp+'/carousel/carousel.html')
		.pipe(gulp.dest(config.dist+'/carousel'));
});

gulp.task('dist-copy-vpolymer', ['vulcanize-polymer'], function() {
	return gulp.src(config.tmp+'/bower_components/polymer/polymer.html')
		.pipe(gulp.dest(config.dist+'/bower_components/polymer'));
});

gulp.task('dist-copy', ['vulcanize-carousel','vulcanize-polymer'], function() {
	return gulp.src([
			config.tmp+'/index.html',
			config.tmp+'/**/webcomponents.min.js',
			config.tmp+'/**/polymer.html',
			config.tmp+'/**/carousel.html',
		])
		.pipe(gulp.dest(config.dist));
});

gulp.task('build', ['dist-copy'], function() {
});

gulp.task('serve-dist', ['build'], function() {
	connect.server({
		root: [ config.dist ],
		port: config.distport,
		livereload: false,
		hostname: '0.0.0.0',
	});
});


// Default Task
/////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['build']);
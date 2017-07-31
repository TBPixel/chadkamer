'use strict';

const gulp         = require( 'gulp' );
const sass         = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );
const livereload   = require( 'gulp-livereload' );


gulp.task( 'styles', function() {

  return gulp.src( './_sass/style.sass' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( autoprefixer({
      browsers: ['last 2 versions', 'IE 11', '> 1%'],
      cascade: false
    }))
    .pipe( gulp.dest( './' ) )
    .pipe( livereload() );
});

gulp.task( 'wysiwyg-styles', function() {

  return gulp.src( './_sass/wysiwyg.sass' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './' ) )
    .pipe( livereload() );
});

gulp.task( 'watch', function() {

  livereload.listen();

  gulp.watch( './_sass/**/**/*.{sass,scss}', ['styles'] );
  gulp.watch( './_sass/wysiwyg.{sass,scss}', ['wysiwyg-styles'] )
});


gulp.task( 'default', [ 'styles', 'wysiwyg-styles', 'watch' ] );

import gulp from 'gulp';
import jade from 'gulp-jade';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserify from 'browserify'
import babelify from 'babelify';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
// browserifyのstreamをgulp向けに変換するんだってさ
import source from 'vinyl-source-stream';
import _ from 'lodash';

const dir = {
  dist: './dist',
  src: './src'
}

const options = {
  serve: {
    open: false,
    server: {
      baseDir: dir.dist
    }
  },
  
  sass: {
    outputstyle: 'expanded'
  }
}

gulp.task('jade', () => {
  return gulp.src([`${dir.src}/**/*.jade`, `!${dir.src}/**/_*.jade`])
          .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
          }))
          .pipe(jade())
          .pipe(gulp.dest(dir.dist));
});

gulp.task('script', () => {
  browserify(`${dir.src}/app.js`)
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(`${dir.dist}`));
});

gulp.task('css', () => {
  return gulp.src([`${dir.src}/**/*.scss`, `!${dir.src}/**/_*.scss`])
          .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
          }))
          .pipe(sass(options.sass))
          .pipe(gulp.dest(dir.dist));
});

gulp.task('serve', () => {
  browserSync.init(options.serve);

  gulp.watch(`${dir.src}/**`, ['build']);
  gulp.watch(`${dir.dist}/**`, () => {
    browserSync.reload();
  });
});

gulp.task('build', callback => {
  runSequence('jade', 'script', 'css', callback);
});

gulp.task('default', ['build', 'serve']);

import gulp from 'gulp';
import browserSync from 'browser-sync';

const showcasePath = './showcase/'

gulp.task('serve', () => {
  browserSync.init({
    open: false,
    server: showcasePath
  });

  gulp.watch(`${showcasePath}**`, () =>{
    browserSync.reload();
  });
});

gulp.task('default', ['serve']);

let gp = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require("babelify"),
    scriptsPATH = {
        "input": "./app/static/js/",
        "ouput": "./build/static/js/"
    };

// module.exports = function () {
//     $.gulp.task('js:dev', () => {
//         return browserify(scriptsPATH.input + 'common.js')
//         .transform(babelify)
//         .bundle()
//         .pipe(gp.plumber())
//         .pipe(source('common.js'))
//         .pipe($.gulp.dest(scriptsPATH.ouput))
//         .pipe($.browserSync.reload({
//             stream: true
//         }));
//     });
//
//     $.gulp.task('js:build-min', () => {
//         return browserify(scriptsPATH.input + 'common.js')
//         .transform(babelify)
//         .bundle()
//         .pipe(gp.plumber())
//         .pipe(source('common.js'))
//         .pipe(buffer())
//         .pipe(gp.uglify())
//         .pipe($.gulp.dest(scriptsPATH.ouput));
//     });
// };

module.exports = function() {
  $.gulp.task('libsJS:dev', () => {
    return $.gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/jquery-popup-overlay/jquery.popupoverlay.js',
      'node_modules/imask/dist/imask.min.js',
      'node_modules/swiper/dist/js/swiper.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
      'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
      'node_modules/simplebar/dist/simplebar.min.js',
      'node_modules/tabslet/jquery.tabslet.min.js',
      'node_modules/readmore-js/readmore.min.js'
    ])
      .pipe(gp.concat('libs.min.js'))
      .pipe($.gulp.dest(scriptsPATH.ouput))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });

  $.gulp.task('libsJS:build', () => {
    return $.gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/jquery-popup-overlay/jquery.popupoverlay.js',
      'node_modules/imask/dist/imask.min.js',
      'node_modules/swiper/dist/js/swiper.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
      'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
      'node_modules/simplebar/dist/simplebar.min.js',
      'node_modules/tabslet/jquery.tabslet.min.js',
      'node_modules/readmore-js/readmore.min.js'
    ])
      .pipe(gp.concat('libs.min.js'))
      .pipe(gp.uglify())
      .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task('js:copy', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe($.gulp.dest(scriptsPATH.ouput))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
};
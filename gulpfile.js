const gulp = require('gulp')
const browserify = require('browserify')
const glob = require('glob').sync
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const server = require('gulp-webserver')

gulp.task('html', () => {
    gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('build'))
})

gulp.task('js', () => {
    browserify(glob('src/js/**/*.js'))
        .transform('babelify', {
            presets: ['es2015'],
            plugins: ['babel-plugin-transform-object-rest-spread']
        })
        .bundle().on('error', (err) => console.log(err.stack))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build'))
})

gulp.task('run', () => {
    gulp.watch('src/html/**/*.html', ['html'])
    gulp.watch('src/js/**/*.js', ['js'])

    gulp.src('build')
        .pipe(server())
})

gulp.task('default', ['html', 'js'])
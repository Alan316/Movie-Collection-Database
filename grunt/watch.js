module.exports = {

    options: {
        spawn: false,
        livereload: true
    },

    scripts: {
        files: [
            'src/js/*.js',
        ],
        tasks: [
            'jshint',
            'uglify'
        ]
    },

    styles: {
        files: [
            'src/sass/*.scss'
        ],
        tasks: [
            'sass:dev'
        ]
    },

    pug: {
        files: [
            'views/*.pug'
        ],
        tasks: [
            'pug:prod'
        ]
    },
};
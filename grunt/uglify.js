module.exports = {
    all: {
        files: [{
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'public/js',
            ext: '.min.js'
        }]
    }
};
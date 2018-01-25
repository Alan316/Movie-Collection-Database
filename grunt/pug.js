module.exports = {
    // Production settings
    prod: {
        files: [{
            expand: true,
            cwd: 'views',
            src: ['*.pug'],
            dest: 'public/html',
            ext: '.html'
        }]
    }
};
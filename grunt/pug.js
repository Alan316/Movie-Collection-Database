module.exports = {
    // Production settings
    prod: {
        options: { pretty: true },
        files: [{
            expand: true,
            cwd: 'views',
            src: ['*.pug',],
            dest: 'public/html',
            ext: '.html',
        }]
    }
};
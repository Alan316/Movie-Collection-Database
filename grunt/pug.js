module.exports = {
    // Production settings
    prod: {
        files: [{
            expand: true,
            src: ['views/*.pug',],
            dest: 'public/html',
            ext: '.html'
        }]
    }
};
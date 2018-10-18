module.exports = {
	development: {
		files: [{
			expand: true,
			cwd: '<%= srcLocation %>/templates/src',
			src: ['**/*.jsx'],
			dest: '<%= srcLocation %>/templates/build',
			ext: '.js'
		}]
	}
};
module.exports = {
	options: {
		livereload: true
	},
	configFiles: {
		files: [ 'Gruntfile.js', 'grunt/*.js' ],
		options: {
			livereload: true,
			reload: true
		}
	},
	less: {
		options: {
			livereload: true
		},
		files: [ '<%= srcLocation %>/styles/src/**/*.less' ],
		tasks: [ 'less:development' ]
	},
	styles: {
		files: [ '<%= srcLocation %>/styles/build/**/*.css' ],
		tasks: []
	},
	scripts: {
		options: {
			livereload: false
		},
		files: [ '<%= srcLocation %>/scripts/src/**/*.js',
				 '<%= srcLocation %>/models/**/*js',
				 '<%= srcLocation %>/services/**/*js',
				 '<%= srcLocation %>/stores/**/*js',
				 '<%= srcLocation %>/templates/build/**/*js',
				 '<%= srcLocation %>/views/**/*js' ],
		tasks: [ 'jshint:development', 'copy:development' ]
	},
	templates: {
		options: {
			livereload: true
		},
		files: [ '<%= srcLocation %>/templates/src/**/*.js' ],
		tasks: [ 'react:development' ]
	}
};
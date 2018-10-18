module.exports = function(grunt)
{
	require('time-grunt')(grunt);
	require('load-grunt-config')(grunt, {
        config: {
        	srcLocation: 'src',
    		distLocation: './compiled/tripSorter'
        }
	});

	grunt.registerTask('default', [ 'less:development', 'react:development', 'jshint:development', 'copy:development' ]);
	grunt.registerTask('dist', [ 'clean:dist', 'less:dist', 'react:development', 'requirejs:dist', 'uglify:dist', 'copy:dist', 'htmlbuild:dist' ]);
};
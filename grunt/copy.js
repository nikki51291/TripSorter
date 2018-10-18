module.exports = {
	development: {
		files: [{
			src: ['<%= srcLocation %>/scripts/src/index.js'],
			dest: '<%= srcLocation %>/scripts/build/index.js'
    	},
    	{
			src: ['<%= srcLocation %>/external/Graph.js'],
			dest: '<%= srcLocation %>/external/Graph.js'
    	}]
	},
	
	dist: {
		files: [{
			src: ['<%= srcLocation %>/assets/data/response.json'],
			dest: '<%= distLocation %>/assets/data/response.json'
    	},{
			cwd: '<%= srcLocation %>/bower_components/bootstrap/dist/',
			src: [ '**/*.*' ],
			dest: '<%= distLocation %>/bower_components/bootstrap/dist/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/bower_components/font-awesome/web-fonts-with-css',
			src: [ '**/*.*' ],
			dest: '<%= distLocation %>/bower_components/font-awesome/web-fonts-with-css',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/bower_components/noty/lib',
			src: [ '**/*.*' ],
			dest: '<%= distLocation %>/bower_components/noty/lib',
			expand: true
    	}]
	}
};
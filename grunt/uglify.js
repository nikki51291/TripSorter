module.exports = {
  options: {
    mangle: false
  },
  dist: {
    files: {
		'<%= distLocation %>/bower_components/requirejs/require.js': [ '<%= srcLocation %>/bower_components/requirejs/require.js' ]
	}
  }
};
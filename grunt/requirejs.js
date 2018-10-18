module.exports = {
	dist: {
		options: {

			baseUrl: '<%= srcLocation %>/',
			
			paths: {
				'jquery': 'bower_components/jquery/dist/jquery',
				'q': 'bower_components/q/q',
				'underscore': 'bower_components/underscore/underscore',
				'backbone': 'bower_components/backbone/backbone',
				'amplify': 'bower_components/amplify/lib/amplify.min',
				'react': 'bower_components/react/react.development',
				'reactDom': 'bower_components/react/react-dom.development',
				'Noty': 'bower_components/noty/lib/noty.min',
				'moment': 'bower_components/moment/moment',
				'graph' : 'external/Graph'
			},

			packages: [],

			shim: {
				'jquery': {
					exports: '$'
				},
				
				'q': {
					deps: [ 'jquery' ]
				},
				
				'amplify': {
					exports: 'amplify'
				},
				
				'graph': {
					deps: [ 'jquery' ]
				}
				
			},

			logLevel: 1,
			optimize: 'uglify2',
			preserveLicenseComments: false,

			name: 'scripts/src/index',
			include: [ 'models/Application',
			           'router/ApplicationRouter',
					   'views/ApplicationView',
					   'templates/build/HomePageTemplate',
					   'models/pages/HomePageViewModel',
					   'views/pages/HomePageView'],
			           
			out: '<%= distLocation %>/scripts/build/index.js',
			
			done: function(done, output) 
			{
		        var duplicates = require('rjs-build-analysis').duplicates(output);
	
		        if(duplicates.length > 0) 
		        {
		          grunt.log.subhead('Duplicates found in requirejs build:');
		          grunt.log.warn(duplicates);
		          done(new Error('r.js built duplicate modules, please check the excludes option.'));
		        }

		        done();
			}
		}
	}
};
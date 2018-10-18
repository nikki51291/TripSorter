var appNamespace = window.__TripSorter = window.__TripSorter || {};

appNamespace.__baseURL = (() => {
	
	var origin = window.location.origin;
	var pageLocation = window.location.pathname;

	var rootDirectory = pageLocation.substring(0, pageLocation.lastIndexOf('/'));

	return origin + rootDirectory + '/';
	
})(); 

require.config({

	baseUrl: appNamespace.__baseURL,

	waitSeconds: 300,

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
		
	}
});

require(['jquery',
		  'q',
		  'underscore',
		  'moment',
		  'Noty',
		  'graph'],
($, Q, _, moment, Noty) =>
{
	console.log("Trip Sorter Index");
	
	window.addEventListener('error', (event) =>
    {
        if(event.error && _.isError(event.error))
        {
            var eventData = {
                message: event.message
            };

           console.log('unhandled-js-error: '+JSON.stringify(eventData));
        }
    });
	
	$(document).ajaxError((event, request, settings, thrownError) => 
    {
        var eventData = {
            url: settings.url,
            status: request.status || '',
            statusText: request.statusText || '',
            responseText: request.responseText || '',
            thrownError: thrownError || ''
        };
        
    	console.log('ajax-error: '+JSON.stringify(eventData));
        	
    });
	
	require([ 'models/Application',
	          'router/ApplicationRouter',
			  'views/ApplicationView' ], 
	(Application, ApplicationRouter, ApplicationView) =>
	{
		console.log("loaded base files");
		
		var application = Application.getInstance();
		appNamespace.router = new ApplicationRouter();
		appNamespace.model = application;
		appNamespace.applicationView = new ApplicationView({
			
			el: $(document),
			model: appNamespace.model,
			router: appNamespace.router
			
		});
		
		Backbone.history.start();
		
	}, ( error )=> {
		
		console.log("Error loading base: " + error);
		
	});
	
});
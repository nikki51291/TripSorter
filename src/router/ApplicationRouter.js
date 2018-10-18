define(['backbone',
        'underscore'], 
    function(Backbone, _){
	
	var ApplicationRouter = Backbone.Router.extend({
		
		initialize: function()
		{
			console.log("Router Initialized");
		},
	
		routes: {
			"": "home",
			"*path": "home"
			
		}
		
	});
	
	return ApplicationRouter;
});
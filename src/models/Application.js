define(['backbone',
        'underscore'], function(Backbone, _){

	var _Application = Backbone.Model.extend({
		
		defaults: function()
		{
			return {
				version: "1.0.0"
			};
		},
		
		initialize: function(options)
		{
			this.options = options || {};
			
			var defaultValues = this.defaults();
			this.set(_.pick(this.options, _.keys(defaultValues)));
			
			_.mixin({
			  capitalize: function(string) {
			    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
			  }
			});
			
			console.log('Application Model Initialized');
		}
		
	});
	
	var _instance = null;

	return {
		getInstance: function()
		{
			if (!_instance)
			{
				_instance = new _Application();
			}

			return _instance;
		}
	};
	
});
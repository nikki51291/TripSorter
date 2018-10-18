define(['backbone',
        'underscore',
        'models/Deals'], 
        function(Backbone, _, Deals){
	
	var TransportData = Backbone.Model.extend({
		
		defaults: function(){
			return {
				
				currency: "USD",
				deals: new Deals()
				
			};
		},
		
		initialize: function(options)
		{
			this.options = options || {};
			
			var defaultValues = this.defaults();
			this.set(_.pick(this.options, _.keys(defaultValues)));
			
			console.log('Transport Model Initialized');
			
		}
		
	});
	
	return TransportData;
	
});
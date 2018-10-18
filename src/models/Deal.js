define(['backbone', 
        'underscore'],
        function(Backbone, _){
	
	var Deal = Backbone.Model.extend({
		
		defaults: function(){
			return {
				
				transportType: "",
				departure: "",
				arrival: "",
				duration: 0,
				cost: 0,
				discount: 0,
				reference: ""
				
			};
		},
		
		initialize: function(options)
		{
			this.options = options || {};
			
			var defaultValues = this.defaults();
			this.set(_.pick(this.options, _.keys(defaultValues)));
			
			console.log('Deal Model Initialized');
			
		}
		
	});
	
	return Deal;
	
});
define(['backbone',
        'underscore',
		'q',
		'models/Application',
		'models/Deals',
        'models/TransportData',
        'services/CommonDataService'],
function(Backbone, _, Q, application, Deals, TransportData, CommonDataService)
{	
	var _application = application.getInstance();
	
	var Model = Backbone.Model.extend({
		
		defaults: function()
		{	
			return {
				transportData: new TransportData(),
				cities: [],
				graphData: null,
				routingMethod: "fastest",
				searchResults: []
			};
		},
		
		initialize: function(options)
		{
			this.options = options || {};
			var defaultValues = this.defaults();
			this.set(_.pick(this.options, _.keys(defaultValues)));
		},
		
		setCities: function(transportData)
		{
			var deals = transportData.get("deals");
			
			var cities = _.union(deals.pluck("arrival"), deals.pluck("departure"));
			
			this.set({
				cities: cities
			});
		},
		
		populateTransportData: function()
		{
			return CommonDataService.getTransportData()
			.then(_.bind(function(data){
				
				this.get("transportData").set(data.transportData.attributes);
				this.setCities(data.transportData);
				
			},this));
			
		},
		
		changeRouteType: function()
		{
			var deals = this.get("transportData").get("deals");
			
			var graphData = deals.fetchMapDataForTransport(this.get("routingMethod"));

			this.set({graphData: graphData});
		},
		
		getRouteDetails: function(routePoints)
		{
			var dealsDetails = new Deals();
			
			var deals = this.get("transportData").get("deals");
			
			var dealsValues = [];
			
			var routingMethod = (this.get("routingMethod")==="cheapest"? "cost": "duration");
			
			_.map(routePoints, _.bind(function(currentCity, key){
				
				if(key<routePoints.length-1)
				{
					var currentCityItems = deals.filter(_.bind(function(currentDeal){
						
						return currentDeal.get("departure") === currentCity && currentDeal.get("arrival") === routePoints[key+1];
						
					}, this));
					
					dealsValues = _.union(dealsValues, currentCityItems);
				}
				
			}, this));
			
			_.each(
				_.groupBy(dealsValues, function(currentDeal){ 
					return currentDeal.get("departure"); 
				}), 
				function(currentItem, key){ 
				
				var dealItem = _.min(currentItem, function(currentCity){
					return currentCity.get(routingMethod);
				});
				
				dealsDetails.add(dealItem);
					
			});
			
			return dealsDetails;
		}
		
	});
	
	return Model;
	
});
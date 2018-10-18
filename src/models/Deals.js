define(['backbone', 
        'underscore',
        'models/Deal'],
        function(Backbone, _, Deal){
	
	var Deals = Backbone.Collection.extend({
		
		model: Deal,
		
		initialize: function(options)
		{
			this.options = options || {};
			
			console.log('Deals Model Initialized');
			
		},
		
		returnMapItem: function(mapData, currentMap, sortCriteria)
		{
			var citiesWithMapAsDeparture = [];
			var citiesWithMapAsArrival = [];
			
			if(!mapData[currentMap])
			mapData[currentMap] = {};
			
			this.each(function(currentDeal){
						
				if(currentDeal.get("arrival") === currentMap)
				{
					if(!mapData[currentMap][currentDeal.get("departure")])
						mapData[currentMap][currentDeal.get("departure")] = {};
					mapData[currentMap][currentDeal.get("departure")][currentDeal.get("transportType")] = currentDeal.get(sortCriteria);
					citiesWithMapAsArrival.push(currentDeal.get("departure"));
				}
				else if(currentDeal.get("departure") === currentMap)
				{
					if(!mapData[currentDeal.get("arrival")])
					mapData[currentDeal.get("arrival")] = {};
					if(!mapData[currentDeal.get("arrival")][currentDeal.get("departure")])
						mapData[currentDeal.get("arrival")][currentDeal.get("departure")] = {};
					mapData[currentDeal.get("arrival")][currentDeal.get("departure")][currentDeal.get("transportType")] = currentDeal.get(sortCriteria);
					citiesWithMapAsDeparture.push(currentDeal.get("arrival"));
				}
				
			});
			
			return {citiesWithMapAsDeparture: _.uniq(citiesWithMapAsDeparture), citiesWithMapAsArrival: _.uniq(citiesWithMapAsArrival), mappedData: mapData};
		},
		
		fetchMapDataForTransport: function(routeMethod)
		{
			var mapData = {};
			
			var sortCriteria = (routeMethod==="cheapest"? "cost": "duration");
			
			var arrivalCities = [];
			var departureCities = [];
			
			var isFound = true;
			
			var cities = _.union(this.pluck("arrival"), this.pluck("departure"));
			
			var tempArray = cities;
			
			var testArray = tempArray;
			
//			if(cities.length)
//			{
				while(isFound)
				{
					_.each(tempArray, _.bind(function(currentCity){
						
						var fetchedDetails = this.returnMapItem(mapData, currentCity, sortCriteria);
						
						mapData = fetchedDetails.mappedData;
						
						var differenceAvailable = false;
						
						_.each(fetchedDetails.citiesWithMapAsDeparture, function(currentDetail){
							
							if(departureCities.indexOf(currentDetail)===-1)
							{
								differenceAvailable= true;
							}
							
						});
						
						if(!differenceAvailable)
						{
							_.each(fetchedDetails.citiesWithMapAsArrival, function(currentDetail){
								
								if(arrivalCities.indexOf(currentDetail)===-1)
								{
									differenceAvailable= true;
								}
								
							});
						}
						
						tempArray = fetchedDetails.citiesWithMapAsDeparture;
						
						arrivalCities = _.union(arrivalCities, fetchedDetails.citiesWithMapAsArrival);
						departureCities = _.union(departureCities, fetchedDetails.citiesWithMapAsDeparture);
						
						if(!differenceAvailable)
						{
							isFound = false;
						}
						
					}, this));
				}
//			}

		    var graph = new Graph(mapData);
		    
		    return graph;
		}
		
		
	});
	
	return Deals;
	
});
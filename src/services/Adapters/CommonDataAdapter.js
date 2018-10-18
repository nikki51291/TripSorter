define(['underscore',
        'models/TransportData',
        'models/Deals',
        'models/Deal',
        'moment'],
function(_, TransportData, Deals, Deal, moment)
{
	var Adapter = function() {};
	
	Adapter.parseTransportData = function(data)
	{
		var transportData = null;
		
		if(data)
		{
			transportData = new TransportData({
				currency: data.currency,
				deals: Adapter.parseDeals(data.deals)
			});
		}
		else
		{
			throw new Error('CaseStatus data not supplied while calling parse method');
		}
		
		return transportData;
	};
	
	Adapter.parseDeals = function(deals)
	{
		var dealsData = new Deals();
		
		if(deals)
		{
			_.each(deals, function(currentDeal){
				
				var newDeal = new Deal({
					transportType: currentDeal.transport,
					departure: currentDeal.departure,
					arrival: currentDeal.arrival,
					duration: moment.duration(currentDeal.duration.h + ":" + currentDeal.duration.m).asSeconds(),
					cost: currentDeal.cost,
					discount: currentDeal.discount,
					reference: currentDeal.reference
				});
				
				dealsData.add(newDeal);
			});
		}
		else
		{
			throw new Error('Deals data not supplied while calling parse method');
		}
		
		return dealsData;
	};

	return Adapter;
});
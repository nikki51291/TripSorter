define(['backbone',
        'underscore',
        'q',
        'amplify',
        'services/adapters/CommonDataAdapter'],
function(Backbone, _, Q, amplify, CommonDataAdapter)
{
    console.log('tripSorter.services.CommonDataService');

    var Service = function() {};
    
    Service.getTransportData = function()
    {
    	console.log('@getTransportData');

        var deferredResult = Q.defer();
		
		var serviceURL = 'assets/data/response.json';
		
		var requestPromise = $.ajax({
			url: serviceURL,
            method: 'GET',
			contentType: 'application/json',
			dataType: 'json'
		});
		
		Q(requestPromise).timeout(6000)
			.then(function(data) 
			{
				var parsedData = CommonDataAdapter.parseTransportData(data);
				
                deferredResult.resolve({
                	transportData: parsedData,
					totalDeals: (data.deals? data.deals.length: 0)
				});
			})
			.catch(function(reason)
			{
				if(reason instanceof Error)
				{
					logger.error('Error during fetching transport data %s', reason.message + '\n' + reason.stack);
	
					deferredResult.reject({
						message: reason.message,
						reason: reason
					});
				}
				else if(!_.isUndefined(reason.status) && (reason.responseText || reason.statusText))
				{
					logger.error('Fetching transport data failed. status: %s. status text: %s. response: %s.', reason.status, reason.statusText, reason.responseText);
					
					deferredResult.reject({
						message: (reason.responseJSON? (reason.responseJSON.responseText || reason.responseJSON.statusText || reason.responseJSON.fault.message): 'Interrupted Network'),
						reason: reason
					});
				}
				else
				{
					logger.error('Unknown Failure. %s', reason);
	
					deferredResult.reject({
						message: 'Fetching transport data failed',
						reason: reason
					});
				}
			});

        return deferredResult.promise;
    	
    };
    
    return Service;
});
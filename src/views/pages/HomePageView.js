define(['backbone',
        'underscore',
        'react',
        'reactDom',
		'models/Application'],
        
    function(Backbone, _, React, ReactDom, application){
	
	var _application = application.getInstance();

	var HomePageView = Backbone.View.extend({
		
		initialize: function(options)
		{
			this.options = options;
			this._createPage();
			this._attachEventHandlers();
			this._populateDataPromise = null;
			this.render();
		},
		
		_createPage: function()
		{
			var templateFactory = React.createFactory(this.options.template);
			
			this.homePageContentComponentDescriptor = templateFactory({
				model: this.model
			});
	    },
	    
	    _attachEventHandlers: function()
		{
			this.$el.on('click', '.btn-search', _.bind(this.findPath, this));
		},
	    
	    render: function()
	    {
	    	this.homePageContentComponent = ReactDom.render(this.homePageContentComponentDescriptor, this.$el.find('.container-fluid').get(0));
	    	this._populateData();
	    },
	    
	    _populateData: function()
		{
	    	if(!this._populateDataPromise)
	    	{
	    		this._populateDataPromise = this.model.populateTransportData()
				.then(_.bind(function(error){
				
					amplify.publish('ui/showSuccessNotification', 'Transport data downloaded successfully');
					
	            }, this))
				.catch(_.bind(function(error){
				
					amplify.publish('ui/showErrorNotification', 'Error in downloading data');
					
	            }, this))
	    		.finally(_.bind(function(){
				
	    			this._populateDataPromise = null;
					
	            }, this));
	    	}
		},
	    
	    findPath: function()
	    {
	    	this.homePageContentComponent.setState({
    			isSearching: true
    		});
	    	
	    	_.delay(_.bind(function(){
	    		
	    		var cityFrom = this.homePageContentComponent.state.cityFrom;
		    	var cityTo = this.homePageContentComponent.state.cityTo;
		    	var routeMethod = this.homePageContentComponent.state.routeMethod;
		    	
		    	this.model.set({routingMethod: routeMethod});
		    	
		    	this.model.changeRouteType(routeMethod);
		    	
		    	var routePoints = this.model.get("graphData").findShortestPath(cityFrom, cityTo);
		    	
		    	var routeDetailItems = this.model.getRouteDetails(routePoints);
		    	
		    	this.model.set({searchResults: routeDetailItems});
		    	
	    		this.homePageContentComponent.setState({
	    			routesFound: routePoints.length? true: false,
					isSearching: false
	    		});
	    		
	    	}, this), 1000);
	    	
	    	
	    }
		
	});
	
	return HomePageView;
	
});
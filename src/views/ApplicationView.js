define(['backbone',
        'underscore',
        'Noty',
        'amplify'], function(Backbone, _, Noty, amplify){
	
	var DEFAULT_NOTIFICATION_OPTIONS = {
		layout: 'top',
	    theme: 'bootstrap-v4',
		animation: {
			open: 'animated fadeInDown',
			close: 'animated fadeOut'
		}
	};
	
	var ApplicationView = Backbone.View.extend({
		
		initialize: function(options)
		{
			this.options = options || {};
			
			this._currentPage = null;
            this._pagePromise = null;
            this._createChildren();
            this._attachEventHandlers();
            
			this.render();
		},
		
		_createChildren: function() {
            this._pageContainer = this.$el.find(".page-container");
        },
		
		_attachEventHandlers: function()
		{
			this.listenTo(this.options.router, "route", this._onRouteChange);
            this.listenTo(this.options.router, "route:home", this._navigateToHome);
			amplify.subscribe('ui/showSuccessNotification', this._showSuccessNotification);
			amplify.subscribe('ui/showErrorNotification', this._showErrorNotification);
		},
		
		render: function()
		{
			this._attachEventHandlers();
		},
		
		_onRouteChange: function(url) {
			console.log(url);
        },
        
        _navigateToHome: function(event) {
            this._changePage("templates/build/HomePageTemplate", "views/pages/HomePageView", "models/pages/HomePageViewModel");
            this.$el.get(0).title = "Home - Project";
        },
        
        _changePage: function(pageTemplate, pageView, pageModel, options) {
            
        	if(! this._pagePromise)
        	{
        		this._pagePromise = $.Deferred();
                
                require([pageTemplate, pageView, pageModel], _.bind(function(PageTemplate, PageView, PageModel) {
                	
                    var newPageObject = {
                        template: PageTemplate,
                        el: this.$el
                    };
                    
                    if(PageModel)
                    {
                    	newPageObject.model = new PageModel();
                    }
                    
                    if(options)
                    {
                    	newPageObject = _.extend(newPageObject, options);
                    }
                    
                    var pageInstance = new PageView(newPageObject);
                    
                    this._pagePromise.resolve({
                        page: pageInstance
                    });
                    
                }, this), _.bind(function(err) {
                	
                	this._pagePromise.reject(err);
                	
                }, this));
        	}
            
            return this._pagePromise.promise();
            
        },
        
        _onPageLoaded: function(pageInstance) {
        	
            this._currentPage.remove();
            this._currentPage = null;
            this._pageContainer.append(pageInstance.page.$el);
            this._currentPage = pageInstance.page;
        },
        
        _onPageLoadError: function(pageInstance) {
           console.log("Error loading page: " + pageInstance);
        },
        
        _showErrorNotification: function(message, options) {
        	Noty.closeAll();
        	
        	var notification = new Noty({
        		layout: 'top',
        	    theme: 'bootstrap-v4',
        	    type: 'error',
				text: message,
				closeWith: ["click"]
			});
        	
        	notification.show();
        	
        	_.delay(function(){ 
        		Noty.closeAll();
    		}, 2000);
        },
        _showSuccessNotification: function(message, options) {
        	
        	Noty.closeAll();
        	
        	var notification = new Noty({
        		layout: 'top',
        	    theme: 'bootstrap-v4',
        	    type: 'success',
				text: message,
				closeWith: ["click"]
			});
        	
        	notification.show();
        	
        	_.delay(function(){ 
        		Noty.closeAll();
    		}, 2000);
        	
        },
	});
	
	return ApplicationView;
});
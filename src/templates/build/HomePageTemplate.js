define(['react',
		'reactDom',
		'underscore',
		'moment',
		'models/Application'],

function(React, ReactDom, _, moment, application){

var _application = application.getInstance();

class HomePage extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			cities: [],
			cityFrom: "",
			cityTo: "",
			routeMethod: "fastest",
			routesFound: null,
			isSearching: false
		};

		this.formatCurrency = (num, currency = this.props.model.get("transportData").get("currency"), locale = 'en-US') =>
  		new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);

	}

	componentDidMount() {
		this.props.model.on("change:cities", _.bind(this._onCollectionChanged, this));
	}

	_onCollectionChanged()
	{
		this.setState({
			cities: this.props.model.get("cities")
		});
	} 

	renderCities(item) {
		return React.createElement("option", {key: item, val: item.toLowerCase()}, " ", _(item).capitalize(), " ");
	}

	onTransportFilterChange(event) {
		var currentElement = $(event.currentTarget);

		this.setState({routeMethod: $(currentElement).val()});
	}

	onCityChange(event) {

		var currentElement = $(event.currentTarget);

		if($(currentElement).attr("id")==="cityFrom")
		{
			this.setState({cityFrom: $(currentElement).val()});
			$(this.refs.cityTo).val("");
		}
		else
		{
			this.setState({cityTo: $(currentElement).val()});
		}
	}

	renderRouteDetail(item) {

		var getOriginalPrice = function(discount, sellingPrice)
		{
			var originalPrice = (sellingPrice/ ((100 - discount)/ 100));

			return originalPrice;
		};

		var methodIcon = "fa-plane";
		var methodTitle = "Flight";

		if(item.get("transportType").toLowerCase()==="car")
		{
			methodIcon = "fa-car-side";
			methodTitle = "Car";
		}
		else if(item.get("transportType").toLowerCase()==="bus")
		{
			methodIcon = "fa-bus-alt";
			methodTitle = "Bus";
		}

		return React.createElement("li", {key: item.get("reference")}, 
			React.createElement("div", {className: "details-wrapper"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-sm-10"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-sm-12"}, 
								React.createElement("span", {className: "attribute-label"}, "Reference: "), 
								React.createElement("span", {className: "attribute-value"}, item.get("reference"))
							)
						), 
						React.createElement("div", {className: "row"}, 
							
							React.createElement("span", {className: "col-sm-2 attribute-from attribute-label"}, item.get("departure")), 
							React.createElement("span", {className: "col-sm-8 attribute-mode"}, 
								React.createElement("hr", null), 
								React.createElement("span", {className: "route-wrapper", title: methodTitle}, 
									React.createElement("span", null, moment.utc(item.get("duration")*1000).format('HH:mm')), 
									React.createElement("i", {className: "fas " + methodIcon})
								)
							), 
							React.createElement("span", {className: "col-sm-2 attribute-to attribute-label"}, item.get("arrival"))
							
						)
					), 
					React.createElement("div", {className: "col-sm-2 ml-auto cost-details"}, 
						item.get("discount") && item.get("discount")>0?
							React.createElement("div", null, 
								React.createElement("div", null, React.createElement("span", {className: "discount-value"}, item.get("discount"), "% OFF"), " ", React.createElement("span", {className: "original-price"}, this.formatCurrency(getOriginalPrice(item.get("discount"), item.get("cost")))))
							):
						 null, 
						React.createElement("div", {className: "sale-price"}, this.formatCurrency(item.get("cost")))
					)
				)
				
			)
		);

	}

	render() {

		var model = this.props.model;
		var cities = this.state.cities.sort();
		
		return (React.createElement("div", {className: "home-page page", id: "home"}, 
			React.createElement("form", null, 
				React.createElement("div", {className: "form-group"}, 
					React.createElement("select", {className: "form-control", id: "cityFrom", ref: "cityFrom", defaultValue: this.state.cityFrom, onChange: _.bind(this.onCityChange, this)}, 
					  React.createElement("option", null, "Select"), 
					  _.map(cities, _.bind(this.renderCities, this))
					)
				), 
				React.createElement("div", {className: "form-group"}, 
					React.createElement("select", {className: "form-control", id: "cityTo", ref: "cityTo", defaultValue: this.state.cityTo, onChange: _.bind(this.onCityChange, this)}, 
					  React.createElement("option", null, "Select"), 

					   this.state.cityFrom? _.map(_.without(cities, this.state.cityFrom), _.bind(this.renderCities, this)): null
					)
				), 
				React.createElement("div", {className: "form-group"}, 
				React.createElement("div", {className: "form-check form-check-inline"}, 
				  React.createElement("input", {className: "form-check-input", type: "radio", name: "searchType", id: "cheapestInput", value: "cheapest", defaultChecked: this.state.routeMethod === "cheapest"? "checked": "", onChange: _.bind(this.onTransportFilterChange, this)}), 
				  React.createElement("label", {className: "form-check-label", htmlFor: "cheapestInput"}, 
				    "Cheapest"
				  )
				), 
				React.createElement("div", {className: "form-check form-check-inline"}, 
				  React.createElement("input", {className: "form-check-input", type: "radio", name: "searchType", id: "fastestInput", value: "fastest", defaultChecked: this.state.routeMethod === "fastest"? "checked": "", onChange: _.bind(this.onTransportFilterChange, this)}), 
				  React.createElement("label", {className: "form-check-label", htmlFor: "fastestInput"}, 
				    "Fastest"
				  )
				)
				), 
				React.createElement("button", {type: "button", className: "btn btn-primary btn-search", disabled: this.state.cityTo.length &&  this.state.cityFrom.length && !this.state.isSearching? "": "disabled"}, React.createElement("i", {className: "fas fa-search"}), " Search"), 

				this.state.isSearching? 

					React.createElement("div", {className: "row search-wrapper"}, 
						React.createElement("div", {className: "col-sm-12"}, React.createElement("i", {className: "fas fa-spinner fa-spin"})), 
						React.createElement("div", {className: "col-sm-12"}, "Fetching routes to your destination!")
					)
					: (this.state.routesFound? 
					React.createElement("div", {className: "row"}, 
						React.createElement("ul", {className: "col-sm-12"}, model.get("searchResults").map(_.bind(this.renderRouteDetail,this)))
					):
					this.state.routesFound===false?
						React.createElement("div", null, " No Routes Found "):
						 null)
				
			)

		));
	}

}

return HomePage;	

});
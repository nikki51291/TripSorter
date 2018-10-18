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
		return <option key={item} val={item.toLowerCase()}> {_(item).capitalize()} </option>;
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

		return <li key={item.get("reference")}>
			<div className="details-wrapper">
				<div className="row">
					<div className="col-sm-10">
						<div className="row">
							<div className="col-sm-12">
								<span className="attribute-label">Reference: </span>
								<span className="attribute-value">{item.get("reference")}</span>
							</div>
						</div>
						<div className="row">
							
							<span className="col-sm-2 attribute-from attribute-label">{item.get("departure")}</span>
							<span className="col-sm-8 attribute-mode">
								<hr />
								<span className="route-wrapper" title={methodTitle}>
									<span>{moment.utc(item.get("duration")*1000).format('HH:mm')}</span>
									<i className={"fas " + methodIcon}></i>
								</span>
							</span>
							<span className="col-sm-2 attribute-to attribute-label">{item.get("arrival")}</span>
							
						</div>
					</div>
					<div className="col-sm-2 ml-auto cost-details">
						{item.get("discount") && item.get("discount")>0?
							<div>
								<div><span className="discount-value">{item.get("discount")}% OFF</span> <span className="original-price">{this.formatCurrency(getOriginalPrice(item.get("discount"), item.get("cost")))}</span></div>
							</div>:
						 null}
						<div className="sale-price">{this.formatCurrency(item.get("cost"))}</div>
					</div>
				</div>
				
			</div>
		</li>;

	}

	render() {

		var model = this.props.model;
		var cities = this.state.cities.sort();
		
		return (<div className="home-page page" id="home">
			<form>
				<div className="form-group">
					<select className="form-control" id="cityFrom" ref="cityFrom" defaultValue={this.state.cityFrom} onChange={_.bind(this.onCityChange, this)}>
					  <option>Select</option>
					  {_.map(cities, _.bind(this.renderCities, this))}
					</select>
				</div>
				<div className="form-group">
					<select className="form-control" id="cityTo" ref="cityTo" defaultValue={this.state.cityTo} onChange={_.bind(this.onCityChange, this)}>
					  <option>Select</option>

					  { this.state.cityFrom? _.map(_.without(cities, this.state.cityFrom), _.bind(this.renderCities, this)): null}
					</select>
				</div>
				<div className="form-group">
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="searchType" id="cheapestInput" value="cheapest" defaultChecked={this.state.routeMethod === "cheapest"? "checked": ""} onChange={_.bind(this.onTransportFilterChange, this)} />
				  <label className="form-check-label" htmlFor="cheapestInput">
				    Cheapest
				  </label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="searchType" id="fastestInput" value="fastest" defaultChecked={this.state.routeMethod === "fastest"? "checked": ""} onChange={_.bind(this.onTransportFilterChange, this)} />
				  <label className="form-check-label" htmlFor="fastestInput">
				    Fastest
				  </label>
				</div>
				</div>
				<button type="button" className="btn btn-primary btn-search" disabled={this.state.cityTo.length &&  this.state.cityFrom.length && !this.state.isSearching? "": "disabled"}><i className="fas fa-search"></i> Search</button>

				{this.state.isSearching? 

					<div className="row search-wrapper">
						<div className="col-sm-12"><i className="fas fa-spinner fa-spin"></i></div>
						<div className="col-sm-12">Fetching routes to your destination!</div>
					</div>
					: (this.state.routesFound? 
					<div className="row">
						<ul className="col-sm-12">{model.get("searchResults").map(_.bind(this.renderRouteDetail,this))}</ul>
					</div>:
					this.state.routesFound===false?
						<div> No Routes Found </div>:
						 null)
				}
			</form>

		</div>);
	}

}

return HomePage;	

});
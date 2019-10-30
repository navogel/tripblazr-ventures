import React, { Component } from 'react';
import Mapper from '../map/LocationsMap';
import TripManager from '../../modules/TripManager';
import { withRouter } from 'react-router-dom';
import LocationCard from './LocationCard';
import animateScrollTo from 'animated-scroll-to';

class Trip extends Component {
	state = {
		locations: [],
		tripDetails: {},
		clickedCoords: [],
		droppedPin: false
	};

	switchTrip = () => {
		this.props.history.push(`/mytrips`);
	};

	filterType = id => {
		TripManager.getTripByType(this.props.tripId, id).then(locations => {
			this.setState({
				locations: locations,
				clickedCoords: [],
				droppedPin: false
			});
		});
	};

	clearCoords = () => {
		this.setState({ clickedCoords: [] });
	};

	dropPin = () => {
		this.setState({ droppedPin: true, clickedCoords: [] });
	};

	scrollTo = id => {
		let newId = '.scroll' + id;
		let scrollEl = document.querySelector(newId);
		//console.log(scrollEl);
		animateScrollTo(scrollEl, {
			elementToScroll: document.querySelector('.listWrapper')
		});
	};

	FocusMarker = obj => {
		this.setState({
			clickedCoords: [obj.lat, obj.lng],
			droppedPin: false
		});
	};

	getData = () => {
		TripManager.getTrip(this.props.tripId)
			.then(locations => {
				this.setState({
					locations: locations,
					clickedCoords: []
				});
			})
			.then(() => {
				TripManager.getTripDetails(this.props.tripId).then(details => {
					this.setState({
						tripDetails: details
					});
				});
			});
	};

	componentDidMount() {
		//getAll from AnimalManager and hang on to that data; put it in state
		this.getData();
	}

	render() {
		// console.log(
		// 	'locations array',
		// 	this.state.locations,
		// 	this.state.tripDetails
		// );
		return (
			<>
				<div className='tripWrapper'>
					<div className='listWrapper'>
						<button onClick={this.switchTrip}>back to trips</button>
						<button onClick={e => this.filterType(1)}>Hotels</button>
						<button onClick={e => this.filterType(2)}>Activities</button>
						<button onClick={e => this.filterType(3)}>Food</button>
						<button onClick={e => this.getData()}>All</button>

						{this.state.locations.map(location => (
							<LocationCard
								key={location.id}
								location={location}
								getData={this.getData}
								focusMarker={this.FocusMarker}
								//{...this.props}
							/>
						))}
					</div>

					<div className='mapWrapper'>
						<Mapper
							className='mapper'
							locations={this.state.locations}
							tripDetails={this.state.tripDetails}
							scrollTo={this.scrollTo}
							clickedCoords={this.state.clickedCoords}
							clearCoords={this.clearCoords}
							dropPin={this.dropPin}
							droppedPin={this.state.droppedPin}
						/>
						{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(Trip);

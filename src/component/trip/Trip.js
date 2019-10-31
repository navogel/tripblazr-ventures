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
		// console.log('props from tripcard', this.props);

		this.getData();
	}

	render() {
		console.log('trip deets in state at trip render', this.state.tripDetails);
		return (
			<>
				<div className='tripWrapper'>
					<div className='leftColumn'>
						<div className='listHeader'>
							<button onClick={this.switchTrip}>back to trips</button>
							<button onClick={e => this.filterType(1)}>Hotels</button>
							<button onClick={e => this.filterType(2)}>Activities</button>
							<button onClick={e => this.filterType(3)}>Food</button>
							<button onClick={e => this.getData()}>All</button>
						</div>
						<div className='listWrapper'>
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
					</div>
					{this.state.tripDetails && (
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
					)}
				</div>
			</>
		);
	}
}

export default withRouter(Trip);

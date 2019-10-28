import React, { Component } from 'react';
import Mapper from '../map/LocationsMap';
import TripManager from '../../modules/TripManager';
import { withRouter } from 'react-router-dom';

class Trip extends Component {
	state = {
		locations: [],
		tripDetails: {}
	};

	switchTrip = () => {
		this.props.history.push(`/mytrips`);
	};

	filterType = id => {
		TripManager.getTripByType(this.props.tripId, id).then(locations => {
			this.setState({
				locations: locations
			});
		});
	};

	getData = () => {
		TripManager.getTrip(this.props.tripId)
			.then(locations => {
				this.setState({
					locations: locations
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
		return (
			<>
				<button onClick={this.switchTrip}>back to trips</button>
				<button onClick={e => this.filterType(1)}>Hotels</button>
				<button onClick={e => this.filterType(2)}>Activities</button>
				<button onClick={e => this.filterType(3)}>Food</button>
				<button onClick={e => this.getData()}>All</button>

				<div>This is a tripView</div>
				<div className='mapWrapper'>
					<Mapper
						className='mapWrapper'
						locations={this.state.locations}
						tripDetails={this.state.tripDetails}
					/>
					{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
				</div>
			</>
		);
	}
}

export default withRouter(Trip);

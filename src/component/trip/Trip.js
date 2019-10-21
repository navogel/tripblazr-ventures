import React, { Component } from 'react';
import Mapper from '../map/Map';
import TripManager from '../../modules/TripManager';

class Trip extends Component {
	state = {
		tripId: 1,
		locations: []
	};

	switchTrip = () => {
		TripManager.getTrip(2).then(locations => {
			this.setState({
				locations: locations
			});
		});
	};

	componentDidMount() {
		//getAll from AnimalManager and hang on to that data; put it in state
		TripManager.getTrip(this.state.tripId).then(locations => {
			this.setState({
				locations: locations
			});
			// console.log('state', this.state.locations);
		});
	}

	render() {
		return (
			<>
				<button onClick={this.switchTrip}>switch trips</button>
				<div>This is a tripView</div>
				<div className='mapWrapper'>
					<Mapper props={this.state.locations} />
				</div>
			</>
		);
	}
}

export default Trip;

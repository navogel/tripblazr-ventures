import React, { Component } from 'react';
import Mapper from '../map/U-Map';
import Mapper2 from '../map/Map';
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
		});
	}

	render() {
		return (
			<>
				<button onClick={this.switchTrip}>switch trips</button>
				<div>This is a tripView</div>
				<div className='mapWrapper'>
					<Mapper className='mapWrapper' props={this.state.locations} />
					{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
				</div>
			</>
		);
	}
}

export default Trip;

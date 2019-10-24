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

	filterType = id => {
		TripManager.getTripByType(this.state.tripId, id).then(locations => {
			this.setState({
				locations: locations
			});
		});
	};

	getData = () => {
		TripManager.getTrip(this.state.tripId).then(locations => {
			this.setState({
				locations: locations
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
				<button onClick={this.switchTrip}>switch trips</button>
				<button onClick={e => this.filterType(1)}>Hotels</button>
				<button onClick={e => this.filterType(2)}>Activities</button>
				<button onClick={e => this.filterType(3)}>Food</button>
				<button onClick={e => this.getData()}>All</button>

				<div>This is a tripView</div>
				<div className='mapWrapper'>
					<Mapper className='mapWrapper' locations={this.state.locations} />
					{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
				</div>
			</>
		);
	}
}

export default Trip;

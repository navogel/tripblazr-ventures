import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import TripMapper from '../map/TripsMap';

class TripList extends Component {
	state = {
		trips: []
	};

	getTrips = () => {
		TripManager.getAllTrips(this.props.activeUser).then(newTrips => {
			this.setState({
				trips: newTrips
			});
		});
	};

	componentDidMount() {
		this.getTrips();
		console.log('trippin', this.state.trips);
	}

	render() {
		console.log('state trippin', this.state.trips);
		return (
			<>
				{/* <button onClick={this.switchTrip}>switch trips</button> */}
				{/* <button onClick={e => this.filterType(1)}>Hotels</button>
				<button onClick={e => this.filterType(2)}>Activities</button>
				<button onClick={e => this.filterType(3)}>Food</button>
				<button onClick={e => this.getData()}>All</button> */}

				<div>This is a tripList</div>
				<div className='mapWrapper'>
					<TripMapper
						className='mapWrapper'
						trips={this.state.trips}
						lat={this.state.lat}
						lng={this.state.lng}
					/>
					{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
				</div>
			</>
		);
	}
}

export default TripList;

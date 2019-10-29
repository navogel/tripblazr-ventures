import React, { Component, createRef } from 'react';
import TripManager from '../../modules/TripManager';
import TripMapper from '../map/TripsMap';
import TripCard from './TripCard';
import TripDrawer from './TripDrawer';

class TripList extends Component {
	state = {
		trips: [],
		clickedCoords: []
	};

	getTrips = () => {
		TripManager.getAllTrips(this.props.activeUser).then(newTrips => {
			this.setState({
				trips: newTrips
			});
		});
	};

	toggleDrawer = () => {
		// Access the handleToggle function of the drawer reference
		this.refs.drawer.openDrawer();
	};

	FocusMarker = obj => {
		console.log('obj', obj.lat);
		this.setState({
			clickedCoords: [obj.lat, obj.long]
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
				<TripDrawer ref='drawer' />
				<div className='tripWrapper'>
					<div className='listWrapper'>
						<button onClick={this.toggleDrawer}>handle drawers</button>

						{this.state.trips.map(trip => (
							<TripCard
								key={trip.id}
								// ref={[trip.id]}
								trip={trip}
								getTrips={this.getTrips}
								focusMarker={this.FocusMarker}
								// {...this.props}
							/>
						))}
					</div>
					<div className='mapWrapper'>
						<TripMapper
							className='mapper'
							trips={this.state.trips}
							lat={this.state.lat}
							lng={this.state.lng}
							clickedCoords={this.state.clickedCoords}
						/>
						{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
					</div>
				</div>
			</>
		);
	}
}

export default TripList;

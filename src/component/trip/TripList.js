import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import TripMapper from '../map/TripsMap';
import TripCard from './TripCard';
import TripDrawer from './TripDrawer';
import TripForm from './TripForm';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

class TripList extends Component {
	state = {
		trips: [],
		clickedCoords: [],
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
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
		// const { classes } = this.props;
		console.log('state trippin', this.state.trips);
		return (
			<>
				<TripDrawer ref='drawer' />
				<div className='tripWrapper'>
					<div className='listWrapper'>
						<div className='listHeader'>
							<h1>Your Trips</h1>
							<Fab color='primary' size='small' onClick={this.handleClickOpen}>
								<AddIcon />
							</Fab>
						</div>
						<Divider />
						{/* <button onClick={this.toggleDrawer}>handle drawers</button> */}

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

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='form-dialog-title'
				>
					<TripForm getTrips={this.getTrips} />
				</Dialog>
			</>
		);
	}
}

export default TripList;

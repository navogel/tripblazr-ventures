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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import animateScrollTo from 'animated-scroll-to';
import ErrorIcon from '@material-ui/icons/Error';

class TripList extends Component {
	state = {
		trips: [],
		clickedCoords: [],
		open: false,
		newLat: '',
		newLng: '',
		newName: '',
		snackOpen: false
	};

	//drop a pin alert

	handleSnackClick = () => {
		this.setState({ snackOpen: true });
		console.log('snackery');
	};

	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ snackOpen: false });
	};

	//modal open

	handleClickOpen = () => {
		if (this.state.newLat === '') {
			this.handleSnackClick();
		} else {
			this.setState({ open: true });
		}
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	getTrips = () => {
		TripManager.getAllTrips(this.props.activeUser).then(newTrips => {
			this.setState({
				trips: newTrips,
				clickedCoords: []
			});
		});
	};
	//scrolle to hovered marker
	scrollTo = id => {
		let newId = '.scroll' + id;
		let scrollEl = document.querySelector(newId);
		//console.log(scrollEl);
		animateScrollTo(scrollEl, {
			elementToScroll: document.querySelector('.listWrapper')
		});
	};

	toggleDrawer = () => {
		// Access the handleToggle function of the drawer reference
		this.refs.drawer.openDrawer();
	};

	//allows user to click a trip and zoom to its location on the map
	FocusMarker = obj => {
		console.log('obj', obj.lat);
		this.setState({
			clickedCoords: [obj.lat, obj.lng]
		});
	};

	//clear the trip coordinates
	clearClickedCoords = () => {
		this.setState({ clickedCoords: [] });
	};

	//store a marker info for adding to map

	addMarker = obj => {
		console.log('obj from add marker', obj);
		this.setState({
			newName: obj.geocode.name,
			newLat: obj.geocode.center.lat,
			newLng: obj.geocode.center.lng
		});
	};

	componentDidMount() {
		this.getTrips();
		//console.log('trippin', this.state.trips);
	}

	render() {
		// const { classes } = this.props;
		//console.log('clicked cords', this.state.clickedCoords);
		//console.log('new lat', this.state.newLat);
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
							addMarker={this.addMarker}
							clearClickedCoords={this.clearClickedCoords}
							scrollTo={this.scrollTo}
						/>
						{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
					</div>
				</div>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='form-dialog-title'
				>
					<TripForm
						getTrips={this.getTrips}
						newLat={this.state.newLat}
						newLng={this.state.newLng}
						newName={this.state.newName}
						handleClose={this.handleClose}
					/>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left'
					}}
					open={this.state.snackOpen}
					autoHideDuration={5000}
					onClose={this.handleSnackClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					className='snackWarning'
					message={
						<span id='message-id'>
							<IconButton key='close' aria-label='Close' color='inherit'>
								<ErrorIcon />
							</IconButton>
							Type in a location to drop a Pin!
						</span>
					}
					action={[
						<IconButton
							key='close'
							aria-label='Close'
							color='inherit'
							//className={classes.close}
							onClick={this.handleSnackClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</>
		);
	}
}

export default TripList;

import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import TripMapper from './TripsMap';
import TripCard from '../WorldViewComponents/TripCard';
import TripForm from '../WorldViewComponents/TripForm';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import animateScrollTo from 'animated-scroll-to';
import ErrorIcon from '@material-ui/icons/Error';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import TripMenu from '../WorldViewComponents/TripsTypeDropdownMenu';

class TripList extends Component {
	state = {
		trips: [],
		clickedCoords: [],
		open: false,
		newLat: '',
		newLng: '',
		newName: '',
		snackOpen: false,
		hovered: '',
		sharedTrips: [],
		sharedMapTrips: [],
		shareView: false,
		publicView: false
	};

	//logout

	handleLogout = e => {
		this.props.clearUser();
		this.props.history.push('/');
	};

	//drop a pin alert via snacktime

	handleSnackClick = () => {
		this.setState({ snackOpen: true });
		//console.log('snackery');
	};

	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ snackOpen: false });
	};

	//modal open

	handleClickOpen = () => {
		//console.log('clicked open');
		if (
			this.state.newLat === '' ||
			this.state.shareView ||
			this.state.publicView
		) {
			this.handleSnackClick();
		} else {
			this.setState({ open: true });
		}
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	//get all trips

	getTrips = () => {
		TripManager.getAllTrips(this.props.activeUser)
			.then(newTrips => {
				this.setState({
					trips: newTrips,
					clickedCoords: [],
					shareView: false,
					publicView: false
				});
			})
			.then(() => {
				TripManager.getSharedTrips(this.props.email).then(newSharedTrips => {
					//console.log('new shared', newSharedTrips);
					let sharedMapTrips = [];
					newSharedTrips.forEach(trip => {
						sharedMapTrips.push(trip.trip);
						//console.log('trip trip', trip.trip);
					});
					this.setState({
						sharedMapTrips: sharedMapTrips,
						sharedTrips: newSharedTrips
					});
				});
			});
		//this.props.setOwner();
	};

	//scroll to hovered marker, set state for classChange

	scrollTo = id => {
		if (this.state.hovered !== id) {
			this.setState({ hovered: id });
		}
		let newId = '.scroll' + id;
		let scrollEl = document.querySelector(newId);
		animateScrollTo(scrollEl, {
			elementToScroll: document.querySelector('.listWrapper'),
			verticalOffset: -20
		});
	};

	hoverRemoveFocus = () => {
		this.setState({ hovered: '' });
	};

	//allows user to click a trip and zoom to its location on the map
	clickedCardItem = obj => {
		//console.log('obj', obj.lat);
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
		//console.log('obj from add marker', obj);
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

	//toggle Views

	shareView = () => {
		this.setState({
			shareView: true,
			publicView: false
		});
		//console.log('ref', this.refs);
	};

	getPublicTrips = () => {
		TripManager.getAllPublicTrips().then(newTrips => {
			//this.props.removeOwner();
			this.setState({
				trips: newTrips,
				clickedCoords: [],
				publicView: true,
				shareView: false
			});
		});
		//this.refs.map.resetMap();
	};

	render() {
		//console.log('clicked cords', this.state.clickedCoords);
		//console.log('shared trippin', this.state.sharedMapTrips);
		return (
			<>
				<div className='tripWrapper'>
					<div className='leftColumn'>
						<div className='listHeader'>
							<div className='listHeaderName'>
								<IconButton size='small' onClick={this.handleLogout}>
									<TransitEnterexitIcon />
								</IconButton>
								<h1>Your Trips</h1>
								<Fab
									color='secondary'
									size='small'
									onClick={this.handleClickOpen}
									className='addTripBtn'
								>
									<AddIcon />
								</Fab>
							</div>
							<div className='shareToggle'>
								<TripMenu
									shareView={this.shareView}
									getPublicTrips={this.getPublicTrips}
									getTrips={this.getTrips}
								/>
							</div>
						</div>

						<Divider />

						{this.state.shareView ? (
							<div className='listWrapper'>
								{/* <button onClick={this.toggleDrawer}>handle drawers</button> */}

								{this.state.sharedTrips.map(trip => (
									<TripCard
										key={trip.trip.id}
										// ref={[trip.id]}
										trip={trip.trip}
										getTrips={this.getTrips}
										clickedCardItem={this.clickedCardItem}
										hovered={this.state.hovered}
										name={trip.user.userName}
										handleClickOpen={this.handleClickOpen}
										// {...this.props}
									/>
								))}
							</div>
						) : (
							<div className='listWrapper'>
								{/* <button onClick={this.toggleDrawer}>handle drawers</button> */}

								{this.state.trips.map(trip => (
									<TripCard
										key={trip.id}
										// ref={[trip.id]}
										trip={trip}
										getTrips={this.getTrips}
										clickedCardItem={this.clickedCardItem}
										hovered={this.state.hovered}
										publicView={this.state.publicView}

										// {...this.props}
									/>
								))}
							</div>
						)}
					</div>
					{this.state.shareView ? (
						<div className='mapWrapper'>
							<TripMapper
								//ref='mapShare'
								className='mapper'
								trips={this.state.sharedMapTrips}
								lat={this.state.lat}
								lng={this.state.lng}
								clickedCoords={this.state.clickedCoords}
								addMarker={this.addMarker}
								clearClickedCoords={this.clearClickedCoords}
								scrollTo={this.scrollTo}
								// hoverFocus={this.hoverFocus}
								hovered={this.state.hovered}
								hoverRemoveFocus={this.hoverRemoveFocus}
								handleClickOpen={this.handleClickOpen}
								shareView={this.state.shareView}
								publicView={this.state.publicView}
								{...this.props}
							/>
							{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
						</div>
					) : (
						<div className='mapWrapper'>
							<TripMapper
								//ref='map'
								className='mapper'
								trips={this.state.trips}
								lat={this.state.lat}
								lng={this.state.lng}
								clickedCoords={this.state.clickedCoords}
								addMarker={this.addMarker}
								clearClickedCoords={this.clearClickedCoords}
								scrollTo={this.scrollTo}
								// hoverFocus={this.hoverFocus}
								hovered={this.state.hovered}
								hoverRemoveFocus={this.hoverRemoveFocus}
								handleClickOpen={this.handleClickOpen}
								shareView={this.state.shareView}
								publicView={this.state.publicView}
								{...this.props}
							/>
							{/* <Mapper2 className='mapWrapper' props={this.state.locations} /> */}
						</div>
					)}
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
						activeUser={this.props.activeUser}
					/>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left'
					}}
					open={this.state.snackOpen}
					autoHideDuration={10000}
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
							<b>
								To create a new trip, type in a location to drop a pin. Make
								sure you have selected "Trips I Own" below!
							</b>
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

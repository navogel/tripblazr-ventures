import React, { Component } from 'react';
import Mapper from '../map/LocationsMap';
import TripManager from '../../modules/TripManager';
import { withRouter } from 'react-router-dom';
import LocationCard from './LocationCard';
import animateScrollTo from 'animated-scroll-to';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import LocationForm from '../trip/LocationForm';
import AddIcon from '@material-ui/icons/Add';

class Trip extends Component {
	state = {
		locations: [],
		tripDetails: {},
		clickedCoords: [],
		droppedPin: false,
		hovered: '',
		open: false,
		snackOpen: false,
		geoMarker: {}
	};

	//drop a pin alert via snacktime

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

	//go back to my trips

	switchTrip = () => {
		this.props.history.push(`/mytrips`);
	};

	//filter by type

	filterType = id => {
		TripManager.getTripByType(this.props.tripId, id).then(locations => {
			this.setState({
				locations: locations,
				clickedCoords: [],
				droppedPin: false
			});
		});
	};

	//clear clicked coordinates

	clearCoords = () => {
		this.setState({ clickedCoords: [] });
	};

	//drop a pin on the map

	dropPin = () => {
		this.setState({ droppedPin: true, clickedCoords: [] });
	};

	//scroll to hovered marker

	scrollTo = id => {
		if (this.state.clickedCoords) {
			this.clearCoords();
		}
		let newId = '.scroll' + id;
		let scrollEl = document.querySelector(newId);
		//console.log(scrollEl);
		animateScrollTo(scrollEl, {
			elementToScroll: document.querySelector('.listWrapper'),
			verticalOffset: -20,
			maxDuration: 1000,
			minDuration: 100,
			speed: 1000,
			cancelOnUserAction: true
		});
		if (this.state.hovered !== id) {
			this.setState({ hovered: id });
		}
	};

	//deprecated (speed slowdown) function to remove class on mouseout

	hoverRemoveFocus = () => {
		this.setState({ hovered: '' });
	};

	//zoom to marker when clicking on a location list item

	FocusMarker = obj => {
		this.setState({
			clickedCoords: [obj.lat, obj.lng],
			droppedPin: false
		});
	};

	//fetch trip locations and trip details

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
		this.setState({
			geoMarker: {}
		});
	};

	componentDidMount() {
		// console.log('props from tripcard', this.props);

		this.getData();
	}

	//when marker is clicked add obj to state

	addGeoSearchMarker = obj => {
		console.log('obj from add marker', obj);
		this.setState({
			geoMarker: obj
		});
		this.handleClickOpen();
	};

	render() {
		//console.log('trip geo searhc marker', this.state.geoMarker);
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
							{/* <Fab color='primary' size='small' onClick={this.handleClickOpen}>
								<AddIcon />
							</Fab> */}
						</div>
						<div className='listWrapper'>
							{this.state.locations.map(location => (
								<LocationCard
									key={location.id}
									location={location}
									getData={this.getData}
									focusMarker={this.FocusMarker}
									hovered={this.state.hovered}
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
								hovered={this.state.hovered}
								hoverRemoveFocus={this.hoverRemoveFocus}
								addGeoSearchMarker={this.addGeoSearchMarker}
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
					<LocationForm
						getData={this.getData}
						geoMarker={this.state.geoMarker}
						handleClose={this.handleClose}
						activeUser={this.props.activeUser}
						tripDetails={this.state.tripDetails}
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
							Type in a location to drop a Pin, or click on a pin!
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

export default withRouter(Trip);

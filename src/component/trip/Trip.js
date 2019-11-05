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
import TripDrawer from './TripDrawer';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import HotelIcon from '@material-ui/icons/Hotel';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CommuteIcon from '@material-ui/icons/Commute';
import FacebookIcon from '@material-ui/icons/Facebook';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import HeightIcon from '@material-ui/icons/Height';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';

class Trip extends Component {
	state = {
		locations: [],
		tripDetails: {},

		// list item is clicked, map zooms and moves to that point. prevent fitBounds
		clickedCoords: [],

		//reverse geocoding listener when map is clicked map moves to that point, prevent fitBounds
		droppedPin: false,

		//marker ID is hovered -> list view scrolls and highlights
		hovered: '',

		//object set for adding or editing
		geoMarker: {},

		//modals/drawer/snacks
		open: false,
		openEdit: false,
		snackOpen: false,
		menuOpen: true,

		lastFilter: ''
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

	//modal open NEW LOCATION

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

	//drawer for viewing and editing

	toggleDrawer = obj => {
		// Access the handleToggle function of the drawer reference
		//onClick={this.toggleDrawer('right', true)
		this.refs.drawer.openDrawer(obj);
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
				droppedPin: false,
				lastFilter: id
			});
			this.refs.mapper.resetScroll();
			console.log(this.state.lastFilter);
		});
	};

	//filter by starred
	// filterByStar = () => {
	// 	let newLocations = [];
	// 	this.state.locations.forEach(location => {
	// 		if (location.star === true) {
	// 			newLocations.push(location);
	// 		}
	// 	});
	// 	this.setState({ locations: newLocations });
	// };

	//or

	filterByStar = () => {
		TripManager.getStarTrip(this.props.tripId).then(locations => {
			this.setState({
				locations: locations,
				clickedCoords: [],
				lastFilter: 'star'
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
		if (this.state.hovered !== id) {
			this.setState({ hovered: id });
			//console.log('set state hovered: id');
		}
		//console.log(scrollEl);
		animateScrollTo(scrollEl, {
			elementToScroll: document.querySelector('.listWrapper'),
			verticalOffset: -10,
			maxDuration: 3000,
			minDuration: 250,
			speed: 500,
			cancelOnUserAction: true
		});
	};

	//deprecated (speed slowdown) function to remove class on mouseout

	hoverRemoveFocus = () => {
		this.setState({ hovered: '' });
	};

	//zoom to marker when clicking on a location list item

	clickedCardItem = obj => {
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
			geoMarker: {},
			lastFilter: ''
		});
		this.refs.mapper.resetScroll();
	};

	// getDataLite = () => {
	// 	TripManager.getTrip(this.props.tripId).then(locations => {
	// 		this.setState({
	// 			locations: locations,
	// 			clickedCoords: []
	// 		});
	// 	});
	// 	this.setState({
	// 		geoMarker: {}
	// 	});
	// };

	//alternative to getDataLite(reserve last search)

	getDataLite = () => {
		if (this.state.lastFilter === 'star') {
			TripManager.getStarTrip(this.props.tripId).then(locations => {
				this.setState({
					locations: locations,
					clickedCoords: []
				});
			});
		} else if (
			this.state.lastFilter === 1 ||
			this.state.lastFilter === 2 ||
			this.state.lastFilter === 3 ||
			this.state.lastFilter === 4
		) {
			TripManager.getTripByType(this.props.tripId, this.state.lastFilter).then(
				locations => {
					console.log('refresh lite by type', this.state.lastFilter);
					this.setState({
						locations: locations,
						clickedCoords: [],
						droppedPin: false
					});
					//this.refs.mapper.resetScroll();
				}
			);
		} else {
			TripManager.getTrip(this.props.tripId).then(locations => {
				this.setState({
					locations: locations,
					clickedCoords: []
				});
			});
		}
		this.setState({
			geoMarker: {}
		});
	};

	//Get data and remove all maping states -> clean tripview of all locations

	mapRefresh = () => {
		this.getData();
		this.setState({
			geoMarker: {},
			clickedCoords: [],
			hovered: ''
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

	toggleMenu = () => {
		if (this.state.menuOpen === true) {
			this.setState({ menuOpen: false });
		} else {
			this.setState({ menuOpen: true });
		}
	};

	render() {
		//console.log('trip geo searhc marker', this.state.geoMarker);
		let tripCost = 0;

		this.state.locations.forEach(location => {
			//console.log(parsed);
			if (location.price === null) {
				//console.log(location.price);
			} else {
				tripCost += parseInt(location.price);
			}
		});

		return (
			<>
				<div className='tripWrapper'>
					<TripDrawer ref='drawer' getData={this.getDataLite} />
					<div className='leftColumn'>
						<div className='listHeader'>
							{this.state.menuOpen && (
								<div className='tripHeader'>
									<h1>
										<Tooltip title='back to trips'>
											<IconButton onClick={this.switchTrip}>
												<TransitEnterexitIcon />
											</IconButton>
										</Tooltip>
										{this.state.tripDetails.name}
									</h1>
									<h4>{this.state.tripDetails.city}</h4>
									<h4>Estimated Trip Price: ${tripCost}</h4>
								</div>
							)}
							<div className='tripButtons'>
								<Tooltip title='filter stars'>
									<IconButton onClick={e => this.filterByStar()}>
										<StarIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title='filter lodging'>
									<IconButton onClick={e => this.filterType(1)}>
										<HotelIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title='filter activities'>
									<IconButton onClick={e => this.filterType(2)}>
										<DirectionsWalkIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title='filter food'>
									<IconButton onClick={e => this.filterType(3)}>
										<FastfoodIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title='filter transportation'>
									<IconButton onClick={e => this.filterType(4)}>
										<CommuteIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title='reset filters'>
									<IconButton onClick={e => this.getData()}>
										<RotateLeftIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title='toggle trip view'>
									<IconButton onClick={e => this.toggleMenu()}>
										<HeightIcon />
									</IconButton>
								</Tooltip>
								<Divider />
							</div>
						</div>
						<div className='listWrapper'>
							{this.state.locations.map(location => (
								<LocationCard
									key={location.id}
									location={location}
									getData={this.getDataLite}
									clickedCardItem={this.clickedCardItem}
									hovered={this.state.hovered}
									toggleDrawer={this.toggleDrawer}
									filterByStar={this.filterByStar}
									//{...this.props}
								/>
							))}
						</div>
					</div>
					{this.state.tripDetails && (
						<div className='mapWrapper'>
							<Mapper
								ref='mapper'
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
						getData={this.getDataLite}
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

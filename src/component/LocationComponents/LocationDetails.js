import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import LocationNotes from './LocationNotes';
import TripManager from '../../modules/TripManager';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

class LocationDetail extends Component {
	state = {
		location: {},
		myTrips: [],
		tripId: '',
		loaded: false,
		loadingStatus: false,
		tripLikes: 0
	};

	switchToEdit = location => {
		this.props.toggleDrawer(location);
		this.props.closeLocDrawer();
	};

	addLocation = () => {
		if (this.state.tripId === '') {
			alert('oops, you have to pick a trip first');
		} else {
			this.setState({ loadingStatus: true });
			let newLoc = {
				tripId: this.state.tripId,
				summary: this.props.location.summary,
				lat: this.props.location.lat,
				lng: this.props.location.lng,
				address: this.props.location.address,
				price: this.props.location.price,
				likes: 0,
				locationTypeId: this.props.location.locationTypeId,
				name: this.props.location.name,
				url: this.props.location.url,
				star: false
			};
			let updatedTrip = {
				id: this.props.tripId,
				likes: this.state.tripLikes + 1
			};
			TripManager.updateTrip(updatedTrip).then(() => {
				TripManager.postLocation(newLoc).then(data => {
					this.setState({ tripId: '' });
					let locationId = data.id;
					if (this.props.location.locationNotes.length > 0) {
						let noteArray = [];
						this.props.location.locationNotes.forEach(note => {
							let newNote = {
								locationId: locationId,
								date: note.date,
								note: note.note,
								userId: this.props.activeUser,
								editTimeStamp: note.editTimeStamp,
								title: note.title,
								type: note.type
							};
							noteArray.push(newNote);
						});
						//function to set delay in our notes posts to not break json server
						let i = 0;
						function myLoop() {
							setTimeout(function() {
								TripManager.postLocationNote(noteArray[i]).then(data =>
									console.log(data)
								);
								i++;
								if (i < noteArray.length) {
									myLoop();
								}
							}, 3000);
						}
						myLoop();
						this.setState({ loadingStatus: false });
					}
				});
			});
		}
	};
	// TripManager.postLocationNote(newNote);
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	componentDidMount() {
		TripManager.getAllTrips(this.props.activeUser).then(data => {
			TripManager.getTripDetails(this.props.tripId).then(trip => {
				console.log('mount', trip);
				this.setState({
					location: this.props.location,
					loaded: true,
					myTrips: data,
					tripLikes: trip[0].likes
				});
			});
		});

		//console.log('all props', this.props);
	}

	render() {
		// let siteLink = 'https://';
		console.log('deets props', this.props.tripId);

		return (
			<>
				{this.state.loaded && (
					<div className='locDetailsWrapper'>
						<div className='absoluteCloseFab'>
							<Fab
								color='primary'
								size='small'
								onClick={e => this.props.closeLocDrawer()}
							>
								<CloseIcon />
							</Fab>
						</div>
						<div className='locCard'>
							<DialogTitle className='modalTitle'>
								{this.state.location.name} {' - '}
								{this.state.location.locationType.locationType}
							</DialogTitle>
							{this.state.location.address && (
								<p className='address'>
									<b>Address:</b>
									{this.state.location.address}
								</p>
							)}
							{this.state.location.summary && (
								<>
									<h3>Description:</h3> <p>{this.state.location.summary}</p>
								</>
							)}
							{this.state.location.url && (
								<h3 className='urlLink'>
									<a
										href={this.state.location.url}
										rel='noopener noreferrer'
										target='_blank'
									>
										{this.state.location.url}
									</a>
								</h3>
							)}

							{this.state.location.price && (
								<h3>Est Price: ${this.state.location.price}</h3>
							)}
							{!this.props.publicTrip && (
								<Button
									size='small'
									color='primary'
									onClick={() => this.switchToEdit(this.state.location)}
								>
									edit details
								</Button>
							)}
						</div>
						{this.props.publicTrip && (
							<>
								<div className='locAdd'>
									<FormControl>
										<InputLabel>
											Add this location to a Trip!
										</InputLabel>
										<NativeSelect
											value={this.state.tripId}
											onChange={this.handleChange('tripId')}
											inputProps={{
												name: 'tripId',
												id: 'tripId'
											}}
										>
											<option value='' />
											{this.state.myTrips.map(trip => (
												<option key={trip.id} value={trip.id}>
													{trip.name}
													{' - '}
													{trip.city}
												</option>
											))}
										</NativeSelect>
										<FormHelperText>Choose a trip</FormHelperText>
									</FormControl>
									<Button
										size='small'
										color='primary'
										onClick={() => this.addLocation()}
										disabled={this.state.loadingStatus}
									>
										add location
									</Button>
								</div>
							</>
						)}

						{/* <Fab
					variant='extended'
					size='small'
					color='primary'
					onClick={() => this.switchToEdit(this.props.location)}
				>
					<EditIcon />
					Edit
				</Fab> */}

						<LocationNotes
							activeUser={this.props.activeUser}
							locationId={this.state.location.id}
							publicTrip={this.props.publicTrip}
						/>
					</div>
				)}
			</>
		);
	}
}

export default LocationDetail;

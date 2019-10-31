import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';

//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './tripForm.css';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	},
	extendedIcon: {
		marginRight: theme.spacing(1)
	}
});
class LocationForm extends Component {
	state = {
		tripId: this.props.tripDetails.id,
		summary: '',
		lat: this.props.geoMarker.center.lat,
		lng: this.props.geoMarker.center.lng,
		address: this.props.geoMarker.name.split(/,(.+)/)[1],
		price: '',
		likes: '',
		locationTypeId: '',
		name: this.props.geoMarker.properties.text,
		visited: false,
		loadingStatus: false
		// imageLink: ''
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	/*  Local method for validation, set loadingStatus, create animal object, invoke the AnimalManager post method, and redirect to the full animal list
	 */
	constructNewLocation = evt => {
		evt.preventDefault();
		if (this.state.tripName === '' || this.state.city === '') {
			window.alert('Please input an trip destination and name');
		} else {
			this.setState({ loadingStatus: true });
			const trip = {
				tripId: '',
				summary: '',
				lat: '',
				lng: '',
				address: '',
				price: '',
				likes: '',
				locationTypeId: '',
				name: '',
				visited: false
			};

			// Create the animal and redirect user to animal list
			this.props.handleClose();
			TripManager.postTrip(trip).then(() => {
				console.log('addform props', this.props);
				this.props.getTrips();
			});
		}
	};

	render() {
		const { classes } = this.props;
		console.log('props location add', this.props);
		return (
			<>
				<form className={classes.container} noValidate autoComplete='off'>
					<div className='formWrapper'>
						<DialogTitle className='modalTitle'>
							{'Lets get this trip started.'}
						</DialogTitle>
						<div className='inputWrapper'>
							<div className='nameCity'>
								<TextField
									id='address'
									label='Address'
									className={classes.textField}
									value={this.state.address}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Got an address?'
								/>
								<TextField
									id='tripName'
									label='Name'
									className={classes.textField}
									value={this.state.name}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Enter the place name'
								/>
							</div>
							{/* <div className='tripDescription'>
								<TextField
									id='summary'
									label='Description'
									className={classes.textField}
									value={this.state.summary}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Whats going on there?'
									multiline
									rows=''
								/>
							</div> */}
							{/* <div className='tripNotes'>
								<TextField
									id='communication'
									label='Communication Notes'
									className={classes.textField}
									value={this.state.communication}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Will your phone work?'
									multiline
									rows='2'
								/>
								<TextField
									id='money'
									label='Money Notes'
									className={classes.textField}
									value={this.state.money}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Do you need to exchange money?'
									multiline
									rows='2'
								/>
							</div> */}
						</div>

						{/* <button
						type='button'
						disabled={this.state.loadingStatus}
						onClick={this.constructNewTrip}
					>
						Submit
                    </button> */}
						<div className='formSubmit'>
							<Fab
								variant='extended'
								size='small'
								color='primary'
								aria-label='submit'
								className={classes.margin}
								disabled={this.state.loadingStatus}
								onClick={this.constructNewTrip}
							>
								<AddIcon className={classes.extendedIcon} />
								Submit
							</Fab>
						</div>
					</div>
				</form>
			</>
		);
	}
}

export default withStyles(styles)(LocationForm);

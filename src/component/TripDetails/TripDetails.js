import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../trip/tripForm.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
class TripDetails extends Component {
	state = {
		tripShares: [],
		email: '',
		loadingStatus: false,
		public: false
		// imageLink: ''
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	handleDelete = id => {
		TripManager.deleteTripShare(id).then(() => this.getShares());
	};

	/*  Local method for validation, set loadingStatus, create animal object, invoke the AnimalManager post method, and redirect to the full animal list
	 */
	constructNewTripShare = evt => {
		evt.preventDefault();
		if (this.state.email === '') {
			window.alert('Please input an email to share this trip');
		} else {
			this.setState({ loadingStatus: true });
			const share = {
				email: this.state.email,
				userId: this.props.activeUser,
				tripId: this.props.tripId
			};

			// Create the animal and redirect user to animal list

			TripManager.postTripShare(share).then(() => {
				//console.log('addform props', this.props);
				TripManager.getTripsShares(this.props.tripId).then(data => {
					this.setState({
						tripShares: data,
						loadingStatus: false,
						email: ''
					});
				});
			});
		}
	};

	getShares = () => {
		TripManager.getTripsShares(this.props.tripId).then(data => {
			this.setState({
				tripShares: data
			});
		});
	};

	componentDidMount() {
		this.getShares();
	}

	render() {
		const { classes } = this.props;
		return (
			<>
				<div className='tripDetailsWrapper'>
					<div className='formWrapperTrip'>
						<DialogTitle className='modalTitle'>
							{'Make this trip a collab.'}
						</DialogTitle>
						<div className='tripShareInput'>
							<div className='nameCity'>
								<TextField
									id='email'
									label='email'
									className={classes.textField}
									value={this.state.email}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Be careful, they will get full access!!!'
								/>
							</div>

							{/* <button
						type='button'
						disabled={this.state.loadingStatus}
						onClick={this.props.handleClose()}
					>
						Submit
                    </button> */}

							<Fab
								variant='extended'
								size='small'
								color='primary'
								aria-label='submit'
								className={classes.margin}
								disabled={this.state.loadingStatus}
								onClick={this.constructNewTripShare}
							>
								<AddIcon className={classes.extendedIcon} />
								Submit
							</Fab>
						</div>
					</div>

					{this.state.tripShares.map(share => (
						<div key={share.id} className='tripShare'>
							<p>{share.email}</p>
							<IconButton onClick={e => this.handleDelete(share.id)}>
								<DeleteIcon />
							</IconButton>
						</div>
					))}
				</div>
			</>
		);
	}
}

export default withStyles(styles)(TripDetails);

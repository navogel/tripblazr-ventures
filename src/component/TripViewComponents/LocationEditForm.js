import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactDOM from 'react-dom';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../WorldViewComponents/tripForm.css';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';

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
		width: 400
	},
	extendedIcon: {
		marginRight: theme.spacing(1)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200
	}
});
class LocationEditForm extends Component {
	state = {
		tripId: '',
		summary: '',
		lat: '',
		lng: '',
		address: '',
		price: '',
		likes: '',
		locationTypeId: '',
		name: '',
		star: '',
		url: '',
		loadingStatus: false,
		id: '',
		labelWidth: 0
		// imageLink: ''
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	updateLocation = evt => {
		evt.preventDefault();
		if (this.state.name === '' || this.state.locationTypeId === '') {
			window.alert(
				'Well this is awkward...  you have to enter a name and type.'
			);
		} else if (isNaN(this.state.price)) {
			window.alert(
				'Well this is awkward... you need to enter numbers for the cost... youll thank us later.'
			);
		} else {
			this.setState({ loadingStatus: true });
			const location = {
				tripId: this.state.tripId,
				summary: this.state.summary,
				lat: this.state.lat,
				lng: this.state.lng,
				address: this.state.address,
				price: parseFloat(this.state.price),
				likes: parseInt(this.state.likes),
				locationTypeId: parseInt(this.state.locationTypeId),
				name: this.state.name,
				url: this.state.url,
				star: this.state.star,
				id: this.state.id
			};

			TripManager.updateLocation(location).then(() => {
				this.props.getData();
				this.props.closeDrawer();
				this.setState({ loadingStatus: false });
			});
		}
	};
	componentDidMount() {
		this.setState({
			labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
			tripId: this.props.location.tripId,
			summary: this.props.location.summary,
			lat: this.props.location.lat,
			lng: this.props.location.lng,
			address: this.props.location.address,
			price: this.props.location.price,
			likes: this.props.location.likes,
			locationTypeId: this.props.location.locationTypeId,
			name: this.props.location.name,
			url: this.props.location.url,
			star: this.props.location.star,
			id: this.props.location.id
		});
		//console.log('location form props', this.props);
	}

	render() {
		const { classes } = this.props;
		//console.log('state', this.state.locationTypeId);
		return (
			<>
				<form className={classes.container} noValidate autoComplete='off'>
					<div className='formWrapper'>
						<div className='absoluteCloseFab'>
							<Fab
								color='primary'
								size='small'
								onClick={e => this.props.closeDrawer()}
							>
								<CloseIcon />
							</Fab>
						</div>
						{/* <Fab
								
								size='small'
								color='secondary'
								aria-label='star'
								className={classes.margin}
								onClick={e => this.addStar}
							>
								<StarIcon className={classes.extendedIcon} />
								
						</Fab> */}
						<DialogTitle className='modalTitle'>
							{'Time to get your edit on.'}
						</DialogTitle>
						<div className='LocationInputWrapper'>
							<TextField
								id='name'
								label='Name'
								className={classes.textField}
								value={this.state.name}
								onChange={this.handleFieldChange}
								margin='dense'
								variant='outlined'
								placeholder='Enter the place name'
							/>

							<FormControl
								variant='outlined'
								margin='dense'
								className={classes.formControl}
							>
								<InputLabel
									ref={ref => {
										this.InputLabelRef = ref;
									}}
									htmlFor='outlined-type-native-simple'
								>
									Type
								</InputLabel>
								<NativeSelect
									value={this.state.locationTypeId}
									onChange={this.handleChange('locationTypeId')}
									input={
										<OutlinedInput
											name='type'
											labelWidth={this.state.labelWidth}
											id='locationTypeId'
										/>
									}
								>
									<option value='' />
									<option value={1}>Lodging</option>
									<option value={2}>Activity</option>
									<option value={3}>Food</option>
									<option value={4}>Transportation</option>
								</NativeSelect>
							</FormControl>
							<div className='midFormText'>
								<p> Optional:</p>
							</div>

							<TextField
								id='address'
								label='Address'
								className={classes.textField}
								value={this.state.address || ''}
								onChange={this.handleFieldChange}
								margin='dense'
								variant='outlined'
								placeholder='Got an address?'
							/>
							<TextField
								id='summary'
								label='Description'
								className={classes.textField}
								value={this.state.summary || ''}
								onChange={this.handleFieldChange}
								margin='dense'
								variant='outlined'
								placeholder='What kind of place is this?'
								multiline
								rows=''
							/>
							<TextField
								id='url'
								label='URL'
								className={classes.textField}
								value={this.state.url || ''}
								onChange={this.handleFieldChange}
								margin='dense'
								variant='outlined'
								placeholder='Enter a link to the source'
							/>
							<TextField
								id='price'
								label='Cost'
								className={classes.textField}
								value={this.state.price || ''}
								onChange={this.handleFieldChange}
								margin='dense'
								variant='outlined'
								placeholder='Estimate your costs'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>$</InputAdornment>
									)
								}}
							/>
						</div>
						<div className='formSubmitEdit'>
							<Fab
								variant='extended'
								size='small'
								color='primary'
								aria-label='submit'
								className={classes.margin}
								disabled={this.state.loadingStatus}
								onClick={this.updateLocation}
							>
								<AddIcon className={classes.extendedIcon} />
								Update
							</Fab>
						</div>
					</div>
				</form>
			</>
		);
	}
}

export default withStyles(styles)(LocationEditForm);

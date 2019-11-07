import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactDOM from 'react-dom';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import './tripForm.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';

import moment from 'moment';

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
		//margin: theme.spacing(1),
		minWidth: 200
	}
});

class NoteEditForm extends React.Component {
	state = {
		date: '',
		note: '',
		loadingStatus: false,
		editTimeStamp: '',
		type: '',
		title: '',
		labelWidth: 0
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	updateExistingNote = () => {
		//evt.preventDefault()
		this.setState({ loadingStatus: true });
		const editedNote = {
			userId: this.props.activeUser,
			date: this.state.date,
			note: this.state.note,
			editTimeStamp: moment(new Date()),
			id: this.props.note.id,
			title: this.state.title,
			type: this.state.type
		};

		TripManager.updateLocationNote(editedNote)
			.then(this.props.getNotes)
			.then(this.setState({ loadingstatus: false }));
		this.props.handleClose();
	};

	componentDidMount() {
		TripManager.getLocationNote(this.props.note.id).then(note => {
			this.setState({
				userId: this.props.activeUser,
				date: note.date,
				note: note.note,
				loadingStatus: false,
				type: note.type,
				title: note.title
			});
		});
	}

	// handleClick = evt => {
	// 	evt.preventDefault();
	// 	this.updateExistingMessage();
	// 	this.onClose();

	// };

	render() {
		const { classes } = this.props;
		return (
			<div className='msgSubmitRow'>
				<div className='formField'>
					<TextField
						fullWidth
						id='title'
						label='Optional Title'
						value={this.state.title}
						onChange={this.handleFieldChange}
						margin='dense'
						variant='outlined'
						placeholder='Optional Title'
					/>
					<TextField
						fullWidth
						id='note'
						label='add a travel note, URL link, or Youtube video ID'
						value={this.state.note}
						onChange={this.handleFieldChange}
						margin='dense'
						variant='outlined'
						placeholder='Add note'
					/>
				</div>
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
						Note Type
					</InputLabel>
					<NativeSelect
						value={this.state.type}
						onChange={this.handleChange('type')}
						input={
							<OutlinedInput
								name='type'
								labelWidth={this.state.labelWidth}
								id='type'
							/>
						}
					>
						<option value={'note'}>{'Travel Note '}</option>
						<option value={'url'}>{'Link '}</option>
						<option value={'YT'}>{'YouTube Id '}</option>
					</NativeSelect>
				</FormControl>

				<div className='noteSubmit'>
					<Fab
						variant='extended'
						size='small'
						color='primary'
						aria-label='submit'
						disabled={this.state.loadingStatus}
						onClick={this.updateExistingNote}
					>
						<AddIcon />
						Submit
					</Fab>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(NoteEditForm);

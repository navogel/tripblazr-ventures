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

class AddNoteForm extends React.Component {
	state = {
		// visible: false,
		//locationId: '',
		date: '',
		note: '',
		loadingStatus: false,
		editTimeStamp: ''
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	addNewNote = () => {
		// evt.preventDefault();
		this.setState({ loadingStatus: true });
		if (this.state.message === '') {
			window.alert('Please fill out all the fields');
		} else {
			let userId = this.props.activeUser;
			const message = {
				locationId: this.props.locationId,
				date: moment(new Date()),
				note: this.state.note,
				userId: userId,
				editTimeStamp: ''
			};
			TripManager.postLocationNote(message)
				.then(this.props.getNotes)
				.then(
					this.setState({
						date: '',
						note: '',
						loadingStatus: false,
						editTimeStamp: ''
					})
				);
			this.props.closeNewNote();
		}
	};

	// updateExistingMessage = evt => {
	// 	//evt.preventDefault()
	// 	this.setState({ loadingStatus: true });
	// 	const editedMessage = {
	// 		userId: this.state.userId,
	// 		date: this.state.date,
	// 		message: this.state.message,
	// 		editTimeStamp: moment(new Date()),
	// 		id: this.props.id
	// 	};

	// 	MessagesManager.update(editedMessage)
	// 		.then(this.props.getData)
	// 		.then(this.setState({ loadingStatus: false }));
	// };

	handleClick = evt => {
		evt.preventDefault();
		this.addNewMessage();
		this.onClose();
		document.querySelector('#note').value = '';
	};

	render() {
		return (
			<div className='msgSubmitRow'>
				<div className='formField'>
					<TextField
						fullWidth
						id='note'
						label='note'
						value={this.state.name}
						onChange={this.handleFieldChange}
						margin='dense'
						variant='outlined'
						placeholder='Add a travel note'
					/>
				</div>

				<div className='noteSubmit'>
					<Fab
						variant='extended'
						size='small'
						color='primary'
						aria-label='submit'
						disabled={this.state.loadingStatus}
						onClick={this.addNewNote}
					>
						<AddIcon />
						Submit
					</Fab>
				</div>
			</div>
		);
	}
}

export default AddNoteForm;

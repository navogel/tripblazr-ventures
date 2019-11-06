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
import './tripForm.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';

import moment from 'moment';

class AddMessageForm extends React.Component {
	state = {
		visible: false,
		locationId: '',
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

	addNewMessage = () => {
		// evt.preventDefault();
		this.setState({ loadingStatus: true });
		if (this.state.message === '') {
			window.alert('Please fill out all the fields');
		} else {
			let userId = parseInt(sessionStorage.getItem('activeUser'));
			const message = {
				date: moment(new Date()),
				message: this.state.message,
				userId: userId,
				editTimeStamp: ''
			};
			MessagesManager.post(message)
				.then(this.props.getData)
				.then(this.setState({ loadingStatus: false }));
		}
	};

	updateExistingMessage = evt => {
		//evt.preventDefault()
		this.setState({ loadingStatus: true });
		const editedMessage = {
			userId: this.state.userId,
			date: this.state.date,
			message: this.state.message,
			editTimeStamp: moment(new Date()),
			id: this.props.id
		};

		MessagesManager.update(editedMessage)
			.then(this.props.getData)
			.then(this.setState({ loadingStatus: false }));
	};

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
						id='note'
						label='note'
						className={classes.textField}
						value={this.state.name}
						onChange={this.handleFieldChange}
						margin='dense'
						variant='outlined'
						placeholder='Add a note'
					/>
				</div>

				<div className='formField'>
					<Button
						className='login-form-button'
						type='primary'
						disabled={this.state.loadingStatus}
						onClick={this.handleClick}
						icon='add'
					>
						Submit
					</Button>
				</div>
			</div>
		);
	}
}

export default AddMessageForm;

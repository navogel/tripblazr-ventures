import React, { Component } from 'react';
import AuthManager from '../../modules/AuthManager';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

class Registration extends Component {
	// Set initial state
	state = {
		regUserName: '',
		regPassword: '',
		regPasswordConfirm: '',
		regEmail: ''
	};

	// Update state whenever an input field is edited
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	handleRegistration = e => {
		e.preventDefault();
		let userName = this.state.regUserName;
		let password = this.state.regPassword;
		let passwordConfirm = this.state.regPasswordConfirm;
		let email = this.state.regEmail;
		// starting the if statement
		if (password !== passwordConfirm) {
			// if pass isn't equal to passConfirm
			alert('Please make sure  use the same password');
			// if both password fields are empty
		} else if (password === '' || passwordConfirm === '') {
			alert('Please fill the Password Form');
		} else if (userName === '' || email === '') {
			alert('Please enter a valid user name and password');
		} else {
			const newUser = {
				userName: userName,
				password: password,
				email: email
			};

			AuthManager.createUser(newUser).then(response => {
				this.props.setUser(response);
				this.props.history.push(`/mytrips`);
			});
		}
	};

	render() {
		return (
			<>
				<form
					onSubmit={this.handleRegistration}
					id='loginForm'
					className='login-form'
				>
					<div className='regField'>
						<TextField
							fullWidth
							margin='dense'
							variant='outlined'
							//placeholder='Username'
							onChange={this.handleFieldChange}
							type='userName'
							id='regUserName'
							//required=''
							//autoFocus=''
							label='user name'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<AccountCircle />
									</InputAdornment>
								)
							}}
						/>

						<TextField
							fullWidth
							margin='dense'
							variant='outlined'
							type='password'
							//placeholder='Password'
							onChange={this.handleFieldChange}
							id='regPassword'
							//required=''
							//autoFocus=''
							label='password'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockIcon />
									</InputAdornment>
								)
							}}
						/>
					</div>
					<div className='regField'>
						<TextField
							fullWidth
							margin='dense'
							variant='outlined'
							//placeholder='Username'
							onChange={this.handleFieldChange}
							type='email'
							id='regEmail'
							//required=''
							//autoFocus=''
							label='email'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<EmailIcon />
									</InputAdornment>
								)
							}}
						/>
						<TextField
							fullWidth
							margin='dense'
							variant='outlined'
							type='password'
							//placeholder='Password'
							onChange={this.handleFieldChange}
							id='regPasswordConfirm'
							//required=''
							//autoFocus=''
							label='confirm password'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockIcon />
									</InputAdornment>
								)
							}}
						/>
					</div>

					<div className='regBtns'>
						<Button
							type='submit'
							className='loginBtn'
							variant='contained'
							color='primary'
							size='small'
						>
							Register
						</Button>

						<Button
							color='primary'
							//className='regLink'
							onClick={this.props.hideReg}
						>
							Back to Login
						</Button>
						{/* <button type='submit' className='login-form-button'>
							Log in
						</button> */}
						{/* <p className='regLink' onClick={this.props.hideReg} href=''>
							Go back to Login!
						</p> */}
					</div>
				</form>
			</>
		);
	}
}

export default Registration;

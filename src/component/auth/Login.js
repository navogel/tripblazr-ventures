import React, { Component } from 'react';
import AuthManager from '../../modules/AuthManager';
import Register from '../auth/Register';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import { Spring } from 'react-spring/renderprops';
import Button from '@material-ui/core/Button';

class Login extends Component {
	// Set initial state
	state = {
		userName: '',
		password: '',
		hideReg: true
	};

	showLogin = () => {
		this.setState({ hideReg: false });
	};

	hideReg = () => {
		this.setState({ hideReg: true });
	};

	// Update state whenever an input field is edited
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	handleLogin = e => {
		e.preventDefault();
		let userName = this.state.userName;
		let password = this.state.password;
		AuthManager.getUser(userName).then(response => {
			if (response.length === 0) {
				alert('Please enter a valid User Name.');
			} else if (response.length === 1 && response[0].password !== password) {
				alert('Password is incorrect, please try again.');
				// starting the if statement to check for empty fields//
			} else if (password === '') {
				alert('Please fill the Password Form');
			} else if (userName === '') {
				alert('Please enter a valid email address');
			} else if (response[0].password === password) {
				//response[0].id is the ID of the user you logged in with,
				//in case of "Steve" it would be "1"
				this.props.setUser(response[0]);
				this.props.history.push(`/mytrips`);
			}
		});
	};

	render() {
		return (
			<>
				<div className='loginWrapper'>
					<div className='logoWrapper'>
						<img
							src='/images/TBpin.png'
							alt='Smiley face'
							//width='350px'
							height='100px'
							z-index='-2'
						/>
						<p className='appTitle'>TRIPBLAZR</p>
					</div>

					{this.state.hideReg && (
						<>
							<Spring
								from={{ opacity: 0 }}
								to={{ opacity: 1 }}
								//config={{ duration: 500 }}
							>
								{props => (
									<div style={props}>
										<form
											onSubmit={this.handleLogin}
											id='loginForm'
											className='loginForm'
										>
											<TextField
												fullWidth
												margin='dense'
												variant='outlined'
												//placeholder='Username'
												onChange={this.handleFieldChange}
												type='userName'
												id='userName'
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
												id='password'
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

											<div className='formField'>
												{/* <Checkbox>Remember me</Checkbox> */}
												<Button
													type='submit'
													className='loginBtn'
													variant='contained'
													color='primary'
													size='small'
												>
													Login
												</Button>

												<Button
													color='primary'
													//className='regLink'
													onClick={this.showLogin}
												>
													Register
												</Button>
												{/* <p className='regLink' onClick={this.showLogin} href=''>
													Or register now!
												</p> */}
											</div>
										</form>
									</div>
								)}
							</Spring>
						</>
					)}

					{!this.state.hideReg && (
						<Spring
							from={{ opacity: 0 }}
							to={{ opacity: 1 }}
							//config={{ duration: 500 }}
						>
							{props => (
								<div style={props}>
									<Register {...this.props} hideReg={this.hideReg} />
								</div>
							)}
						</Spring>
					)}
				</div>
			</>
		);
	}
}

export default withRouter(Login);

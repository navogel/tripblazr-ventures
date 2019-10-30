import React, { Component } from 'react';
import './AnimalForm.css';
import TripManager from '../../modules/TripManager';

class TripForm extends Component {
	state = {
		tripName: '',
		city: '',
		summary: '',
		lat: '',
		lng: '',
		communication: '',
		money: '',
		loadingStatus: false
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	/*  Local method for validation, set loadingStatus, create animal object, invoke the AnimalManager post method, and redirect to the full animal list
	 */
	constructNewTrip = evt => {
		evt.preventDefault();
		if (this.state.tripName === '' || this.state.city === '') {
			window.alert('Please input an trip destination and name');
		} else {
			this.setState({ loadingStatus: true });
			const trip = {
				tripName: this.state.tripName,
				city: this.state.city,
				summary: this.state.summary,
				lat: this.state.lat,
				lng: this.state.lng,
				communication: this.state.communication,
				money: this.state.money
			};

			// Create the animal and redirect user to animal list
			TripManager.post(animal).then(() => {
				console.log('addform props', this.props);
				this.props.props.getData();
				this.props.onClose();
				// this.props.props.history.push('/animals');
			});
		}
	};

	componentDidMount() {
		EmployeeManager.getAll().then(allEmployees => {
			this.setState({
				employees: allEmployees
			});
		});
	}

	render() {
		return (
			<>
				{/* <ButtonAppBar {...this.props} page='Onboard a new Animal' /> */}
				<form className='modalContainer'>
					<fieldset>
						<div className='formgrid'>
							<input
								type='text'
								required
								onChange={this.handleFieldChange}
								id='animalName'
								placeholder='Animal name'
							/>
							<label htmlFor='animalName'>Name</label>
							<input
								type='text'
								required
								onChange={this.handleFieldChange}
								id='breed'
								placeholder='Breed'
							/>
							<label htmlFor='breed'>Breed</label>
							<input
								type='text'
								required
								onChange={this.handleFieldChange}
								id='image'
								placeholder='image'
							/>
							<label htmlFor='image'>Image</label>
						</div>
						<div className='alignRight'>
							<select
								className='form-control'
								id='employeeId'
								value={this.state.employeeId}
								onChange={this.handleFieldChange}
							>
								<option>Employee</option>
								{this.state.employees.map(employee => (
									<option key={employee.id} value={employee.id}>
										{employee.name}
									</option>
								))}
							</select>
							<button
								type='button'
								disabled={this.state.loadingStatus}
								onClick={this.constructNewAnimal}
							>
								Submit
							</button>
						</div>
					</fieldset>
				</form>
			</>
		);
	}
}

export default TripForm;

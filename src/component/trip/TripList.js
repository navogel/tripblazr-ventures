import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';

class TripList extends Component {
	state = {
		trips: []
	};

	getTrips = () => {
		TripManager.getAllTrips().then(newAnimals => {
			this.setState({
				animals: newAnimals
			});
		});
	};
}

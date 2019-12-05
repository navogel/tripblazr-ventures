import { Route, Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Trip from './trip/Trip';
import TripList from './trip/TripList';

class ApplicationViews extends Component {
	state = {
		loaded: false,
		tripData: {}
		//OwnerView: false
	};

	

	render() {
		//console.log('app view render props', this.props);
		return (
			<React.Fragment>
				

				<Route
					exact
					path='/mytrips'
					render={props => {
						if (this.props.user) {
							return (
								<TripList
									{...props}
									activeUser={this.props.activeUser}
									clearUser={this.props.clearUser}
									email={this.props.email}
									// setOwner={this.setOwner}
									// removeOwner={this.removeOwner}
								/>
							);
						} else {
							return <Redirect to='/login' />;
						}
					}}
				/>

				<Route
					exact
					path='/mytrips/:tripId(\d+)'
					render={props => {
						if (this.props.user) {
							return (
								<Trip
									tripId={parseInt(props.match.params.tripId)}
									activeUser={this.props.activeUser}
									email={this.props.email}
									//ownerView={this.state.ownerView}
									{...props}
								/>
							);
						} else {
							return <Redirect to='/login' />;
						}
					}}
				/>

				
			</React.Fragment>
		);
	}
}

export default withRouter(ApplicationViews);

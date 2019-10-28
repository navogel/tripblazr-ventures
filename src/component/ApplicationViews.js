import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Trip from './trip/Trip';
import TripList from './trip/TripList';

export default class ApplicationViews extends Component {
	render() {
		//console.log('app view user', this.props.activeUser);
		return (
			<React.Fragment>
				{/* <Route
					exact
					path='/mytriplist'
					render={props => {
						return (
							<ArticlesList
								{...props}
								// getUser={this.props.getUser}
								activeUser={this.props.activeUser}
							/>
						);
					}}
				/> */}

				<Route
					exact
					path='/mytrips'
					render={props => {
						if (this.props.user) {
							return <TripList {...props} activeUser={this.props.activeUser} />;
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

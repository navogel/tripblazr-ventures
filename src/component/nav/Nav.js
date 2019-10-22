import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
	handleLogout = () => {
		this.props.clearUser();
		this.props.history.push('/');
	};

	render() {
		return (
			<>
				<h1>this is NAV</h1>
				<button onClick={this.handleLogout}>log-OUT</button>
			</>
		);
	}
}

export default withRouter(Nav);

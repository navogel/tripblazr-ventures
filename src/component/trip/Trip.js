import React, { Component } from 'react';
import Map from '../map/L-Map';

class Trip extends Component {
	render() {
		return (
			<>
				<div>This is a tripView</div>
				<div className='mapWrapper'>
					<Map />
				</div>
			</>
		);
	}
}

export default Trip;

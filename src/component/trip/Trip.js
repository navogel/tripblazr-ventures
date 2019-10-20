import React, { Component } from 'react';
import Mapper from '../map/Map';

class Trip extends Component {
	render() {
		return (
			<>
				<div>This is a tripView</div>
				<div className='mapWrapper'>
					<Mapper />
				</div>
			</>
		);
	}
}

export default Trip;

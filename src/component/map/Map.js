import React, { Component } from 'react';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Token from '../../Token';

const TOKEN = Token; // Set your mapbox token here

const Map = ReactMapboxGl({
	accessToken: TOKEN
});
export default class Mapper extends Component {
	render() {
		return (
			<>
				<Map
					style='mapbox://styles/mapbox/streets-v9'
					containerStyle={{
						height: '100vh',
						width: '100vw'
					}}
					pitch={[60]}
					center={[-86.7816, 36.1627]}
					zoom={[13]}
				>
					<Layer
						type='symbol'
						id='marker'
						layout={{ 'icon-image': 'marker-15' }}
					>
						<Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
					</Layer>
				</Map>
			</>
		);
	}
}

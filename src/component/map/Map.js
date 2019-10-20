import React, { Component } from 'react';
import { ZoomControl } from 'react-mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Token from '../../Token';
import { Marker } from 'react-mapbox-gl';
import Pin from './pin';

const TOKEN = Token; // Set your mapbox token here

const Map = ReactMapboxGl({
	accessToken: TOKEN,
	attributionControl: false,
	pitchWithRotate: false
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
					showCompass='true'
				>
					<Marker coordinates={[-86.7816, 36.1627]} anchor='bottom'>
						<Pin />
					</Marker>
					<Layer
						type='symbol'
						id='marker'
						layout={{ 'icon-image': 'marker-15' }}
					>
						<Feature coordinates={[-86.7816, 36.1627]} />
					</Layer>
					<ZoomControl />
				</Map>
			</>
		);
	}
}

import React, { Component } from 'react';
import { ZoomControl } from 'react-mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Token from '../../Token';
import { Marker } from 'react-mapbox-gl';
import { Cluster } from 'react-mapbox-gl';
import Pin from './pin';
import { Popup } from 'react-mapbox-gl';

const TOKEN = Token; // Set your mapbox token here

const Map = ReactMapboxGl({
	accessToken: TOKEN,
	attributionControl: false,
	pitchWithRotate: false
});

// clusterMarker = coordinates => (
// 	<Marker coordinates={coordinates}>
// 		<Pin />
// 	</Marker>
// );

export default class Mapper extends Component {
	state = {
		locations: []
	};

	// static getDerivedStateFromProps(props) {
	// 	this.setState({ locations: props });
	// 	console.log(this.state);
	// }

	render() {
		console.log('props from list', this.props.props);
		return (
			<>
				<Map
					style='mapbox://styles/jerodis/cjp0kox4g0c6s2rnzvnpdorq3'
					containerStyle={{
						height: '100vh',
						width: '100vw'
					}}
					pitch={[60]}
					center={[-86.7816, 36.1627]}
					zoom={[13]}
					showCompass='true'
				>
					{/* <Cluster ClusterMarkerFactory={this.clusterMarker}>
						{this.props.props.map((location, key) => (
							<Marker
								key={key}
								coordinates={location}
								onClick={this.onMarkerClick.bind(this, location)}
							>
								<Pin />
							</Marker>
						))}
					</Cluster> */}
					{this.props.props.map(location => (
						<Marker
							key={location.id}
							coordinates={[location.long, location.lat]}
							anchor='bottom'
						>
							<Pin />
						</Marker>
					))}
					{/* <Layer
						type='symbol'
						id='marker'
						layout={{ 'icon-image': 'marker-15' }}
					>
						<Feature coordinates={[-86.7816, 36.1627]} />
					</Layer> */}
					<ZoomControl />
				</Map>
			</>
		);
	}
}

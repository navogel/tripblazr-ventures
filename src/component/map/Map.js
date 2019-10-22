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

export default class Mapper extends Component {
	state = {
		popup: false,
		coordinates: [],
		name: '',
		center: [-86.7816, 36.1627],
		zoom: [13]
	};

	clusterMarker = coordinates => (
		<Marker coordinates={coordinates}>
			<Pin />
		</Marker>
	);

	onMarkerClick = e => {
		console.log('event info', e);
		let coords = [e.long, e.lat];
		this.setState({
			popup: true,
			name: e.name,
			coordinates: coords
		});
	};

	onMarkerLeave = e => {
		this.setState({
			popup: false,
			coordinates: [],
			name: ''
		});
	};

	render() {
		console.log('state', this.state);
		const popups = this.state.popup;

		return (
			<>
				<Map
					style='mapbox://styles/jerodis/cjp0kox4g0c6s2rnzvnpdorq3'
					containerStyle={{
						height: '100vh',
						width: '100vw'
					}}
					pitch={[60]}
					center={this.state.center}
					zoom={this.state.zoom}
					onMove={this.onMove}
				>
					<Cluster
						ClusterMarkerFactory={this.clusterMarker}
						zoomOnClick='true'
						zoomOnClickPadding={200}
					>
						{this.props.props.map(location => (
							<Marker
								key={location.id}
								coordinates={[location.long, location.lat]}
								anchor='bottom'
								onMouseEnter={this.onMarkerClick.bind(this, location)}
								onMouseLeave={this.onMarkerLeave}
							>
								<Pin />
							</Marker>
						))}
					</Cluster>
					{/* {this.props.props.map(location => (
						<>
							<Marker
								key={location.id}
								coordinates={[location.long, location.lat]}
								anchor='bottom'
								onClick={this.onMarkerClick.bind(this, location)}
							>
								<Pin />
							</Marker>
						</>
					))} */}
					{popups && (
						<Popup
							coordinates={this.state.coordinates}
							offset={{
								'bottom-left': [12, -38],
								bottom: [0, -50],
								'bottom-right': [-12, -38]
							}}
						>
							<h1>{this.state.name}</h1>
						</Popup>
					)}

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

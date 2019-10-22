import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip, FeatureGroup } from 'react-leaflet';
import Token from '../../Token';
import L from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-markercluster';

const createClusterCustomIcon = function(cluster) {
	return L.divIcon({
		html: `<span>${cluster.getChildCount()}</span>`,
		className: 'marker-cluster-custom',
		iconSize: L.point(40, 40, true)
	});
};

export default class Mapper extends Component {
	state = {
		lat: 36.505,
		lng: -86.09,
		zoom: 13
	};

	// componentDidMount() {
	// 	console.log('mounting', this.refs.map.leafletElement.getBounds);
	// }

	// onFeatureGroupAdd = e => {
	// 	console.log('mounting', e.target.getBounds());
	// };

	render() {
		const Atoken = `https://api.mapbox.com/styles/v1/jerodis/cjslgf0z045tb1fqdutmd3q71/tiles/256/{z}/{x}/{y}@2x?access_token=${Token}`;
		const position = [this.state.lat, this.state.lng];
		const markers = [];
		this.props.props.forEach(obj => {
			let coord = [obj.lat, obj.long];
			markers.push(coord);
		});
		console.log('mapref', this.refs.map);
		console.log('markers', markers);
		if (this.refs.map && this.refs.map.leafletElement) {
			this.refs.map.leafletElement.fitBounds(markers);
		}

		return (
			<>
				{/* <button onClick={this.handleClick}>Zoom</button> */}
				<Map
					center={position}
					zoom={this.state.zoom}
					maxZoom={16}
					className='map'
					ref='map'
				>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url={Atoken}
					/>
					<FeatureGroup ref='features' onAdd={this.onFeatureGroupAdd}>
						<MarkerClusterGroup
							showCoverageOnHover={true}
							iconCreateFunction={createClusterCustomIcon}
						>
							{this.props.props.map(location => (
								<Marker
									className='specMarker'
									key={location.id}
									position={[location.lat, location.long]}
									anchor='bottom'
									// onMouseEnter={this.onMarkerClick.bind(this, location)}
									// onMouseLeave={this.onMarkerLeave}
								>
									<Tooltip>{location.name}</Tooltip>
								</Marker>
							))}
						</MarkerClusterGroup>
					</FeatureGroup>
				</Map>
			</>
		);
	}
}

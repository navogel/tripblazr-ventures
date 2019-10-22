import React, { Component } from 'react';
import {
	Map,
	TileLayer,
	Marker,
	Tooltip,
	FeatureGroup,
	MapControl
} from 'react-leaflet';
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
		lng: -8.09,
		zoom: 13
	};

	// componentDidMount() {

	// 	const map = this.leafletMap.leafletElement;
	// 	const geocoder = L.Control.Geocoder.nominatim();
	// 	let marker;

	// 	map.on('click', e => {
	// 		geocoder.reverse(
	// 			e.latlng,
	// 			map.options.crs.scale(map.getZoom()),
	// 			results => {
	// 				var r = results[0];
	// 				if (r) {
	// 					if (marker) {
	// 						marker
	// 							.setLatLng(r.center)
	// 							.setPopupContent(r.html || r.name)
	// 							.openPopup();
	// 					} else {
	// 						marker = L.marker(r.center)
	// 							.bindPopup(r.name)
	// 							.addTo(map)
	// 							.openPopup();
	// 					}
	// 				}
	// 			}
	// 		);
	// 	});
	// }

	// onFeatureGroupAdd = e => {
	// 	console.log('mounting', e.target.getBounds());
	// };

	getCoord = e => {
		const lat = e.latlng.lat;
		const lng = e.latlng.lng;
		// L.marker([lat, lng])
		// 	.bindPopup('this is a smashing place')
		// 	.addTo(this.map);
		console.log(lat, lng);
	};

	render() {
		const Atoken = `https://api.mapbox.com/styles/v1/jerodis/cjslgf0z045tb1fqdutmd3q71/tiles/256/{z}/{x}/{y}@2x?access_token=${Token}`;
		const position = [this.state.lat, this.state.lng];
		const markers = [];
		this.props.props.forEach(obj => {
			let coord = [obj.lat, obj.long];
			markers.push(coord);
		});

		if (this.leafletMap && this.leafletMap.leafletElement) {
			this.leafletMap.leafletElement.fitBounds(markers);
			console.log(this.leafletMap.leafletElement);
			// console.log(this.refs.geocode);
		}

		return (
			<>
				{/* <button onClick={this.handleClick}>Zoom</button> */}

				<Map
					center={position}
					doubleClickZoom={true}
					zoom={this.state.zoom}
					maxZoom={16}
					className='map'
					ref={m => {
						this.leafletMap = m;
					}}
					onClick={this.getCoord}
					// fitBounds={markers}
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

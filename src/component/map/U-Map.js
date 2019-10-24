import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip, FeatureGroup } from 'react-leaflet';
import Token from '../../Token';
import L from 'leaflet';
import GeoSearch from './GeoSearch';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-markercluster';

const createClusterCustomIcon = function(cluster) {
	return L.divIcon({
		html: `<span>${cluster.getChildCount()}</span>`,
		className: 'marker-cluster-custom',
		iconSize: L.point(40, 40, true)
	});
};

var myIcon1 = L.icon({
	iconUrl: '/images/markers/icon1.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

var myIcon2 = L.icon({
	iconUrl: '/images/markers/icon2.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

var myIcon3 = L.icon({
	iconUrl: '/images/markers/icon3.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
	// className: 'toolTip'
});

var myIcon4 = L.icon({
	iconUrl: '/images/markers/icon4.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

export default class Mapper extends Component {
	state = {
		lat: '',
		lng: '',
		zoom: 13
	};

	//function for storing click events on geosearch and click to add markers
	storeGeocode = (e, obj) => {
		console.log('yaya got dem O-B-Js', obj);
	};

	//function to storing click events on main map

	markerFocus = (e, obj) => {
		console.log('got the deets', obj);
	};

	componentDidMount() {
		const map = this.leafletMap.leafletElement;
		const geocoder = L.Control.Geocoder.mapbox(Token);
		let marker;

		map.on('click', e => {
			geocoder.reverse(
				e.latlng,
				map.options.crs.scale(map.getZoom()),
				results => {
					var r = results[0];
					console.log('reverse geocode results', r);
					if (r) {
						if (marker) {
							marker.setLatLng(r.center).setPopupContent(r.html || r.name);
							// .openPopup();
						} else {
							marker = L.marker(r.center, { icon: myIcon4 })
								.bindTooltip(r.name, { className: 'toolTip' })
								.addTo(map)
								.on('click', e => this.storeGeocode(e, r));
							// .openPopup();
						}
					}
				}
			);
		});
	}

	configMyIcon = id => {
		if (id === 1) {
			return myIcon1;
		} else if (id === 2) {
			return myIcon2;
		} else if (id === 3) {
			return myIcon3;
		}
	};

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
		//create an array to hold location coords, with state passed fomr tip.js
		const markers = [];
		//take trips array of object and create an array of coordinates.
		this.props.locations.forEach(obj => {
			let coord = [obj.lat, obj.long];
			markers.push(coord);
		});
		//if leaflet has loaded, pass marker array for bounds
		if (this.leafletMap && this.leafletMap.leafletElement) {
			this.leafletMap.leafletElement.fitBounds(markers);

			//consolelog geocoder element
			console.log('props from trip', this.props);

			//trying to console log geocoder results

			// this.leafletGeo.leafletElement.markGeocode().then(results => {
			// 	console.log('geo results', results);
			// });
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
					<GeoSearch
						ref={m => {
							this.leafletGeo = m;
						}}
						storeGeocode={this.storeGeocode}
					/>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url={Atoken}
					/>

					<FeatureGroup ref='features' onAdd={this.onFeatureGroupAdd}>
						<MarkerClusterGroup
							showCoverageOnHover={true}
							iconCreateFunction={createClusterCustomIcon}
						>
							{this.props.locations.map(location => (
								<Marker
									className='location'
									key={location.id}
									position={[location.lat, location.long]}
									anchor='bottom'
									onClick={e => this.markerFocus(e, location)}
									icon={this.configMyIcon(location.locationType)}
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

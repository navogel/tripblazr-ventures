import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import Token from '../../Token';
import L from 'leaflet';
import TripGeoSearch from './TripGeoSearch';
import Control from 'react-leaflet-control';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import SearchManager from '../../modules/SearchManager';

const createClusterCustomIcon = function(cluster) {
	return L.divIcon({
		html: `<span>${cluster.getChildCount()}</span>`,
		className: 'marker-cluster-custom',
		iconSize: L.point(40, 40, true)
	});
};

const myIcon1 = L.icon({
	iconUrl: '/images/markers/icon1.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

const myIcon2 = L.icon({
	iconUrl: '/images/markers/icon2.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

const myIcon3 = L.icon({
	iconUrl: '/images/markers/icon3.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
	// className: 'toolTip'
});

const myIcon4 = L.icon({
	iconUrl: '/images/markers/icon4.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

const myIcon5 = L.icon({
	iconUrl: '/images/markers/icon5.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

export default class TripMapper extends Component {
	state = {
		lat: '',
		lng: '',
		zoom: 14,
		light: true
	};

	//function for storing click events on geosearch and click to add markers
	storeGeocode = (e, obj) => {
		console.log('yaya got dem O-B-Js', obj);
	};

	//function to storing click events on main map

	markerFocus = (e, obj) => {
		console.log('got the deets', obj);
	};

	//light and dark mode on map

	mapToggle = () => {
		if (this.state.light === true) {
			this.setState({
				light: false
			});
		} else {
			this.setState({
				light: true
			});
		}
	};

	//attempt to get map center bounds for FB search _lastCenter doesnt seem to be accurate

	getCenterCoords = e => {
		console.log(this.leafletMap.leafletElement);
	};

	//drop marker on click and record coords and address
	// componentDidMount() {
	// 	const map = this.leafletMap.leafletElement;
	// 	const geocoder = L.Control.Geocoder.mapbox(Token);
	// 	let marker;

	// 	map.on('click', e => {
	// 		geocoder.reverse(
	// 			e.latlng,
	// 			map.options.crs.scale(map.getZoom()),
	// 			results => {
	// 				var r = results[0];
	// 				console.log('reverse geocode results', r);
	// 				this.setState({
	// 					lat: r.center.lat,
	// 					lng: r.center.lng
	// 				});
	// 				console.log(this.state.lat, this.state.lng);
	// 				if (r) {
	// 					if (marker) {
	// 						marker
	// 							.setLatLng(r.center)
	// 							.bindTooltip(r.name, { className: 'toolTip' })
	// 							.on('click', e => this.storeGeocode(e, r));
	// 						// .openPopup();
	// 					} else {
	// 						marker = L.marker(r.center, { icon: myIcon4 })
	// 							.bindTooltip(r.name, { className: 'toolTip' })
	// 							.addTo(map)
	// 							.on('click', e => this.storeGeocode(e, r));
	// 						// .openPopup();
	// 					}
	// 				}
	// 			}
	// 		);
	// 	});
	// }

	getCoord = e => {
		const lat = e.latlng.lat;
		const lng = e.latlng.lng;
		console.log(lat, lng);
	};
	//mapbox://styles/jerodis/ck24x2b5a12ro1cnzdopvyw08 light
	//mapbox://styles/jerodis/ck24wv71g15vb1cp90thseofp dark
	render() {
		console.log('map trips', this.props.trips);
		let Atoken;
		if (this.state.light === true) {
			Atoken = `https://api.mapbox.com/styles/v1/jerodis/ck24x2b5a12ro1cnzdopvyw08/tiles/256/{z}/{x}/{y}@2x?access_token=${Token.MB}`;
		} else {
			Atoken = `https://api.mapbox.com/styles/v1/jerodis/ck24wv71g15vb1cp90thseofp/tiles/256/{z}/{x}/{y}@2x?access_token=${Token.MB}`;
		}

		const position = [this.state.lat, this.state.lng];
		//create an array to hold location coords, with state passed fomr tip.js
		const markers = [];
		//take trips array of object and create an array of coordinates.
		this.props.trips.forEach(obj => {
			let coord = [obj.lat, obj.long];
			markers.push(coord);
		});
		//if leaflet has loaded, pass marker array for bounds
		if (this.leafletMap && this.leafletMap.leafletElement) {
			this.leafletMap.leafletElement.fitBounds(markers, { padding: [20, 20] });
		}

		return (
			<>
				{this.leafletMap && this.leafletMap.leafletElement && (
					<button onClick={this.getCenterCoords}>click for map obj</button>
				)}
				<Map
					center={position}
					doubleClickZoom={true}
					Zoom={this.state.zoom}
					maxZoom={16}
					className='map'
					ref={m => {
						this.leafletMap = m;
					}}
					onClick={this.getCoord}
					attributionControl={false}
				>
					<TripGeoSearch
						ref={m => {
							this.leafletGeo = m;
						}}
						storeGeocode={this.storeGeocode}
					/>

					<TileLayer
						// attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url={Atoken}
					/>

					<MarkerClusterGroup
						showCoverageOnHover={true}
						iconCreateFunction={createClusterCustomIcon}
						maxClusterRadius={50}
						zoomToBounds={{ padding: [50, 50] }}
					>
						{this.props.trips.map(trip => (
							<Marker
								className='location'
								key={trip.id}
								position={[trip.lat, trip.long]}
								anchor='bottom'
								onClick={e => this.markerFocus(e, trip)}
								// icon={this.configMyIcon(location.locationType)}
							>
								<Tooltip>{trip.name}</Tooltip>
							</Marker>
						))}
					</MarkerClusterGroup>

					<Control position='bottomright'>
						<button onClick={this.mapToggle}>SWITCH MAP Stylie</button>
					</Control>
				</Map>
			</>
		);
	}
}

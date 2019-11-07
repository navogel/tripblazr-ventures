import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import Token from '../../Token';
import L from 'leaflet';
import TripGeoSearch from './TripGeoSearch';
import Control from 'react-leaflet-control';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//import SearchManager from '../../modules/SearchManager';

const createClusterCustomIcon = function(cluster) {
	return L.divIcon({
		html: `<span>${cluster.getChildCount()}</span>`,
		className: 'marker-cluster-custom',
		iconSize: L.point(40, 40, true)
	});
};

const myIcon4 = L.icon({
	iconUrl: '/images/markers/icon4.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	tooltipAnchor: [15, -30],
	shadowUrl: '/images/markers/shadow.png',
	shadowSize: [30, 41],
	shadowAnchor: [9, 41]
});

class TripMapper extends Component {
	state = {
		lat: '',
		lng: '',
		zoom: 13,
		light: true,
		geocoded: false,
		mapLoaded: false
	};

	//function for storing click events on geosearch and click to add markers
	storeGeocode = obj => {
		console.log('yaya got dem O-B-Js', obj);
		this.setState({ geocoded: true });
		this.props.addMarker(obj);
	};

	markerFocus = obj => {
		if (this.state.mapLoaded === false) {
			this.setState({ mapLoaded: true });
		}
		//console.log('got the deets', obj);
		this.props.scrollTo(obj.id);
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
	componentDidMount() {
		//commenting marker dropping for TripList view so geocoding search is the only way to add trips
		// 	const map = this.leafletMap.leafletElement;
		// 	const geocoder = L.Control.Geocoder.mapbox(Token);
		// 	let marker;
		// 	map.on('click', e => {
		// 		geocoder.reverse(
		// 			e.latlng,
		// 			map.options.crs.scale(map.getZoom()),
		// 			results => {
		// 				var r = results[0];
		// 				//console.log('reverse geocode results', r);
		// 				this.setState({
		// 					lat: r.center.lat,
		// 					lng: r.center.lng
		// 				});
		// 				this.props.addMarker(r);
		// 				//console.log(this.state.lat, this.state.lng);
		// 				if (r) {
		// 					if (marker) {
		// 						map.removeLayer(marker);
		// 						marker = L.marker(r.center, { icon: myIcon4 })
		// 							.bindTooltip(r.name, { className: 'toolTip' })
		// 							.addTo(map)
		// 							.on('click', e => this.storeGeocode(e, r));
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
	}

	resetView = e => {
		this.leafletMap.leafletElement.setView([40, 34], 2);
		this.props.clearClickedCoords();
		this.setState({ geocoded: false });
	};

	getCoord = e => {
		const lat = e.latlng.lat;
		const lng = e.latlng.lng;
		console.log(lat, lng);
	};
	//mapbox://styles/jerodis/ck24x2b5a12ro1cnzdopvyw08 light
	//mapbox://styles/jerodis/ck24wv71g15vb1cp90thseofp dark
	render() {
		//console.log('map trips', this.props.trips);
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
			let coord = [obj.lat, obj.lng];
			markers.push(coord);
		});
		//if leaflet has loaded, pass marker array for bounds
		if (
			this.leafletMap &&
			this.leafletMap.leafletElement &&
			this.props.clickedCoords.length === 0 &&
			markers.length > 10
		) {
			this.leafletMap.leafletElement.fitBounds(markers, {
				padding: [100, 100]
			});
			console.log('fit to bounds');
		} else if (
			this.leafletMap &&
			this.leafletMap.leafletElement &&
			this.props.clickedCoords.length > 0
		) {
			console.log('clicked coords zoom', this.props.clickedCoords);
			//console.log('marker coords', markers);
			//if not first load, and link has been clicked, zoom to marker
			this.leafletMap.leafletElement.setView(this.props.clickedCoords, 10);
		} else if (
			this.leafletMap &&
			this.leafletMap.leafletElement &&
			this.state.geocoded === false &&
			this.state.mapLoaded === false
		) {
			this.leafletMap.leafletElement.setView([40, 34], 2);
			console.log('world View', this.state.mapLoaded);
		}

		return (
			<>
				<Map
					center={position}
					doubleClickZoom={true}
					Zoom={this.state.zoom}
					maxZoom={16}
					className='mapComponent'
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
						addMarker={this.props.addMarker}
						clearClickedCoords={this.props.clearClickedCoords}
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
							<Link key={trip.id} to={`/mytrips/${trip.id}`} trip={trip}>
								<Marker
									className='location'
									key={trip.id}
									position={[trip.lat, trip.lng]}
									anchor='bottom'
									onMouseMove={e => this.markerFocus(trip)}
									//onMouse={e => this.props.hoverFocus(trip.id)}
									onMouseOut={e => this.props.hoverRemoveFocus()}
									onClick={e => this.props.history.push(`/mytrips/${trip.id}`)}
									// icon={this.configMyIcon(location.locationType)}
								>
									<Tooltip>
										<p>{trip.name}</p>
									</Tooltip>
								</Marker>
							</Link>
						))}
					</MarkerClusterGroup>

					<Control position='bottomright'>
						<button onClick={this.mapToggle}>SWITCH MAP Stylie</button>
						<button onClick={this.resetView}>World View</button>
					</Control>
				</Map>
			</>
		);
	}
}

export default withRouter(TripMapper);

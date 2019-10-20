import React, { Component } from 'react';
import L from 'leaflet';
import Token from '../../Token';

class Mapper extends Component {
	map = null;

	//{accessToken}

	componentDidMount() {
		// create map
		this.map = L.map('map').setView([36, -86.5], 10);

		// add basemap
		L.tileLayer(
			'https://api.mapbox.com/styles/v1/jerodis/cjslgf0z045tb1fqdutmd3q71/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
			{
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.streets',
				accessToken: Token
			}
		).addTo(this.map);

		navigator.geolocation.getCurrentPosition(position => {
			const coords = position.coords;
			this.map.setView([coords.latitude, coords.longitude], 16);

			L.marker([coords.latitude, coords.longitude])
				.bindPopup('This is your current <strong>location</strong>')
				.addTo(this.map);
		});

		// log user clicks
		this.map.on('click', event => {
			const lat = event.latlng.lat;
			const lng = event.latlng.lng;
			console.log(lat, lng);
		});
	}

	render() {
		return (
			<React.Fragment>
				<div id='map'></div>
			</React.Fragment>
		);
	}
}

export default Mapper;

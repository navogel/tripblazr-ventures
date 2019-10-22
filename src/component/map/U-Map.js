import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import Token from '../../Token';

import MarkerClusterGroup from 'react-leaflet-markercluster';

export default class Mapper extends Component {
	state = {
		lat: 36.505,
		lng: -86.09,
		zoom: 13
	};

	render() {
		const Atoken = `https://api.mapbox.com/styles/v1/jerodis/cjslgf0z045tb1fqdutmd3q71/tiles/256/{z}/{x}/{y}@2x?access_token=${Token}`;
		const position = [this.state.lat, this.state.lng];
		return (
			<Map
				center={position}
				zoom={this.state.zoom}
				maxZoom={18}
				className='map'
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url={Atoken}
				/>
				<MarkerClusterGroup>
					{this.props.props.map(location => (
						<Marker
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
			</Map>
		);
	}
}

import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import Token from '../../Token';

class GeoSearch extends MapControl {
	createLeafletElement(props) {}

	componentDidMount() {
		// let myIcon1 = L.icon({
		// 	iconUrl: '../../icon1.png',
		// 	iconSize: [20, 20],
		// 	iconAnchor: [22, 94],
		// 	popupAnchor: [-3, -76],
		// 	shadowUrl: 'my-icon-shadow.png',
		// 	shadowSize: [68, 95],
		// 	shadowAnchor: [22, 94]
		// });

		const searchBox = L.Control.geocoder({
			geocoder: new L.Control.Geocoder.Mapbox(Token, {
				geocodingQueryParams: { proximity: { lat: 36, lng: -86 } }
			}),
			collapsed: false,
			showResultIcons: true,
			defaultMarkGeocode: false
		}).on('markgeocode', result => {
			// let printResult = this.props.storeGeocode(result);
			result = result.geocode || result;

			this.props.leaflet.map.fitBounds(result.bbox);

			if (this._geocodeMarker) {
				this.props.leaflet.map.removeLayer(this._geocodeMarker);
			}

			this._geocodeMarker = new L.Marker(result.center)
				.bindTooltip(result.html || result.name)
				.addTo(this.props.leaflet.map)
				.on('click', e => this.props.storeGeocode(e, result));

			return this;
		});
		this.leafletElement = searchBox;
		searchBox.addTo(this.props.leaflet.map);
	}

	//trying to console log results

	// searchBox.markGeocode = function(result) {
	// 	console.log('georesult', result);
	// };

	// searchBox.on('markGeocode', function(e) {
	// 	console.log('georesult', e);
	// });
}

export default withLeaflet(GeoSearch);

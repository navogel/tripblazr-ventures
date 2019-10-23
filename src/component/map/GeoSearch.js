import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import Token from '../../Token';

// import Token from '../../Token'

class GeoSearch extends MapControl {
	createLeafletElement(props) {}

	componentDidMount() {
		const searchBox = L.Control.geocoder({
			geocoder: new L.Control.Geocoder.Mapbox(
				Token,

				{
					geocodingQueryParams: { proximity: { lat: 36, lng: -86 } }
				}

				//trying to add params for search bias
			),
			collapsed: false,
			showResultIcons: true
		}).on('markgeocode', e => {
			console.log('georesults', e);
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

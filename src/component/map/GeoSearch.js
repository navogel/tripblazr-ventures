import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import Token from '../../Token';

// import Token from '../../Token'

class GeoSearch extends MapControl {
	createLeafletElement(props) {}

	componentDidMount() {
		const searchBox = L.Control.geocoder({
			geocoder: new L.Control.Geocoder.Mapbox(Token)
		});
		this.leafletElement = searchBox;
		searchBox.addTo(this.props.leaflet.map);
	}
}

export default withLeaflet(GeoSearch);

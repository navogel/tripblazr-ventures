import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import Token from '../../Token';
//import { divIcon } from 'leaflet';

class TripGeoSearch extends MapControl {
    createLeafletElement(props) {}

    componentDidMount() {
        //console.log('props geo', this.props);
        var myIcon4 = L.icon({
            iconUrl: '/images/markers/icon4.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            tooltipAnchor: [15, -30],
            shadowUrl: '/images/markers/shadow.png',
            shadowSize: [30, 41],
            shadowAnchor: [9, 41]
        });
        const searchBox = L.Control.geocoder({
            geocoder: new L.Control.Geocoder.Mapbox(Token.MB, {
                geocodingQueryParams: { language: 'en' }
            }),
            collapsed: false,
            // showResultIcons: true,
            defaultMarkGeocode: false,
            placeholder: 'search for a city then click + to add'
        }).on('markgeocode', result => {
            this.props.clearClickedCoords();
            this.props.storeGeocode(result);
            //console.log('georeuslt', result);
            // let printResult = this.props.storeGeocode(result);
            result = result.geocode || result;

            this.props.leaflet.map.fitBounds(result.bbox);

            if (this._geocodeMarker) {
                this.props.leaflet.map.removeLayer(this._geocodeMarker);
            }

            this._geocodeMarker = new L.Marker(result.center, { icon: myIcon4 })
                .bindTooltip(result.html || result.name, {
                    className: 'toolTip'
                })
                .addTo(this.props.leaflet.map)
                //later add to trip on click
                .on('click', e => {
                    this.props.handleClickOpen();
                    this.props.leaflet.map.removeLayer(this._geocodeMarker);
                });

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

export default withLeaflet(TripGeoSearch);

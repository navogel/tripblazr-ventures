import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip, ZoomControl } from 'react-leaflet';
import Token from '../../Token';
import L from 'leaflet';
import TripGeoSearch from './TripGeoSearch';
import Control from 'react-leaflet-control';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import PublicIcon from '@material-ui/icons/Public';
import Brightness3Icon from '@material-ui/icons/Brightness3';

const createClusterCustomIcon = function(cluster) {
    return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(40, 40, true)
    });
};

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
        //console.log('yaya got dem O-B-Js', obj);
        this.setState({ geocoded: true });
        this.props.addMarker(obj);
    };

    //scroll to function

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

    resetView = e => {
        this.leafletMap.leafletElement.setView([30, 34], 2);
        this.props.clearClickedCoords();
        this.setState({ geocoded: false });
    };

    resetMap = () => {
        this.leafletMap.leafletElement.setView([30, 34], 2);
    };

    getCoord = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        console.log(lat, lng);
    };

    render() {
        let Atoken;
        if (this.state.light === true) {
            Atoken = `https://api.mapbox.com/styles/v1/jerodis/ck24x2b5a12ro1cnzdopvyw08/tiles/256/{z}/{x}/{y}@2x?access_token=${Token.MB}`;
        } else {
            Atoken = `https://api.mapbox.com/styles/v1/jerodis/ck24wv71g15vb1cp90thseofp/tiles/256/{z}/{x}/{y}@2x?access_token=${Token.MB}`;
        }

        const position = [this.state.lat, this.state.lng];

        const markers = [];

        this.props.trips.forEach(obj => {
            let coord = [obj.lat, obj.lng];
            markers.push(coord);
        });

        if (
            this.leafletMap &&
            this.leafletMap.leafletElement &&
            this.props.clickedCoords.length > 0
        ) {
            //if not first load, and link has been clicked, zoom to marker
            this.leafletMap.leafletElement.setView(
                this.props.clickedCoords,
                10
            );
        } else if (
            this.leafletMap &&
            this.leafletMap.leafletElement &&
            this.state.geocoded === false &&
            this.state.mapLoaded === false
        ) {
            this.leafletMap.leafletElement.setView([30, 34], 2);
            //console.log('world View', this.state.mapLoaded);
        }

        return (
            <>
                <Map
                    zoomControl={false}
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
                        handleClickOpen={this.props.handleClickOpen}
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
                            <Link
                                key={trip.id}
                                to={`/mytrips/${trip.id}`}
                                trip={trip}
                            >
                                <Marker
                                    className='location'
                                    key={trip.id}
                                    position={[trip.lat, trip.lng]}
                                    anchor='bottom'
                                    onMouseMove={e => this.markerFocus(trip)}
                                    //onMouse={e => this.props.hoverFocus(trip.id)}
                                    //onMouseOut={e => this.props.hoverRemoveFocus()}
                                    onClick={e =>
                                        this.props.history.push(
                                            `/mytrips/${trip.id}`
                                        )
                                    }
                                    // icon={this.configMyIcon(location.locationType)}
                                >
                                    <Tooltip>
                                        <p>{trip.name}</p>
                                    </Tooltip>
                                </Marker>
                            </Link>
                        ))}
                    </MarkerClusterGroup>

                    <Control position='bottomright' className='nightView'>
                        <Fab
                            variant='extended'
                            size='small'
                            color='primary'
                            onClick={this.mapToggle}
                        >
                            <Brightness3Icon />
                            Night Map
                        </Fab>
                    </Control>
                    <Control position='topleft'>
                        <Fab
                            variant='extended'
                            size='small'
                            color='primary'
                            onClick={this.resetView}
                        >
                            <PublicIcon />
                            World View
                        </Fab>
                    </Control>
                    <ZoomControl position='bottomleft' />
                </Map>
            </>
        );
    }
}

export default withRouter(TripMapper);

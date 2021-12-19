import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/map.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function PinCoordinates({ sendData }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const lng = -70.9, lat = 42.35;

    // marker coords
    const [coordinates, setCoordinates] = useState({});

    useEffect(() => {
        sendData(coordinates);
    }, [coordinates, sendData]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 10
        });

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            Range: 100
        });
        // Added the control to the map.
        map.current.addControl(geolocate);
        map.current.addControl(new mapboxgl.NavigationControl());
        // Set an event listener that fires when a geolocate event occurs.
        geolocate.on('geolocate', (e) => {
            setCoordinates({ longitude: e.coords.longitude, latitude: e.coords.latitude });
            marker.setLngLat([e.coords.longitude, e.coords.latitude]);
        });

        // marker
        const marker = new mapboxgl.Marker({
            draggable: true

        }).setLngLat([lng, lat]).addTo(map.current);

        function onDragEnd() {
            const lngLat = marker.getLngLat();
            setCoordinates({ long: lngLat.lng, lat: lngLat.lat });
        }

        marker.on('dragend', onDragEnd);
    });

    return (
        <div className="container" style={{"width": '1150px'}}>
            <div ref={mapContainer} className="map-container relative">
                <div className="sidebar absolute">
                    Longitude: {coordinates.long} | Latitude: {coordinates.lat}
                </div>
            </div>
        </div>
    );
}

export default PinCoordinates

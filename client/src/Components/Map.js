import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { LocationMarkerIcon } from '@heroicons/react/outline'

import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function Map({ searchResults, hoverLocation }) {
    // for the pop-up marker, passing the object
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults.map(result => ({
        longitude: result.coordinates.Longitude,
        latitude: result.coordinates.Latitude
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    useEffect(() => {
        setViewport({
            ...viewport,
            latitude: center.latitude,
            longitude: center.longitude
        })
    }, [searchResults])

    useEffect(() => {
        if (hoverLocation) {
            setSelectedLocation(hoverLocation)
        }
    }, [hoverLocation])

    return (
        <>
            {
                searchResults.length > 0
                    ?
                    (
                        <ReactMapGL
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                            {...viewport}
                            onViewportChange={(nextViewport) => setViewport(nextViewport)
                            }
                        >
                            {
                                searchResults.map(result => (
                                    <div key={result.coordinates.Longitude}>
                                        <Marker
                                            longitude={result.coordinates.Longitude}
                                            latitude={result.coordinates.Latitude}
                                            offsetLeft={0}
                                            offsetTop={0}
                                        >
                                            <p onClick={() => setSelectedLocation(result)} onMouseOver={() => {
                                                setSelectedLocation(result)
                                            }} className="cursor-pointer text-2xl ">
                                                <LocationMarkerIcon className="h-6 text-red-500 animate-bounce z-20" />
                                                {selectedLocation?.coordinates?.Longitude === result.coordinates.Longitude ? (
                                                    <p className="text-grey text-sm bg-black text-white rounded-full p-1 px-2 animate-pulse z-40">₹{result.price.adult}</p>
                                                ) : (
                                                    <p className="text-grey text-sm bg-white shadow-md rounded-full p-1 px-2 z-10">₹{result.price.adult}</p>
                                                )
                                                }

                                            </p>
                                        </Marker>

                                        {/* Popup to be shown once we click on the marker */}
                                        {selectedLocation?.coordinates?.Longitude === result.coordinates.Longitude ? (
                                            <Popup
                                                onClose={() => setSelectedLocation({})}
                                                closeOnClick={true}
                                                latitude={result.coordinates.Latitude}
                                                longitude={result.coordinates.Longitude}
                                                className="border border-white rounded-lg z-40"
                                            >
                                                <div>
                                                    {result.title}
                                                    <br />
                                                    ₹{result.price.adult} /night
                                                </div>
                                            </Popup>
                                        ) : (
                                            false
                                        )}
                                    </div>
                                ))
                            }
                        </ReactMapGL >
                    )
                    :
                    <></>
            }
        </>
    )
}

export default Map

import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { LocationMarkerIcon } from '@heroicons/react/outline'

function Map({ searchResults, hoverLocation }) {
    // for the pop-up marker, passing the object
    const [selectedLocation, setSelectedLocation] = useState({})

    // Transform the search result into latitude and longitude for geolib
    // { latitude: 52.4, longitude: 12.54}

    // Center of the searched results using geoLib
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
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
        if (hoverLocation) {
            setSelectedLocation(hoverLocation)
        }
    }, [hoverLocation])

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={0}
                        offsetTop={0}
                    >
                        <p onClick={() => setSelectedLocation(result)} onMouseOver={() => {
                            setSelectedLocation(result)
                        }} className="cursor-pointer text-2xl ">
                            <LocationMarkerIcon className="h-6 text-red-500 animate-bounce z-50" />
                            {selectedLocation.long === result.long ? (
                                <p className="text-grey text-sm bg-black text-white rounded-full p-1 px-2 animate-pulse z-50">₹{result.price}</p>
                            ) : (
                                <p className="text-grey text-sm bg-white shadow-md rounded-full p-1 px-2 ">₹{result.price}</p>
                            )
                            }

                        </p>
                    </Marker>

                    {/* Popup to be shown once we click on the marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            className="border border-white rounded-lg z-50"
                        >
                            <div>
                                {result.title}
                                <br />
                                ₹{result.price} /night
                            </div>
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map

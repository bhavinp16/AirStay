import React from 'react'
import PinCoordinates from '../Components/PinCoordinates'

function HostRoom() {
    return (
        <div>
            <h1 className="text-2xl font-bold p-4">Host A Room</h1>
            <section className="flex flex-col justify-center items-center">
                <b>Drap The Pin To Room Location:</b>
                <PinCoordinates />
            </section>
            <section>

            </section>
        </div>
    )
}

export default HostRoom

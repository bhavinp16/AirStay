import React, { useState, useEffect } from 'react'
import HeaderDark from '../Components/HeaderDark'
import BookingCard from '../Components/BookingCard'
import NProgress from 'nprogress';
import axios from 'axios';


function MyBooking() {
    const [SearchResults, setSearchResults] = useState([])

    useEffect(() => {
        const getBookings = async () => {
            NProgress.start();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            try {
                const ssearchResults = await axios.get(`http://localhost:3000/api/booking`, config);
                NProgress.done();
                setSearchResults(ssearchResults.data);
            } catch (err) {
                console.log(err);
                NProgress.done();
            }
        }

        getBookings();
    }, [])
    return (
        <div>
            <HeaderDark />
            <div className="flex flex-row justify-center align-center" style={{ "height": "660px" }}>
                <p className="flex flex-col justify-start mt-10 items-center text-3xl font-serif px-8 py-7"> My Bookings </p>
                <div className="flex flex-col m-2  overflow-scroll scrollbar-hide">
                    {
                        SearchResults.length > 0
                            ?
                            (   
                                <>
                                {
                                    SearchResults.map(({ _id, roomId, billingDetails }) => (
                                        <BookingCard
                                            bookingId={_id}
                                            roomId={roomId}
                                            billingDetails={billingDetails}
                                        />

                                    ))
                                }
                                </>
                )
                :
                <p className='text-2xl font-semibold mt-2 mb-6'>No Bookings Found</p>
                }

            </div>
        </div>
        </div >
    )
}

export default MyBooking

import React from 'react'
import HeaderDark from '../Components/HeaderDark'
import BookingCard from '../Components/BookingCard'
import { searchResults } from '../data'

function MyBooking() {
    let myDate = new Date();
    let date = myDate.getDate();
    let month = myDate.getMonth() + 1;
    let year = myDate.getFullYear();
    const bookings = [
        {
            roomId: '101',
            userId: 'Tiger',
            billingDetails: {

                price: 2300,
                duration: '6',
                dates: [`${date}/${month}/${year}`, `${date+6}/${month}/${year}`],
                guests: {
                    adult: 2,
                    children: 1,
                }

            },
        },
        {
            roomId: '102',
            userId: 'Ramesh',
            billingDetails: {

                price: 5470,
                duration: '3',
                dates: [`${date}/${month}/${year}`, `${date+3}/${month}/${year}`],
                guests: {
                    adult: 3,
                    children: 2,
                }

            },
        }
    ]
    return (
        <div>
            <HeaderDark />
            <div className="flex flex-row justify-center align-center" style={{ "height": "660px" }}>
                <p className="flex flex-col justify-start mt-10 items-center text-3xl font-serif px-8 py-7"> My Bookings </p>
                <div className="flex flex-col m-2 p-5 overflow-scroll scrollbar-hide">
                    {bookings.map(({ roomId, userId, billingDetails }) => (
                        <BookingCard
                            roomId={roomId}
                            userId={userId}
                            billingDetails={billingDetails}
                        />

                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyBooking

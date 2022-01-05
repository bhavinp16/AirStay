import Moment from 'moment'

function BookingCard({ bookingId, roomId, billingDetails }) {
    Moment.locale('en');
    return (

        <div className="p-4 mb-6 shadow-xl ">
            <div className=" w-full lg:max-w-full lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ "background-image": "url('/images/results/14.jpg')" }} title="house">
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b  lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-900 font-bold text-xl mb-2">Booking id: {bookingId.toUpperCase()}</div>
                        <p className="text-gray-700 text-base"><b>Adults: </b>{billingDetails.guests.adult} <b>Children: </b>{billingDetails.guests.children}</p>
                        <p className="text-gray-700 text-base">From <b>{Moment(billingDetails.dates[0]).format('DD/MM/YYYY')}</b> to <b>{Moment(billingDetails.dates[billingDetails.dates.length - 1]).format('DD/MM/YYYY')}</b> ({billingDetails.duration} days)</p>
                    </div>
                    <div className="">
                        <div className="text-l">
                            <p className="text-right text-gray-900 leading-none">Total cost</p>
                            <p className="text-right font-bold text-gray-600">₹{billingDetails.price}</p>
                            <p onClick={() => {
                                const win = window.open(`/room/${roomId}`, '_blank');
                                if (win != null) {
                                    win.focus();
                                }
                            } } className="text-blue-700 drop-shadow-md leading-none hover:text-gray-900" style={{cursor:'pointer'}}>See Room Details</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
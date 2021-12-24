

function BookingCard({ roomId, userId, billingDetails }) {
    return (

        <div className="p-10 mb-6 shadow-xl ">
            <div className=" w-full lg:max-w-full lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ "background-image": "url('/images/results/14.jpg')" }} title="house">
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b bg-red-400 lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-900 font-bold text-xl mb-2">Room: {roomId}</div>
                        <p className="text-gray-700 text-base"><b>Adults: </b>{billingDetails.guests.adult} <b>Children: </b>{billingDetails.guests.children}</p>
                        <p className="text-gray-700 text-base">From {billingDetails.dates[0]} to {billingDetails.dates[1]} ({billingDetails.duration} days)</p>
                    </div>
                    <div className="flex items-center">
                        <div className="text-l">
                            <p className="text-gray-900 leading-none">Total cost</p>
                            <p className="font-bold text-gray-600">₹{billingDetails.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
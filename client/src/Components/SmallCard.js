import { Link } from "react-router-dom";

function SmallCard({ img, location, distance }) {
    return (
        <Link to={`/search/${location}`} state={{ filtertype: null, startDate: "05 05 2021" , endDate: "06 05 2021", numberOfGuests: 1}} className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform duration-200 ease-out">
            {/* Left */}
            <div className="relative h-16 w-16">
                <img
                    className="rounded-lg"
                    src={img}
                    layout="fill"
                    alt="#"
                />
            </div>
            {/* Right */}
            <div>
                <h2>{location}</h2>
                <h3 className="text-gray-500">{distance}</h3>
            </div>
        </Link>
    )
}

export default SmallCard

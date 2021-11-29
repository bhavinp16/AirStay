import { Link } from "react-router-dom"

function MediumCard({ img, title }) {
    return (
        <Link to="/search/All" state={{ filtertype: title, startDate: "05 05 2021", endDate: "06 05 2021", numberOfGuests: 1 }} className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out hover:bg-grey-100">
            <div className="relative h-80 w-80">
                <img className="rounded-xl" src={img} layout="fill" alt="#" />
            </div>
            <h3 className="text-2xl mt-3">{title}</h3>
        </Link>
    )
}

export default MediumCard

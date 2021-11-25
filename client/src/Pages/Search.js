import { useState } from 'react'
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Footer from "../Components/Footer"
import HeaderSearch from "../Components/HeaderSearch"
import InfoCard from "../Components/InfoCard";
import Map from "../Components/Map";

//dummy data taken for now of London
const searchResults = [
    { "img": "/images/results/1.jpg", "location": "Private room in center of London", "title": "Stay at this spacious Edwardian House", "description": "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine", "star": 4.73, "price": "3000", "long": -0.0022275, "lat": 51.5421655 },
    { "img": "/images/results/11.jpg", "location": "Private room in center of London", "title": "Independant luxury studio apartment", "description": "2 guest · 3 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen", "star": 4.3, "price": "4300", "long": -0.095091, "lat": 51.48695 },
    { "img": "/images/results/14.jpg", "location": "Private room in center of London", "title": "London Studio Apartments", "description": "4 guest · 4 bedroom · 4 bed · 2 bathrooms · Free parking · Washing Machine", "star": 3.8, "price": "3500", "long": -0.135638, "lat": 51.521916 },
    { "img": "/images/results/4.jpg", "location": "Private room in center of London", "title": "30 mins to Oxford Street, Excel London", "description": "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine", "star": 4.1, "price": "5500", "long": -0.069961, "lat": 51.472618 },
    { "img": "/images/results/1.jpg", "location": "Private room in center of London", "title": "Spacious Peaceful Modern Bedroom", "description": "3 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Free parking · Dry Cleaning", "star": 5.0, "price": "6520", "long": -0.08472, "lat": 51.510794 },
    { "img": "/images/results/6.jpg", "location": "Private room in center of London", "title": "The Blue Room In London", "description": "2 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Washing Machine", "star": 4.23, "price": "6000", "long": -0.094116, "lat": 51.51401 },
    { "img": "/images/results/7.jpg", "location": "Private room in center of London", "title": "5 Star Luxury Apartment", "description": "3 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine", "star": 3.85, "price": "9000", "long": -0.109889, "lat": 51.521245 }
]

function Search() {
    let { location, startDate, endDate, numberOfGuests } = useParams();
    startDate = "05 05 2021"
    endDate = "06 05 2021"
    numberOfGuests = "2"

    const [selectedLocation, setselectedLocation] = useState();

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div className="h-screen">
            <HeaderSearch placeholder={`${location} | ${range} | ${numberOfGuests} guest${numberOfGuests > 1 ? 's' : ''}`} />

            <main className="flex" style={{
                height: "710px",
            }}>
                {/* left side of listings */}
                <section className="flex-grow pt-8 px-6 overflow-y-scroll scrollbar-hide" style={{
                    height: "700px",
                    overflow: "scroll",
                }}>
                    <p className="text-xs">
                        300+ Stays - {range} - for {numberOfGuests} guest{numberOfGuests > 1 ? 's' : ''}
                    </p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(({ img, location, title, description, star, price, total, long, lat }) => (
                            <div onMouseEnter={() => setselectedLocation({ long, lat })}>
                                <InfoCard
                                    key={img}
                                    img={img}
                                    location={location}
                                    title={title}
                                    description={description}
                                    star={star}
                                    price={price}
                                    total={parseFloat(price) * numberOfGuests}
                                />
                            </div>

                        ))}
                    </div>

                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px] overflow-y-scroll scrollbar-hide" style={{
                    height: "700px",
                    overflow: "scroll",
                }}>
                    <Map searchResults={searchResults} hoverLocation={selectedLocation} />

                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search

import { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Footer from "../Components/Footer"
import HeaderSearch from "../Components/HeaderSearch"
import InfoCard from "../Components/InfoCard";
import Map from "../Components/Map";
import { searchResults } from "../data";
import NProgress from 'nprogress';
import '../styles/nprogress.css'

import axios from 'axios';

function Search() {

    const locationobj = useLocation();
    var filtertype, startDate, endDate, numberOfGuests = null;
    locationobj.state ? { filtertype, startDate, endDate, numberOfGuests } = locationobj.state : filtertype = null;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    let { location } = useParams();

    const [selectedLocation, setselectedLocation] = useState();

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`


    useEffect(() => {
        const getRoomsByCity = async () => {
            NProgress.start();
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            try {
                const SearchResults = await axios.get(`http://localhost:3000/api/room/${location}`, config);
                NProgress.done();

                console.log(SearchResults);

            } catch (err) {
                console.log(err);
                NProgress.done();
            }
        }

        getRoomsByCity();
    }, [location])

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
                        {filtertype !== null ?
                            <button className="button bg-black text-white" onClick={(e) => {
                                e.target.classList.toggle("bg-black");
                                e.target.classList.toggle("text-white");
                            }}>{filtertype}</button>
                            : <></>
                        }
                        <button className="button" onClick={(e) => {
                            e.target.classList.toggle("bg-black");
                            e.target.classList.toggle("text-white");
                        }}>Cancellation Flexibility</button>
                        <button className="button" onClick={(e) => {
                            e.target.classList.toggle("bg-black");
                            e.target.classList.toggle("text-white");
                        }}>Type of Place</button>
                        <buttonp className="button" onClick={(e) => {
                            e.target.classList.toggle("bg-black");
                            e.target.classList.toggle("text-white");
                        }}>Price</buttonp>
                        <button className="button" onClick={(e) => {
                            e.target.classList.toggle("bg-black");
                            e.target.classList.toggle("text-white");
                        }}>Rooms and Beds</button>
                        <button className="button" onClick={(e) => {
                            e.target.classList.toggle("bg-black");
                            e.target.classList.toggle("text-white");
                        }}>More filters</button>
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(({ id, img, location, title, description, star, price, total, long, lat }) => (
                            <div onMouseEnter={() => setselectedLocation({ long, lat })}>
                                <InfoCard
                                    key={id}
                                    roomId={id}
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

import { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Footer from "../Components/Footer"
import HeaderSearch from "../Components/HeaderSearch"
import InfoCard from "../Components/InfoCard";
import Map from "../Components/Map";
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

    const [SearchResults, setSearchResults] = useState([]);


    useEffect(() => {
        const getRoomsByCity = async () => {
            NProgress.start();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            try {
                const ssearchResults = await axios.get(`http://localhost:3000/api/room/city/${location.toLowerCase()}`, config);
                NProgress.done();
                setSearchResults(ssearchResults.data);
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
                        {SearchResults?.length}+ Stays - {range} - for {numberOfGuests} guest{numberOfGuests > 1 ? 's' : ''}
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
                        <button className="button bg-black text-white" onClick={(e) => {
                            e.target.classList.toggle("bg-black");
                            e.target.classList.toggle("text-white");
                        }}>City</button>
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
                        {
                            SearchResults.length > 0
                                ?
                                SearchResults.map(({ _id, images, address, title, description, rating, price, coordinates }) => (
                                    <div onMouseEnter={() => setselectedLocation({
                                        coordinates: {
                                            Longitude: coordinates.Longitude,
                                            Latitude: coordinates.Latitude
                                        }
                                    })}>
                                        <InfoCard
                                            key={_id}
                                            roomId={_id}
                                            img={images[0]}
                                            location={address}
                                            title={title}
                                            description={description}
                                            star={rating}
                                            price={price.adult}
                                            total={parseFloat(price.adult) * numberOfGuests}
                                        />
                                    </div>
                                ))
                                :
                                <p className='text-2xl font-semibold mt-2 mb-6'>No Rooms Found</p>
                        }
                    </div>

                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px] overflow-y-scroll scrollbar-hide" style={{
                    height: "700px",
                    overflow: "scroll",
                }}>
                    <Map searchResults={SearchResults} hoverLocation={selectedLocation} />
                </section>
            </main>

            <Footer />
        </div >
    )
}

export default Search

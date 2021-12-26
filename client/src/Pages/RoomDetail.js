import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import HeaderDark from '../Components/HeaderDark';
import SearchBox from '../Components/Roomdetail/SearchBox'
import '../styles/SearchBox.css'
import '../styles/RoomDetail.css'
import Roombanner from '../Components/Roomdetail/Roombanner'
import { StarIcon, PhoneIcon, MailIcon, XIcon } from "@heroicons/react/solid";
import { roomdetailAmenities, roomdetailImages, roomdetailReviews, roomdetailDesc, roomdetailFeatures } from '../data'
import Reviews from '../Components/Roomdetail/Reviews'
import Features from '../Components/Roomdetail/Features'
import NProgress from 'nprogress';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import Footer from '../Components/Footer'
import Map from '../Components/Map';

function RoomDetail() {

    const [scrolled, setScrolled] = useState(false)
    const [showpopup, setshowpopup] = useState(false)
    const locationobj = useLocation();
    const [selectedLocation, setselectedLocation] = useState();
    const [SearchResults, setSearchResults] = useState([]);
    const [AmenitiesResults, setAmenitiesResults] = useState();
    const [HouseRulesResults, setHouseRulesResults] = useState();
    let { id } = useParams();

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    useEffect(() => {
        const getRoomsByCity = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                }
            };
            try {
                const RroomDetails = await axios.get(`http://localhost:3000/api/room/roomDetail/${id}`, config);
                setSearchResults(RroomDetails.data);
                console.log(RroomDetails.data);

                setAmenitiesResults(RroomDetails.data.amenties.split(','))
                setHouseRulesResults(RroomDetails.data.houseRules.split(','))
                // setselectedLocation({
                //     coordinates: {
                //         Longitude: RroomDetails.data.coordinates.Longitude,
                //         Latitude: RroomDetails.data.coordinates.Latitude
                //     }
                // })

            } catch (err) {
                console.log(err);

            }
        }

        getRoomsByCity();
    }, [id]);



    return (

        <div >
            {
                !scrolled ? <HeaderDark /> : <Header />
            }
            {

                <div className="max-w-[85rem] mx-auto px-8 sm:px-6 lg:px-10 py-10" style={{ padding: "6%", paddingTop: "0%" }}>
                    <div className="font-sans">
                        <div>
                            <div className="block mt-7 text-2xl font-semibold">
                                {SearchResults.title}
                            </div>
                            <div className="block mt-0 text-lg text-gray-600 font-semibold">
                                <p className="flex items-center">
                                    <StarIcon className="h-5 text-red-400" />
                                    {SearchResults.rating} · {SearchResults.address}· {SearchResults.landmark}· {SearchResults.city}· {SearchResults.state}
                                </p>
                            </div>
                            <br />
                            <div >
                                <Roombanner img={SearchResults.images} />
                            </div>
                        </div>
                        <div>
                            <div className="block mt-7 text-2xl text-gray-900 font-semibold">
                                Entire villa hosted by {roomdetailDesc.owner}
                            </div>

                            <div className="block mt-0 text-lg text-gray-600 ">
                                {roomdetailDesc.guests} guests · {roomdetailDesc.rooms}
                            </div>
                        </div>
                        <br />
                        <hr
                            style={{
                                color: '#E0E0E0',
                                backgroundColor: '#E0E0E0',
                                height: 3
                            }}
                        />
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">What this place offers</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div className="mt-4" style={{ paddingLeft:"10%" }}>
                                <h4 className="font-black text-gray-800 md:text-3xl mt-7" style={{ fontSize:"150%", fontWeight:"700" }}>Amenities</h4>
                                {AmenitiesResults?.map(item => (
                                    <div className="flex flex-col justify-center">
                                        <p className="p-3 pl-5 md:text-lg text-black-500 text-base">{item}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4" style={{ paddingLeft:"10%"}}>
                                <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7" style={{ fontSize:"150%", fontWeight:"700" }}>House Rules</h3>

                               
                                    {HouseRulesResults?.map(item => (
                                        <div className="flex flex-col justify-center">
                                            <p className="p-3 pl-5 md:text-lg text-blacks-500 text-base">{item}</p>
                                        </div>
                                    ))}
                                
                            </div>
                        </div>
                        <br />
                        <hr
                            style={{
                                color: '#E0E0E0',
                                backgroundColor: '#E0E0E0',
                                height: 3
                            }}
                        />
                        <br />
                        <div class="grid grid-cols-2 gap-4">
                            <div style={{ padding: "4%", paddingLeft: "2%" }}>
                                <div className="block text-2xl font-semibold">
                                    Hosted by {roomdetailDesc.owner}
                                </div>
                                <p className="md:text-lg text-gray-500 text-base" style={{ paddingBottom: "3%" }}>Joined in {roomdetailDesc.joindate}</p>
                                <p className="md:text-lg text-gray-900 text-base">{roomdetailDesc.abouthost}</p>

                            </div>
                            <div className="mt-7">
                                <SearchBox basePrice={100} adultPrice={200} childPrice={300} id={SearchResults._id} capacity={SearchResults.capacity} />
                            </div>
                        </div>
                        <hr
                            style={{
                                color: '#E0E0E0',
                                backgroundColor: '#E0E0E0',
                                height: 3
                            }}
                        />
                        <div>
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Where you will be</h3>
                            {/* <Map searchResults={SearchResults} hoverLocation={selectedLocation} /> */}

                        </div>
                        <br />
                        <hr
                            style={{
                                color: '#E0E0E0',
                                backgroundColor: '#E0E0E0',
                                height: 3
                            }}
                        />

                        <div>
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Reviews</h3>
                            <div class="grid grid-cols-2 gap-4">
                                {roomdetailReviews?.map(item => (
                                    <Reviews
                                        name={item.name}
                                        date={item.date}
                                        desc={item.desc}
                                    />
                                ))}

                            </div>
                        </div>
                        <br />
                        <br />
                        
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}

export default RoomDetail

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
    const [showreviews, setshowreviews] = useState(false)
    const locationobj = useLocation();
    const [selectedLocation, setselectedLocation] = useState();
    const [HostResults, setHostResults] = useState(null);
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

                const HhostDetails = await axios.get(`http://localhost:3000/api/auth/host/${RroomDetails.data.hostId}`, config);
                setHostResults(HhostDetails.data);
                console.log(HhostDetails.data);
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
                                {
                                    SearchResults?.images?.length > 0 ?
                                        <Roombanner img={SearchResults.images} />
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                        <div>
                            <div class="grid grid-cols-2 gap-4">
                                <div className="block mt-7 text-2xl text-gray-900 font-semibold">
                                    Entire villa hosted by {HostResults?.name}
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7" style={{ fontSize: "150%", fontWeight: "700", float: "right", paddingRight: "10%" }}>Rs 600/Day</h3>

                                </div>
                            </div>
                            <div style={{ clear: "both" }}></div>
                            <div className="block mt-0 text-lg text-gray-600 ">
                                {SearchResults.capacity?.adult} Adults · {SearchResults.capacity?.children} Children
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
                        <div class="grid grid-cols-2 gap-4">
                            <div className="mt-4" style={{ paddingLeft: "10%" }}>
                                <h4 className="font-black text-gray-800 md:text-3xl mt-7" style={{ fontSize: "150%", fontWeight: "700" }}>What this place offers</h4>
                                {AmenitiesResults?.map(item => (
                                    <div className="flex flex-col justify-center">
                                        <p className="p-3 pl-5 md:text-lg text-black-500 text-base">{item}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4" style={{ paddingLeft: "10%" }}>
                                <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7" style={{ fontSize: "150%", fontWeight: "700" }}>House Rules</h3>


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
                            <div style={{ padding: "4%", paddingLeft: "2%", paddingTop: "10%" }}>
                                <div className="block text-2xl font-semibold">
                                    Hosted by {roomdetailDesc.owner}
                                </div>
                                <p className="md:text-lg text-gray-500 text-base" style={{ paddingBottom: "3%" }}>Joined in {roomdetailDesc.joindate}</p>
                                <p className="md:text-lg text-gray-900 text-base">{roomdetailDesc.abouthost}</p>

                            </div>
                            <div className="mt-7">
                                {
                                    SearchResults.price ?

                                        <SearchBox adultPrice={SearchResults.price?.adult}
                                            childPrice={SearchResults.price?.children}
                                            id={SearchResults._id}
                                            capacityAdults={SearchResults.capacity?.adult}
                                            capacitychildren={SearchResults.capacity?.children} />
                                        :
                                        <div></div>
                                }
                            </div>
                        </div>
                        <hr
                            style={{
                                color: '#E0E0E0',
                                backgroundColor: '#E0E0E0',
                                height: 3
                            }}
                        />
                        <br />
                        <div>
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Where you will be</h3>
                            {/* <Map searchResults={SearchResults} hoverLocation={selectedLocation} /> */}

                        </div>
                        <br />
                        <br />
                        <hr
                            style={{
                                color: '#E0E0E0',
                                backgroundColor: '#E0E0E0',
                                height: 3
                            }}
                        />

                        <div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Reviews</h3>
                                </div>
                                <div className="mt-7">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ float: "right", marginRight: "15%" }} onClick={() => setshowreviews(!showreviews)}>
                                        {showreviews ?
                                            <div>
                                                Collapse Reviews
                                            </div>
                                            :
                                            <div>
                                                Add Reviews
                                            </div>
                                        }
                                    </button>
                                </div>

                            </div>
                            {showreviews ?
                                <div className='mt-7' style={{ fontSize: "150%" }}>
                                    <div className="bg-grey-lightest font-sans">
                                        <div className="row sm:flex">
                                            <div className="col sm:w-1/2" style={{ width: "90%" }}>
                                                <div className="box border rounded flex flex-col shadow bg-white">
                                                    <div className="box__title px-3 py-2 border-b" style={{ backgroundColor: "whitesmoke" }}><h3 class="text-2xl text-grey-darker font-medium">Add Review</h3></div>
                                                    <textarea placeholder="Enter your Review" rows="4" class="text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="tt" style={{ outline: "none", fontSize: "70%" }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-7">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: "75%" }}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                : null
                            }
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

import React from 'react'
import Header from '../Components/Header'
// import DatePicker from '../Components/DatePicker'
import SearchBox from '../Components/Roomdetail/SearchBox'
import '../styles/SearchBox.css'
import Roombanner from '../Components/Roomdetail/Roombanner'

import { roomdetailAmenities, roomdetailImages, roomdetailReviews, roomdetailDesc,roomdetailFeatures } from '../data'
import Reviews from '../Components/Roomdetail/Reviews'
import Features from '../Components/Roomdetail/Features'


function RoomDetail() {
    return (
        <div style={{ backgroundColor: "whitesmoke" }}>
            <Header />
            <div className="max-w-[85rem] mx-auto px-8 sm:px-6 lg:px-10 py-10" style={{ padding: "6%", paddingTop: "0%" }}>
                <div className="font-sans">
                    <div>
                        <div className="block mt-7 text-2xl font-semibold">
                            {/* {roomdetailDesc} */}
                            {roomdetailDesc.hotelname}
                        </div>
                        <div className="block mt-0 text-lg text-gray-600 font-semibold">
                            {roomdetailDesc.rating} · {roomdetailDesc.adrs}
                        </div>
                        <br />
                        <div >
                            <Roombanner img={roomdetailImages} />
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
                    <div class="grid grid-cols-2 gap-4">
                        
                        {roomdetailFeatures?.map(item => (
                            <Features  
                                title={item.title}
                                desc={item.desc} 
                            />
                        ))}
                    </div>
                    <br />
                    <div className="mt-7 pl-5">
                        <div class="grid grid-cols-2 gap-4 mt-7">
                            <div className="mt-7">
                                <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">What this place offers</h3>
                                <div className="mt-7">
                                    <div class="grid grid-cols-2">
                                        {roomdetailAmenities?.map(item => (
                                            <div className="flex flex-col justify-center p-2">
                                                <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button class="mt-7 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" style={{ width: "70%" }}>
                                        See All Amenities
                                    </button>
                                </div>

                            </div>
                            <div className="mt-7">
                                <SearchBox basePrice={100} />
                            </div>
                        </div>

                    </div>
                    <br />
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
                    <hr
                        style={{
                            color: '#E0E0E0',
                            backgroundColor: '#E0E0E0',
                            height: 3
                        }}
                    />
                    <div>
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Where you will be</h3>
                        MAP

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
                        <div style={{ padding: "4%", paddingLeft: "12%", paddingTop: "17%" }}>
                            <p className="md:text-lg text-gray-900 text-base">Response rate: 100%</p>
                            <p className="md:text-lg text-gray-900 text-base">Response time: within an hour</p>
                            <button class="mt-7 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Contact Host
                            </button>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default RoomDetail

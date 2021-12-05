import React from 'react'
import Header from '../Components/Header'
import DatePicker from '../Components/DatePicker'
import SearchBox from '../Components/SearchBox'

import '../styles/SearchBox.css'


function RoomDetail() {
    return (
        <div style={{backgroundColor:"whitesmoke"}}>
            <Header />
            <div className="max-w-[85rem] mx-auto px-8 sm:px-6 lg:px-10 py-10" style={{padding:"6%",paddingTop:"0%"}}>
                <div className="font-sans">
                    <div>
                        <div className="block mt-7 text-2xl font-semibold">
                            Lonavala Villas - The Serenity Villa - 3BHK
                        </div>
                        <div className="block mt-0 text-lg text-gray-600 font-semibold">
                            4.71 (120 reviews) · Lonavala, Maharashtra, India
                        </div>
                        <br />
                        <div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <img src="/images/roomdetails/lonavala.jpg" alt="#"
                                    className="img-fluid shadow-inner"
                                    style={{
                                        width: '100%',
                                        height: '440px',
                                        borderTopLeftRadius:"40px",
                                        borderBottomLeftRadius:"40px"
                                    }} />
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <img src="/images/roomdetails/lonavala.jpg" alt="#"
                                        className="img-fluid shadow-inner"
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                        }} />
                                    </div>
                                    <div>
                                        <img src="/images/roomdetails/lonavala.jpg" alt="#"
                                        className="img-fluid shadow-inner"
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                            borderTopRightRadius:"40px",
                                        }} />
                                    </div>
                                    <div>
                                        <img src="/images/roomdetails/lonavala.jpg" alt="#"
                                        className="img-fluid shadow-inner"
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                        }} />
                                    </div>
                                    <div>
                                        <img src="/images/roomdetails/lonavala.jpg" alt="#"
                                        className="img-fluid shadow-inner"
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                            borderBottomRightRadius:"40px",
                                        }} />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="block mt-7 text-2xl text-gray-900 font-semibold">
                            Entire villa hosted by Vishal
                        </div>
                        
                        <div className="block mt-0 text-lg text-gray-600 ">
                            12 guests · 3 bedrooms · 3 beds · 3 bathrooms
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
                        <div>
                            <div className="flex flex-col justify-center mt-7" style={{width:"90%",height:"100px"}}>
                                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"200px"}}>
                                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">Entire home</h3>
                                        <p className="md:text-lg text-gray-500 text-base">You’ll have the villa to yourself.</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col justify-center mt-7" style={{width:"90%",height:"100px"}}>
                                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"200px"}}>
                                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">Entire home</h3>
                                        <p className="md:text-lg text-gray-500 text-base">You’ll have the villa to yourself.</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col justify-center mt-7" style={{width:"90%",height:"100px"}}>
                                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"200px"}}>
                                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">Entire home</h3>
                                        <p className="md:text-lg text-gray-500 text-base">You’ll have the villa to yourself.</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col justify-center mt-7" style={{width:"90%",height:"100px"}}>
                                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"200px"}}>
                                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">Entire home</h3>
                                        <p className="md:text-lg text-gray-500 text-base">You’ll have the villa to yourself.</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="mt-7 pl-5">
                        <div class="grid grid-cols-2 gap-4 mt-7">
                            <div className="mt-7">
                                <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">What this place offers</h3>
                                <div className="mt-7">
                                    <div class="grid grid-cols-2">
                                        <div className="flex flex-col justify-center p-2">
                                            <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">Kitchen</p>
                                        </div>
                                        <div className="flex flex-col justify-center p-2">
                                            <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">Kitchen</p>
                                        </div>
                                        <div className="flex flex-col justify-center p-2">
                                            <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">Kitchen</p>
                                        </div>
                                        <div className="flex flex-col justify-center p-2">
                                            <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">Kitchen</p>
                                        </div>
                                        <div className="flex flex-col justify-center p-2">
                                            <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">Kitchen</p>
                                        </div>
                                        <div className="flex flex-col justify-center p-2">
                                            <p className="p-3 pl-5 md:text-lg text-gray-500 text-base">Kitchen</p>
                                        </div>
                                    
                                    </div>
                                    <button class="mt-7 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" style={{width:"70%"}}>
                                        See All Amenities
                                    </button>
                                </div>
                                
                            </div>
                            <div className="mt-7">
                                <SearchBox />
                            </div>
                        </div>           
                    
                    </div>
                    <br />
                    <div>
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Reviews</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div >
                                <div className="flex flex-col justify-center mt-7">
                                    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"300px"}}>
                                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">Mugdha</h3>
                                            November 2021
                                            <p className="md:text-lg text-gray-500 text-base">We really enjoyed our stay in the serenity villa.. all of us loved the property, the outdoor games as well the carrom, indoors..
    The Villa is nicely designed.. especially loved the tall windows in the living room.</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="flex flex-col justify-center mt-7">
                                    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"300px"}}>
                                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">Mugdha</h3>
                                            November 2021
                                            <p className="md:text-lg text-gray-500 text-base">We really enjoyed our stay in the serenity villa.. all of us loved the property, the outdoor games as well the carrom, indoors..
    The Villa is nicely designed.. especially loved the tall windows in the living room.</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="flex flex-col justify-center mt-7">
                                    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"300px"}}>
                                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">Mugdha</h3>
                                            November 2021
                                            <p className="md:text-lg text-gray-500 text-base">We really enjoyed our stay in the serenity villa.. all of us loved the property, the outdoor games as well the carrom, indoors..
    The Villa is nicely designed.. especially loved the tall windows in the living room.</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="flex flex-col justify-center mt-7">
                                    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{width:"90%",height:"300px"}}>
                                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{width:"100%"}}>
                                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">Mugdha</h3>
                                            November 2021
                                            <p className="md:text-lg text-gray-500 text-base">We really enjoyed our stay in the serenity villa.. all of us loved the property, the outdoor games as well the carrom, indoors..
    The Villa is nicely designed.. especially loved the tall windows in the living room.</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl mt-7">Where you’ll be</h3>
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
                        <div style={{padding:"4%",paddingLeft:"2%"}}>
                            <div className="block text-2xl font-semibold">
                                Hosted by Vishal
                            </div>
                            <p className="md:text-lg text-gray-500 text-base" style={{paddingBottom:"3%"}}>Joined in July 2017</p>
                            <p className="md:text-lg text-gray-900 text-base">I am a Chartered Accountant by qualification - was always interested in Hospitality as an Industry. I along with a few friends, started a hospitality firm in the name and style - SEVEN SANDS VILLE wherein we tried to understand the basic needs and expectations when a guest reserves a Villa. We focused on guest experience by concentrating on the core operations and recruiting the operations team from</p>
                                        
                        </div>
                        <div style={{padding:"4%",paddingLeft:"12%",paddingTop:"17%"}}>
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

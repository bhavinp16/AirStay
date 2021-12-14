import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import SmallCard from '../Components/SmallCard'
import MediumCard from '../Components/MediumCard'
import LargeCard from '../Components/LargeCard'
import HeaderDark from '../Components/HeaderDark'

import { exploreData, cardsData } from '../data'

function Home() {
    const [scrolled, setScrolled] = useState(false)

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

    return (
        <div className="">
            {
                !scrolled ? <HeaderDark /> : <Header />
            }
            <div className="bg-black w-full p-1 pb-3">
                <div className="max-w-8xl mx-auto px-8 sm:px-16">
                    <Banner />
                </div>
            </div>
            <main className="max-w-8xl mx-auto px-8 sm:px-16">
                <section className="pt-6">
                    <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

                    {/* Pull the data from the server - static rendering for the front page */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {exploreData?.map(item => (
                            <SmallCard
                                key={item.location}
                                img={item.img}
                                distance={`${item.distance} hours drive`}
                                location={item.location}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
                    <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
                        {cardsData?.map(item => (
                            <MediumCard
                                key={item.title}
                                img={item.img}
                                title={item.title}
                            />
                        ))}
                    </div>
                </section>

                <LargeCard
                    img="/images/outdoor.jpg"
                    title="The Greatest Outdoors"
                    description="Wishlists curated by AirStay"
                    buttonText="Get Inspired"
                />
            </main>

            <Footer />

        </div>
    )
}

export default Home

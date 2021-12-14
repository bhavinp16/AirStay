import React from 'react'
import HeaderDark from '../Components/HeaderDark'
import InfoCard from '../Components/InfoCard'
import { searchResults } from '../data'

function Wishlist() {
    return (
        <div>
            <HeaderDark />
            <div className="flex flex-row justify-center align-center" style={{ "height": "660px" }}>
                <p className="flex flex-col justify-start mt-10 items-center text-3xl font-serif px-8 py-7"> My Wishlist </p>
                <div className="flex flex-col m-2 p-5 overflow-scroll scrollbar-hide">
                    {searchResults.map(({ id, img, location, title, description, star, price, total, long, lat }) => (
                        <div>
                            <InfoCard
                                key={id}
                                roomId={id}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={parseFloat(price) * 1}
                            />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist

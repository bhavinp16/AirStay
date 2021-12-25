import { useState, useEffect } from 'react'
import HeaderDark from '../Components/HeaderDark'
import InfoCard from '../Components/InfoCard'
import NProgress from 'nprogress';
import axios from 'axios';

function MyWishlist() {

    const [SearchResults, setSearchResults] = useState([])

    useEffect(() => {
        const getRoomsForWishlist = async () => {
            NProgress.start();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            try {
                const ssearchResults = await axios.get(`http://localhost:3000/api/room/wishlist`, config);
                NProgress.done();
                setSearchResults(ssearchResults.data);
            } catch (err) {
                console.log(err);
                NProgress.done();
            }
        }

        getRoomsForWishlist();
    }, [])

    return (
        <div>
            <HeaderDark />
            <div className="flex flex-row justify-center align-center" style={{ "height": "660px" }}>
                <p className="flex flex-col justify-start mt-10 items-center text-3xl font-serif px-8 py-7"> My Wishlist </p>
                <div className="flex flex-col m-2 p-5 overflow-scroll scrollbar-hide">
                    {
                        SearchResults.length > 0
                            ?
                            SearchResults.map(({ _id, images, address, title, description, rating, price }) => (
                                <div>
                                    <InfoCard
                                        key={_id}
                                        roomId={_id}
                                        img={"/images/results/14.jpg"}
                                        location={address}
                                        title={title}
                                        description={description}
                                        star={rating}
                                        price={price.adult}
                                        total={parseFloat(price.adult)}
                                    />
                                </div>
                            ))
                            :
                            <p className='text-2xl font-semibold mt-2 mb-6'>No Rooms Found</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyWishlist

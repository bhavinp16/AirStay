import { useState, useEffect } from 'react'
import HeaderDark from '../Components/HeaderDark'
import InfoCard from '../Components/InfoCard'
import NProgress from 'nprogress';
import axios from 'axios';


function CurratedList() {

    const [SearchResults, setSearchResults] = useState([])

    useEffect(() => {
        const getRoomsForCurratedlist = async () => {
            NProgress.start();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            try {
                const ssearchResults = await axios.get(`/api/room/curratedlist`, config);
                NProgress.done();
                setSearchResults(ssearchResults.data);
            } catch (err) {
                console.log(err);
                NProgress.done();
            }
        }

        getRoomsForCurratedlist();
    }, [])

    return (
        <div>
            <HeaderDark />
            <div className="flex flex-row justify-center align-center" style={{ "height": "660px" }}>
                <p className="flex flex-col justify-start mt-10 items-center text-3xl font-serif px-8 py-7"> Currated List By AirStay </p>
                <div className="flex flex-col m-2 p-5 overflow-scroll scrollbar-hide">
                    {
                        SearchResults.length > 0
                            ?
                            SearchResults.map(({ _id, images, address, title, description, rating, price }) => (
                                <div>
                                    <InfoCard
                                        key={_id}
                                        roomId={_id}
                                        img={images[0]}
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

export default CurratedList;

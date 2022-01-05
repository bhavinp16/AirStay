import { useContext } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import axios from 'axios';
import NProgress from "nprogress";
import { useToasts } from 'react-toast-notifications';
import usercontext from '../Context/User/usercontext';


function InfoCard({ roomId, img, location, title, description, star, price, total }) {
    const { addToast } = useToasts();

    const context = useContext(usercontext)
    const { user, setuser } = context;

    const reqobj = {
        roomId: roomId,
    }

    const toogleWishlist = async () => {
        NProgress.start();

        // if roomId in wishlistedId
        if (user.wishlistRoomIds.includes(roomId)) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }
                }

                // Remove room from users wishlist in mongodb
                const res = await axios.put('http://localhost:3000/api/room/wishlist', JSON.stringify(reqobj), config)
                if (res.status === 200) {
                    // remove roomid from wishlistedId
                    setuser({
                        ...user,
                        wishlistRoomIds: user.wishlistRoomIds.filter(id => id !== roomId)
                    })

                    addToast("Room removed from Wishlist", { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1500 });

                    NProgress.done();
                }
            } catch (err) {
                console.log(err);
                addToast("Server Error", { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
                NProgress.done();
            }
        }
        else {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }
                }

                // add room to users wishlist in mongodb
                const res = await axios.post('http://localhost:3000/api/room/wishlist', JSON.stringify(reqobj), config)

                if (res.status === 200) {
                    setuser({
                        ...user,
                        wishlistRoomIds: [...user.wishlistRoomIds, roomId]
                    })

                    addToast("Room added to Wishlist", { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1500 });

                    NProgress.done();
                }
            } catch (err) {
                console.log(err);
                addToast("Server Error", { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
                NProgress.done();
            }
        }

    }

    return (
        <div className="flex py-7 px-2 pr-4 border-b cursor-pointer rounded-lg hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first: border-t">
            <div onClick={() => {
                const win = window.open(`/room/${roomId}`, '_blank');
                if (win != null) {
                    win.focus();
                }
            }} className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <img className="rounded-2xl" style={{
                    height: "220px",
                    width: "720px",
                    objectFit: "cover"
                }} layout="fill" src={img} alt="Room Img #" />
            </div>
            <div className="flex flex-col flex-grow pl-5">

                <div className="flex justify-between">
                    <div onClick={() => {
                        const win = window.open(`/room/${roomId}`, '_blank');
                        if (win != null) {
                            win.focus();
                        }
                    }}>{location}</div>

                    {
                        user.wishlistRoomIds.includes(roomId) ?
                            <HeartIcon className="h-7 text-red-500 cursor-pointer z-40" onClick={toogleWishlist} />
                            :
                            <HeartIcon className="h-7 text-gray-800 cursor-pointer z-40" onClick={toogleWishlist} />
                    }

                </div>

                <h4 onClick={() => {
                    const win = window.open(`/room/${roomId}`, `Room ${roomId}`);
                    if (win != null) {
                        win.focus();
                    }
                }} className="text-xl">{title}</h4>
                <div className="border-b w-10 pt-2" />
                <div onClick={() => {
                    const win = window.open(`/room/${roomId}`, "RoomDetail");
                    if (win != null) {
                        win.focus();
                    }
                }} className="pt-2 text-sm text-gray-500 flex-grow">{description}</div>
                <div onClick={() => {
                    const win = window.open(`/room/${roomId}`, '_blank');
                    if (win != null) {
                        win.focus();
                    }
                }} className="flex justify-between items-end">
                    <p className="flex items-center">
                        <StarIcon className="h-5 text-red-400" />
                        {star}
                    </p>
                    <div onClick={() => {
                        const win = window.open(`/room/${roomId}`, '_blank');
                        if (win != null) {
                            win.focus();
                        }
                    }}>
                        <p className="text-lg lg:text-xl font-semibold pb-2">₹{price} / night</p>
                        <p className="text-right font-extralight">₹{total} total</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InfoCard

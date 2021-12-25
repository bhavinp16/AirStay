import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

function InfoCard({ roomId, img, location, title, description, star, price, total }) {
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
                }} layout="fill" src={img} alt="#" />
            </div>
            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <div onClick={() => {
                        const win = window.open(`/room/${roomId}`, '_blank');
                        if (win != null) {
                            win.focus();
                        }
                    }}>{location}</div>
                    <HeartIcon className="h-7 cursor-pointer z-40" onClick={(e) => { e.target.classList.toggle("text-red-500") }} />
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

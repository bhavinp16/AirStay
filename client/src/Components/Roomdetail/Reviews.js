import { StarIcon } from "@heroicons/react/solid"

function Reviews({ name, date, desc, rat }) {
    return (
        <div >
            <div className="flex flex-col justify-center mt-7">
                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white" style={{ width: "90%", height: "300px" }}>
                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3" style={{ width: "100%" }}>
                        <div className="flex justify-between">
                            <h3 className="flex font-black text-gray-800 md:text-3xl text-xl">{name}</h3>
                            <p className="flex items-center">
                                <StarIcon className="h-5 text-red-400" />{rat}
                            </p>
                        </div>
                        <b>{date}</b>
                        <p className="md:text-lg text-gray-500 text-base">{desc}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews

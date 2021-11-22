import { GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon, SearchIcon } from '@heroicons/react/solid'
import { useState } from "react"
import { DateRange, DateRangePicker } from 'react-date-range';
import { useMediaQuery } from "@react-hook/media-query";
import { useNavigate } from "react-router-dom"

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


function HeaderDark({ placeholder }) {
    // STATE FOR REACT
    const [searchInput, setSearchInput] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date()) //need to fix to tomorrow's date
    const [numberOfGuests, setNumberOfGuests] = useState(1);

    const navigate = useNavigate()

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        navigate({
            replace: true,
            pathname: "/search",
            location: searchInput,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            numberOfGuests,
        })
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
        minDate: new Date()
    }

    //listen to small screen change for date picker
    const isSmallScreen = useMediaQuery("(max-width: 36rem)");

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-black shadow-md py-2 px-5 md:px-10">
            {/* Left */}
            <div onClick={() => navigate({ pathname: "/", replace: true })} className='relative flex items-center h-10 cursor-pointer my-auto'>
                <img
                    src="/Logo1.png"
                    layout="fill"
                    alt="#"
                    style={{ height: "40px", width: "100px" }}
                />
            </div>

            {/* Middle */}
            <div className="flex items-center md:border-1 rounded-full py-2 md:shadow-sm bg-white">
                <input
                    value={searchInput}
                    onChange={handleInputChange}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-grey-600 placeholder-gray-400"
                    type="text"
                    placeholder={placeholder || "Start your search"}
                />
                <SearchIcon
                    className="hidden md:inline-flex h-8 bg-blue-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
                    onClick={search}
                />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-200">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            {/* Date picker range */}
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-5 bg-white border rounded-xl p-5"
                    style={{
                        position: "absolute",
                        top: "80%",
                        left: "25%",
                    }}>
                    {isSmallScreen ? (
                        <DateRange
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={["#60a5fa"]}
                            onChange={handleSelect}
                        />
                    ) : (
                        <DateRangePicker
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={["#60a5fa"]}
                            onChange={handleSelect}
                        />
                    )}
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>
                        <UsersIcon className="h-5" />
                        <input
                            value={numberOfGuests}
                            onChange={event => setNumberOfGuests(event.target.value)}
                            className="w-12 pl-2 text-lg outline-none text-blue-400"
                            type="number"
                            min={1}
                        />
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-blue-400">Search</button>
                    </div>
                </div>
            )}

        </header>
    )
}

export default HeaderDark

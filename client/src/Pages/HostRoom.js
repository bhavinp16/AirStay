import React, {useState, useEffect } from 'react'
import PinCoordinates from '../Components/PinCoordinates'
import Header from '../Components/Header';
import HeaderDark from '../Components/HeaderDark';

const mystyle = {
  background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
};

function HostRoom() {
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
    <>
      {
        !scrolled ? <HeaderDark /> : <Header />
      }
      <div style={mystyle}>
        <center>
          <h1 className="text-3xl text-white font-bold p-4 ">Host A Room</h1>
        </center>
        <section className="flex flex-col justify-center items-center">
          <form className="w-1/2">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-title">
                  Title
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text" placeholder="Title for your room" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-roomtype">
                  Room Type
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-roomtype">
                    <option>Type 1</option>
                    <option>Type 2</option>
                    <option>Type 3</option>
                    <option>Type 3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-desc">
                  Description
                </label>
                <textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-desc" type="text" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-capacitya">
                  Capacity (adults)
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-capacitya" type="number" min={1} step={1} placeholder="1" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-pricea">
                  Price/person
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-pricea" type="number" min={500} step={100} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-capacityc">
                  Capacity (children)
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-capacityc" type="number" min={0} step={1} placeholder="0" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-pricec">
                  Price/child
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-pricec" type="number" min={500} step={100} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-fromdate">
                  From
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-fromdate" type="date" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-todate">
                  To
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-todate" type="date" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-houserules">
                  House Rules
                </label>
                <textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-houserules" type="text" placeholder="Provide basic house rules" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-amenties">
                  Amenties
                </label>
                <textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-amenties" type="text" placeholder="Provide list of Amenties you are offering" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-amenties">
                  Add photos
                </label>
                <input class="block h-12 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 border-2 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="user_avatar" type="file" multiple />
                <div class="mt-1 text-sm text-gray-400 dark:text-black-300" id="user_avatar_help">Upload photos that describe your room</div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-address">
                  Address
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder="Address" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-landmark">
                  Landmark
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-landmark" type="text" placeholder="Landmark" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-city">
                  City
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="City" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white text-s font-bold mb-2" for="grid-state">
                  State
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="text" placeholder="State" />
              </div>
            </div>
          </form>
        </section>
        <section className="flex flex-col justify-center items-center"><br></br>
          <b className='text-white'>Drag The Pin To Room Location:</b>
          <PinCoordinates />

        </section>
        <section>

        </section>
      </div>
    </>
  )
}

export default HostRoom

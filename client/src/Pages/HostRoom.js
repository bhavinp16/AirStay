import React, { useCallback, useState, useEffect } from 'react'
import PinCoordinates from '../Components/PinCoordinates'
import HeaderDark from '../Components/HeaderDark';
import moment from 'moment';
import '../styles/titlestyle.css';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import NProgress from 'nprogress';
import { Navigate } from 'react-router-dom';

const mystyle = {
	// background: " linear-gradient(315deg, #2d3436 0%, #000000 74%)",
	background: "linear-gradient(260deg, #04619f 0%, #000000 70%)",
	border: "1px solid #000000",
	borderRadius: "50px",
};

function HostRoom() {
	const { addToast } = useToasts();

	const initialState = {
		title: '',
		roomType: 'Single',
		description: '',
		capacity: {
			adult: 1,
			children: 1,
		},
		price: {
			adult: 0,
			children: 0,
		},
		houseRules: '',
		amenties: '',
		images: [],
		address: '',
		landmark: '',
		city: '',
		state: '',
		rating: 4, //default rating
	};

	const [formDetails, setformDetails] = useState(initialState);

	const [availableDates, setavailableDates] = useState([]);

	const [coordinates, setcoordinates] = useState({
		Longitude: null,
		Latitude: null,
	});

	const handleFileChange = (e) => {
		e.preventDefault();
		const files = e.target.files;
		setformDetails({ ...formDetails, images: files });
	}

	const handleChange = (e) => {
		setformDetails({
			...formDetails,
			[e.target.name]: e.target.value,
		});
	};

	const [dates, setdates] = useState({
		startDate: moment(new Date()).format("YYYY-MM-DD"),
		endDate: moment(new Date()).add(1, 'days').format("YYYY-MM-DD"),
	});

	// Dates
	const calculateDateArray = (startDate, endDate) => {
		let dateArray = [];
		let currentDate = moment(startDate);
		let end = moment(endDate);
		while (currentDate <= end) {
			dateArray.push(currentDate.format('YYYY-MM-DD'));
			currentDate = currentDate.add(1, 'days');
		}
		return dateArray;
	};

	useEffect(() => {
		if (dates.startDate && dates.endDate) {
			const datearray = calculateDateArray(dates.startDate, dates.endDate);
			setavailableDates(datearray);
		}
	}, [dates])

	const handleDateChange = (e) => {
		setdates({
			...dates,
			[e.target.name]: e.target.value,
		});
	}

	// On form submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', formDetails.title);
		formData.append('roomType', formDetails.roomType);
		formData.append('description', formDetails.description);
		formData.append('capacityAdult', formDetails.capacity.adult);
		formData.append('capacityChildren', formDetails.capacity.children);
		formData.append('priceAdult', formDetails.price.adult);
		formData.append('priceChildren', formDetails.price.children);
		formData.append('houseRules', formDetails.houseRules);
		formData.append('amenties', formDetails.amenties);
		formData.append('address', formDetails.address);
		formData.append('landmark', formDetails.landmark);
		formData.append('city', formDetails.city);
		formData.append('state', formDetails.state);
		formData.append('coordinatesLong', coordinates.Longitude);
		formData.append('coordinatesLat', coordinates.Latitude);
		formData.append('rating', formDetails.rating);

		for (let i = 0; i < availableDates.length; i++) {
			formData.append('availableDates', availableDates[i]);
		}

		for (let i = 0; i < formDetails.images.length; i++) {
			formData.append('image', formDetails.images[i]);
		}

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'x-auth-token': localStorage.getItem('token'),
			},
		};
		try {
			NProgress.start()
			await axios.post('/api/room/', formData, config);

			addToast("Room Added Successfully", { appearance: 'success', autoDismiss: true });

			setformDetails(initialState);
			setdates({
				startDate: moment(new Date()).format("YYYY-MM-DD"),
				endDate: moment(new Date()).add(1, 'days').format("YYYY-MM-DD"),
			});

			NProgress.done()

			// navigate to home page
			Navigate(`/search/${formDetails.city}`);

		} catch (err) {
			console.log(err);
			addToast("Failed To Add Room", { appearance: 'error', autoDismiss: true });
		}
	};


	// to pass data from child to parent component in passing coordinates
	const getData = useCallback(
		(val) => {
			setcoordinates({
				Longitude: val.long,
				Latitude: val.lat,
			})
		},
		[],
	);


	return (
		<>
			<HeaderDark />
			<div className="bg-black flex flex-row justify-center align-center" style={{ "height": "681px" }}>
				<main id='titlestylem'>
					<span id='titlestyles'><p id='titlestylep'>Host A Room</p></span>
				</main>
				<div className="flex flex-col m-2 overflow-scroll scrollbar-hide" style={{ "height": "640px" }}>
					<div style={mystyle}>
						<center>
							<h1 className="text-3xl text-white font-bold p-4 ">Enter Room Details</h1>
						</center>
						<section className="flex flex-col justify-center items-center">
							<form className="w-3/4">
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-title">
											Title
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text" placeholder="Title for your room"
											name="title" onChange={handleChange} value={formDetails.title}
										/>
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-roomtype">
											Room Type
										</label>
										<div className="relative">
											<select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-roomtype"
												name='roomType' onChange={handleChange} value={formDetails.roomType}>
												<option>Single</option>
												<option>Double</option>
												<option>Triple</option>
												<option>Quad</option>
												<option>King</option>
												<option>Queen</option>
												<option>Twin</option>
											</select>
											<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
												<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-desc">
											Description
										</label>
										<textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-desc" type="text"
											name='description' onChange={handleChange} value={formDetails.description}
										/>
									</div>
								</div>

								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-capacitya">
											Capacity (adults)
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-capacitya" type="number" min={1} step={1} placeholder="1"
											name='capacity.adult'
											onChange={(e) => {
												setformDetails({
													...formDetails,
													capacity: {
														...formDetails.capacity,
														adult: parseInt(e.target.value)
													}
												})
											}}
											value={formDetails.capacity.adult}
										/>
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-pricea">
											Price/person
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-pricea" type="number" min={500} step={100}
											name='price.adult'
											onChange={(e) => {
												setformDetails({
													...formDetails,
													price: {
														...formDetails.price,
														adult: parseInt(e.target.value)
													}
												})
											}} value={formDetails.price.adult}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-capacityc">
											Capacity (children)
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-capacityc" type="number" min={0} step={1} placeholder="0"
											name='capacity.children'
											onChange={(e) => {
												setformDetails({
													...formDetails,
													capacity: {
														...formDetails.capacity,
														children: parseInt(e.target.value)
													}
												})
											}}
											value={formDetails.capacity.children}
										/>
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-pricec">
											Price/child
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-pricec" type="number" min={500} step={100}
											name='price.children'
											onChange={(e) => {
												setformDetails({
													...formDetails,
													price: {
														...formDetails.price,
														children: parseInt(e.target.value)
													}
												})
											}}
											value={formDetails.price.children}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-fromdate">
											From
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-fromdate" type="date"
											name='startDate' onChange={handleDateChange} value={dates.startDate}
										/>
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-todate">
											To
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-todate" type="date"
											name='endDate' onChange={handleDateChange} value={dates.endDate}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-houserules">
											House Rules
										</label>
										<textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-houserules" type="text" placeholder="Provide basic house rules, Enter Comma separated values"
											name='houseRules' onChange={handleChange} value={formDetails.houseRules}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-amenties">
											Amenties
										</label>
										<textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-amenties" type="text" placeholder="Provide list of Amenties you are offering, Enter Comma separated values"
											name='amenties' onChange={handleChange} value={formDetails.amenties}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-amenties">
											Add photos
										</label>
										<input className="block h-12 w-full text-sm text-gray-900 border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 border-2 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="user_avatar" type="file" multiple
											name='images' onChange={handleFileChange}
										/>
										<div className="mt-1 text-sm text-gray-400 dark:text-black-300" id="user_avatar_help">Upload photos that describe your room</div>
									</div>
								</div>

								<div className="flex flex-wrap -mx-3 mb-2">
									<div className="w-full md:w-3/3 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-address">
											Address
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder="Address"
											name='address' onChange={handleChange} value={formDetails.address}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-2">
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-landmark">
											Landmark
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-landmark" type="text" placeholder="Landmark"
											name='landmark' onChange={handleChange} value={formDetails.landmark}
										/>
									</div>
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-city">
											City
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="City"
											name='city' onChange={handleChange} value={formDetails.city}
										/>
									</div>
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label className="block tracking-wide text-white text-s font-bold mb-2" htmlFor="grid-state">
											State
										</label>
										<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="text" placeholder="State"
											name='state' onChange={handleChange} value={formDetails.state}
										/>
									</div>
								</div>
							</form>
						</section>
						<section className="flex flex-col justify-center items-center"><br></br>
							<b className='text-white'>Drag The Pin To Room Location:</b>
							<PinCoordinates sendData={getData} />

						</section>
						<div className="flex mt-7 justify-center w-full">
							<button
								className="mr-5 mb-5 w-64 bg-transparent border-2 px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 hover:bg-gray-500"
								type='button'
								onClick={() => {
									setformDetails(initialState);
									setdates({
										startDate: null,
										endDate: null,
									});
								}}
							>
								Reset
							</button>

							<button
								className="ml-5 mb-5 w-64 bg-blue-400 border-2 px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105
						hover:bg-blue-600 hover:text-white"
								type='button'
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HostRoom


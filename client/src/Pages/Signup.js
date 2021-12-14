import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import usercontext from '../Context/User/usercontext';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import { useToasts } from 'react-toast-notifications';

const mystyle = {
	backgroundColor: 'black',
	padding: "10px",
	fontFamily: "Arial",
	minHeight: "100vh",
};

function Signup() {

	const { addToast } = useToasts();

	const context = useContext(usercontext);
	const { setuser } = context;

	const initialState = {
		email: '',
		password: '',
		name: '',
		phone: '',
	}

	const [formdata, setformdata] = useState(initialState);

	const handlechange = (e) => {
		setformdata({
			...formdata,
			[e.target.name]: e.target.value.trim(),
		})
	}

	const loadUser = async () => {
		setAuthToken(localStorage.token);
		try {
			const res = await axios.get('http://localhost:3000/api/auth/');
			NProgress.done();
			console.log("Signed In");
			setuser(res.data);
			addToast("Signed In Successfully", { appearance: 'success', autoDismiss: true });
			localStorage.user = JSON.stringify(res.data);
		} catch (err) {
			console.log(err);
			NProgress.done();
			addToast({ err }, { appearance: 'error', autoDismiss: true });
		}
	}

	const signupsubmit = async (e) => {
		e.preventDefault();
		if (formdata.email === "" | formdata.password === "" | formdata.name === "") {
			addToast("All Field Are Required!", { appearance: 'error', autoDismiss: true });
			return;
		}
		NProgress.start();

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post("http://localhost:3000/api/users", JSON.stringify(formdata), config);
			if (res.status === 400) {
				addToast("User Already Exists", { appearance: 'error', autoDismiss: true });
			} if (res.status === 500) {
				addToast("Server Error", { appearance: 'error', autoDismiss: true });
			}
			localStorage.setItem('token', res.data.token);
			addToast("User Created", { appearance: 'success', autoDismiss: true });
			loadUser();
		} catch (err) {
			console.log(err);
			NProgress.done();
			if (formdata.password.length < 6) {
				addToast("Weak Password Password!", { appearance: 'error', autoDismiss: true });
			}
			else if (formdata.phone.length < 10 || formdata.phone.length > 12) {
				addToast("Invalid Phone Number!", { appearance: 'error', autoDismiss: true });
			}
			else {
				addToast("User Already Exists!", { appearance: 'error', autoDismiss: true });
			}
		}
	}

	return (
		<div className="container mx-auto" style={mystyle}>
			<div className="flex justify-center px-6 my-12">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-xl">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
						style={{ backgroundImage: "url(images/live/3.jpg)" }}
					></div>
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Create an Account</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700" for="Name">
										Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="Name"
										type="text"
										placeholder="Enter Name"
										name="name"
										onChange={handlechange}
									/>
								</div>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" for="email">
									Email
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Enter Email"
									name="email"
									onChange={handlechange}
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" for="phone">
									Phone
								</label>
								<input
									className="w-1/2 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="phone"
									type="number"
									placeholder="Enter Phone number"
									name="phone"
									onChange={handlechange}
								/>
							</div>
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700" for="password">
										Password
									</label>
									<input
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="password"
										type="password"
										placeholder="Enter Password"
										name="password"
										onChange={handlechange}
									/>
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700" for="c_password">
										Confirm Password
									</label>
									<input
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="c_password"
										type="password"
										placeholder="Confirm Password"
										name="password"
										onChange={handlechange}
									/>
								</div>
							</div>
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-black focus:outline-none focus:shadow-outline"
									type="button"
									onClick={signupsubmit}
								>
									Register Account
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link
									className="inline-block text-sm text-gray-400 align-baseline hover:text-gray-900"
									to="/login"
								>
									Already have an account? Login!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Signup

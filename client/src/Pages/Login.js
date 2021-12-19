import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import usercontext from '../Context/User/usercontext';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { useToasts } from 'react-toast-notifications';
import NProgress from 'nprogress';
import '../styles/nprogress.css';

function Login() {

    const { addToast } = useToasts();

    const context = useContext(usercontext);
    const { setuser } = context;

    const initialState = {
        email: '',
        password: ''
    }

    const [formdata, setformdata] = useState(initialState);

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const loadUser = async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('http://localhost:3000/api/auth/');
            addToast("Logged In Successfully", { appearance: 'success', autoDismiss: true });
            localStorage.user = JSON.stringify(res.data);
            console.log("Logged In");
            NProgress.done();
            setuser(res.data);
        }
        catch (err) {
            console.log(err);
            NProgress.done();
            addToast({ err }, { appearance: 'error', autoDismiss: true });
        }
    }

    const logind = async (e) => {
        e.preventDefault();
        if (formdata.email === "" | formdata.password === "") {
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
            const res = await axios.post("http://localhost:3000/api/auth/", JSON.stringify(formdata), config);
            localStorage.setItem('token', res.data.token);
            loadUser();
        } catch (err) {
            console.log(err);
            NProgress.done();
            addToast("Invalid Credentials", { appearance: 'error', autoDismiss: true });
        }
    }



    return (
        <>
            <div className="font-sans">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-black ">
                    <div className="relative sm:max-w-sm w-full">
                        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label for="" className="block mt-3 text-xl text-gray-700 text-center font-semibold">
                                Login
                            </label>
                            <form method="#" action="#" className="mt-10">

                                <div>
                                    <input type="email" placeholder="Enter Email" className="mt-1 block w-full p-3 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                        name="email" onChange={handleChange} />
                                </div>

                                <div className="mt-7">
                                    <input type="password" placeholder="Enter Password" className="mt-1 block w-full p-3 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                        name="password" onChange={handleChange} />
                                </div>

                                <div className="mt-7 flex">
                                    <label for="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                        <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>

                                    <div className="w-full text-right">
                                        <Link className="underline text-sm text-gray-600 hover:text-gray-900" to="/#">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-7">
                                    <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                                        onClick={logind} type="submit">
                                        Login
                                    </button>
                                </div>

                                <div className="flex mt-7 items-center text-center">
                                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                                    <label className="block font-medium text-sm text-gray-600 w-full">
                                        Or signin using
                                    </label>
                                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                                </div>

                                <div className="flex mt-7 justify-center w-full">
                                    <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">

                                        Facebook
                                    </button>

                                    <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">

                                        Google
                                    </button>
                                </div>

                                <div className="mt-7">
                                    <div className="flex justify-center items-center">
                                        <label className="mr-2 text-gray-600" >New user?</label>
                                        <Link to="/signup" className=" text-gray-500 hover:text-gray-900 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                            Create an account
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login

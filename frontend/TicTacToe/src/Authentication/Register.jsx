import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { RegisterUser } from '../BackendHandler/server.js';
import { Navigate } from 'react-router-dom';

function Register() {
    const { setUser } = useContext(UserContext);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState(null);
    const [registered, setRegistered] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); // Clear any existing errors

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const user = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const User = await RegisterUser(user);
            if (!User) {
                throw new Error("Failed to create user");
            }
            setUser(User);
            setRegistered(true); // Set registered state to true
        } catch (err) {
            setError(err.message); // Set error message from catch
        }
    }

    if (registered) {
        return <Navigate to="/accounts-login-user" />; // Use Navigate component for redirection
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="max-w-sm w-full border border-gray-300 bg-white shadow-md rounded-lg p-6"
                onSubmit={handleSubmit}
                method='POST'>

                {/* Heading */}
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>

                {/* Error message */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Name */}
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter your Name</label>
                    <input
                        type="text"
                        id="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Your Name"
                        required
                        ref={nameRef}
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter your email</label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="user@user.com"
                        required
                        ref={emailRef}
                    />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Enter your password</label>
                    <input
                        type="password"
                        id="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        ref={passwordRef}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                    <input
                        type="password"
                        id="repeat-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        ref={passwordConfirmRef}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Register
                </button>
                <p className='mt-2 text-sm'>Already have an <a href="/accounts-login-user">Account</a>?</p>
            </form>
        </div>
    );
}

export default Register;

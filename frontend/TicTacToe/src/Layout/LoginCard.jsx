import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginCard({ message1, message2 }) {
    const navigate = useNavigate();

    function gotologin() {
        navigate("/accounts-login-user");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">{message1||"you are not logged in"}</h1>
                <p className="text-center text-gray-700 mb-6">{message2 || "please login"}</p>
                <button
                    onClick={gotologin}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Login Again
                </button>
            </div>
        </div>
    );
}

export  {LoginCard};

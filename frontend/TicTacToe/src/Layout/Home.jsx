import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const { User, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [CurrentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (User && Object.keys(User).length > 0) {
      setCurrentUser(User);
      localStorage.setItem('user', JSON.stringify(User));
    } else if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/accounts-login-user");
    }
  }, [User, navigate]);

  return (
   <>


    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20">
      {/* Header - Welcome User */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome to games,  {CurrentUser?.username || "User"}
      </h2>

      {/* Games Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs text-center">
        <h2 className="text-2xl font-bold mb-4">Games</h2>

        {/* Tic Tac Toe Game */}
        <div 
          className="p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          <Link to="/play-tik-tac-toe">Tic Tac Toe</Link>
        </div>

        {/* Another Game */}
        <div className="mt-4 p-4 bg-green-600 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-green-700 transition duration-200">
          <Link to='/'>Some Other Games</Link>
        </div>
      </div>
    </div>


   </>
  );
}

export default Home;

import React, {useContext, useEffect} from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function Header() {
    const { User, setUser } = useContext(UserContext);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, [setUser]);
    
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <div className="text-white text-2xl font-bold">Nexplay</div>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-300 hover:text-white transition duration-200">Games</Link>
                        <Link to="/leaderboard" className="text-gray-300 hover:text-white transition duration-200">LeaderBoard</Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                            </svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user name..." required />
                    </div>

                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>

                    <button className="text-gray-300 hover:text-white transition duration-200">
                        <FaBell size={24} />
                    </button>

                    <button className="text-gray-300 hover:text-white transition duration-200">
                        <Link to="/user-profile">
                        <FaUserCircle size={28} />
                        </Link>
                    </button>

                    {User &&
                        <button className="text-gray-300 bg-red-600 rounded-2xl p-1 px-3 hover:text-white hover:bg-red-800 transition duration-200">
                            <Link to="/accounts-logout-user">LogOut</Link>
                        </button>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;

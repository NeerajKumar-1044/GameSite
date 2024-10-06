import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { GetCurrentUser, GetMatchHistory } from '../BackendHandler/server';
import { LoginCard } from '../Layout/LoginCard';

function Profile() {
    const { User, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [Match_History, setMatch_History] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const current_user = await GetCurrentUser();
                const storedUser = localStorage.getItem('user');

                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser._id === current_user._id) {
                        setUser(parsedUser);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchHistory = async () => {
            try {
                const current_history = await GetMatchHistory();
                //console.log("history in profile: ", current_history);
                setMatch_History(current_history?.UserHistory); 
            } catch (error) {
                //console.log(error);
                setMatch_History([]);
            }
        };

        fetchUser();
        fetchHistory();
    }, []);

    return (
        <>
            {User ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    {loading ? (
                        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg p-8 w-96">
                            <div className="flex items-center mb-6">
                                <img
                                    src={User.profileImage || "#"}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full border-2 border-blue-600 mr-4"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{User.username}</h2>
                                    <p className="text-gray-600">Rating: {User.Rating}</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Match History:</h3>
                            {Match_History?.length > 0 ? (
    <div className="grid grid-cols-1 gap-4">
        {Match_History.map((match, index) => (
            <div
                key={index}
                className={`p-4 rounded-lg shadow-md ${
                    match?.winner === User.username ? "bg-green-100 border-l-4 border-green-500" :
                    match?.winner !== User.username ? "bg-red-100 border-l-4 border-red-500" :
                    match?.winner === User.username ? "bg-blue-100 border-l-4 border-blue-500" :
                    "bg-gray-100 border-l-4 border-gray-500" // Default case
                }`}
            >
                <h3 className="font-bold text-lg">{`Match ${index + 1}`}</h3>
                <p className="text-gray-700">{`Played with: ${match?.user1}`}</p>
                {/* <p className="text-gray-700">{`Result: ${match?.outcome}`}</p> */}
                <p className="text-gray-700">{`Winner of the match : ${match?.winner}`}</p>
              </div>
                  ))}
              </div>
            ) : (
                <p className="text-gray-700">No match history available.</p>
            )}

                        </div>
                    )}
                </div>
            ) : (
                <LoginCard message1="Login" message2="You are not logged in" />
            )}
        </>
    );
}

export default Profile;


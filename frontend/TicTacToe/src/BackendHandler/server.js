import axios from 'axios';

const Basic_Url = String(import.meta.env.VITE_APP_BACKEND_URI);


async function RegisterUser(user) {
    try {
        const response = await axios.post(`${Basic_Url}/register-user`, user, {withCredentials:true});
        console.log(response.data.user);
        return response.data.user;
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

async function LoginUser(user) {
    try {
        const response = await axios.post(`${Basic_Url}/login-user`,user, {withCredentials:true});
       // console.log(response.data.user);
        return {...response.data.user};
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function GetCurrentUser() {
    try {
        const response = await axios.get(`${Basic_Url}/get-current-user`,{withCredentials:true});
        //console.log(response.data.user);
        return response.data.user;
    } catch (error) {
        console.error('Error fetching current user:', error);

    }
}

async function LogoutUser() {
    try {
        const response = await axios.post(`${Basic_Url}/logout-user`,{},{withCredentials:true});
        localStorage.removeItem('user');
        console.log(response);
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}

async function GetLeaderBoard() {
    try {

        const leaderboard = await axios.get(`${Basic_Url}/get-leaderboard`, {withCredentials:true});
        if(!leaderboard){
            console.log("no leaderboard available");
            return {};
        }
        else{ console.log("leaderboard data fetched successfully");
        }
        return leaderboard.data;
    } catch (error) {
        console.log(error);
    }

}

async function GetMatchHistory() {
    try {
        const response = await axios.get(`${Basic_Url}/get-match-history`, { withCredentials: true });
        console.log(response.data.UserHistory);
        return response.data; // Return the data property
    } catch (error) {
        console.error("Error fetching match history:", error);
        return null;
    }
}

export {
    RegisterUser,
    LoginUser,
    LogoutUser,
    GetCurrentUser,
    GetLeaderBoard,
    GetMatchHistory
};

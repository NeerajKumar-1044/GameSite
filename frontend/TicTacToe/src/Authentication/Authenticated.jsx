import { GetCurrentUser } from "../BackendHandler/server";
import { useNavigate } from "react-router-dom";

async function Authenticated(user) {
    const navigate = useNavigate();
    if(!user) navigate("/accounts-login-user");
    else{
        const currUser = await GetCurrentUser();
        if(!currUser) navigate("/accounts-login-user");
        if(currUser._id!==user._id){
            localStorage.removeItem('user');
            navigate("/login-authenticate");
        }
    }
    return true;
}

export default Authenticated;
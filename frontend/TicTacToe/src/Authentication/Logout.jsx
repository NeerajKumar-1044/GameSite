import { UserContext } from "../Context/UserContext.jsx";
import { useContext, useEffect } from "react";
import { LogoutUser } from "../BackendHandler/server.js";
import { useNavigate } from "react-router-dom";
import {LoginCard} from "../Layout/LoginCard.jsx"

function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const userLoggedOut = await LogoutUser();
      if (userLoggedOut) {
        console.log("user logged out successfully");
      }
      else {
        console.log("failed to logout user in backend, localstorage deleted");
      }
      setUser(null);
      localStorage.removeItem('user');
    };

    handleLogout();
  }, []);

  
  return (
    <>
    <LoginCard message1="Logged Out Successfully" message2="You have been logged out of your account." />
    </>
  );
}

export default Logout;

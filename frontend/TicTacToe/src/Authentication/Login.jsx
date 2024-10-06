import React, { useContext, useRef, useEffect, useState } from 'react';
import { LoginUser } from '../BackendHandler/server';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';


function Login() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { User, setUser } = useContext(UserContext);
  
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    const tempUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    try {
      const presentUser = await LoginUser(tempUser);
      if (!presentUser) throw new Error("Failed to login user");

      console.log("username of User after login", presentUser.username);
      
      await setUser(presentUser);
      
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (User) {
      //console.log("User state changed:", User);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(User));
      navigate("/");
    }
  }, [User, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        className="max-w-sm w-full border border-gray-300 bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h2>
        
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

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Enter your password</label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className='mt-2 text-sm'>Don't have an <a href="/accounts-register-user">Account</a>?</p>
      </form>
    </div>
  );
}

export default Login;

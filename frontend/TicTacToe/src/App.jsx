import { createBrowserRouter, RouterProvider} from "react-router-dom"
import {UserContextProvider} from "./Context/UserContext"
import Login from "./Authentication/Login"
import Logout from "./Authentication/Logout"
import Home from './Layout/Home'
import Register from "./Authentication/Register"
import TicTacToe from "./TicTacToe_Game/TicTacToe"
import Leaderboard from "./TicTacToe_Game/Leaderboard"
import Layout from "./Layout/Layout"
import Profile from "./Authentication/Profile"
import { LoginCard } from "./Layout/LoginCard"
function App() {


const router = createBrowserRouter([
  
  {path:"/accounts-login-user", element: <Login/>},
  {path:"/accounts-register-user", element: <Register/>},
  {path:"/accounts-logout-user", element: <Logout/>},
  {path:"/", element: <Layout/>, children: [
    {path:"", element: <Home/>},
    {path:"play-tik-tac-toe", element: <TicTacToe/>},
    {path:"leaderboard", element: <Leaderboard/>},
    {path:"user-profile", element: <Profile/>},
    {path:"login-authenticate", element: <LoginCard/>},
  ]}
])


  return (
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  )
}

export default App

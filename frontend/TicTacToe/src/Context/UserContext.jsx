import React, { createContext , useState} from "react";
const UserContext = createContext();

const UserContextProvider = ({children})=>{
    const [User, setUser] = useState(null);
    return (
    <UserContext.Provider value={{User, setUser}}>
    {children}
    </UserContext.Provider>
    )
}
export  {
    UserContext,
    UserContextProvider
}

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);


export default function AuthProvider({children}){
    const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):null);
    const [user,setUser] = useState(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null);
    
    let contextData = {
        user:user,
        setUser:setUser,
        token:token,
        setToken:setToken
    }
    return <AuthContext.Provider value={contextData} >{children}</AuthContext.Provider>
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);

    return context;
}
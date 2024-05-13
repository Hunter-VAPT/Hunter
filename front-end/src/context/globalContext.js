import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);


export default function GlobalContextProvider({children}){
    const [scans,setScans] = useState([]);
    
    return <GlobalContext.Provider value={{scans,setScans}} >{children}</GlobalContext.Provider>
}

export const useGlobalContext = ()=>{
    const context = useContext(GlobalContext);

    return context;
}
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppContextProvider=(props)=>{

    const [login, setLogin] = useState(false);

    useEffect(()=>{
        const loggedIn = localStorage.getItem("Admin");
        if(loggedIn){
            setLogin(true);
        }
    },[setLogin])

    const contextValue = {
        login, setLogin,
    };

    return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
import React from "react";
import { AppContext } from './context/AppContext';

const Footer=()=>{

    const { login, setLogin, username } = React.useContext(AppContext);

    const handleLogout = async () => {
      await localStorage.removeItem('Admin');
      setLogin(false);
    };

    return(
        <>
        {
            login ? ( <div className="border border-gray-500 bg-gray-800 text-white mt-4 ml-[256px] p-2 w-[calc(100%-256px)] fixed bottom-0">
            <h1 className="text-center">Copyright @ 360 Bytes</h1>
        </div>):(
            <></>
        )
        }
       
        </>
    )
}

export default Footer


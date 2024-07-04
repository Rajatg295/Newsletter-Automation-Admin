import React,{useContext} from "react";
import LoginForm from "./LoginForm";
import { AppContext } from "./context/AppContext";
import Admindashboard from "./Admindashboard";

const Homepage=()=>{
    return(<div>
        hello
    </div>)
    // const { login } = useContext(AppContext);
    // return(
    //     <div>
    //         {
    //             login ? (<Admindashboard/>) : (<LoginForm />)
    //         }
            
    //     </div>
    // )
}

export default Homepage;


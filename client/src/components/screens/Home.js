import React, { useContext } from "react";
import { UserContext } from "../../App";
const Home=(props)=>{
    const {state,dispatch} = useContext(UserContext)

return(
    
    <div>
    <h1 style={{textAlign:"center"}}>No message yet ..</h1>
    </div>
    
    
    
)
}
export default Home

import React from "react";
import "../CSS/Navbar.css"
import { NavLink } from "react-router-dom";

const Navbar =()=>{
    const Navlink=({isActive})=>{
              return(
                {   

                    textDecoration:isActive?"underline":"none",
                    color:isActive?"orange":"white"




                }

              )

    }

    return(

      <div className="headerCorp">
        <div  className="headerContainer">
            
      <NavLink to="/Register"  style={Navlink}>Register</NavLink>
      <NavLink to="/Attendance" style={Navlink}>Attendance</NavLink>
      <NavLink to="/Modify" style={Navlink}>Modify</NavLink>
   </div>


</div>    
    )    
}


export default Navbar
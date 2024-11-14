import { useState,useContext } from "react";
import "../CSS/ModifyInfo.css";
import { ModifyContext } from "./ModifyContex";
import { Link } from "react-router-dom";
const ModifyInfo=()=>{
     const {users}=useContext(ModifyContext);

         const handleCount=(count)=>{
            let present=count.filter((data)=>data.attend==true).length;
            let absent=count.length-present;
            return({present,absent})
            
         }
         const sortedUsers = [...users].sort((a, b) => {
            const aCounts = handleCount(a.attendance);
            const bCounts = handleCount(b.attendance);
            return bCounts.present - aCounts.present; 
        });
         

    return(
     
     <div className="modifyInfoContainer" style={{}}>
         <button style={{padding:"20px 20px",border:"none",margin:"20px ",backgroundColor:"orange",borderRadius:"50%" }}><Link style={{textDecoration:"none",color:"black"}} to="/Modify">Info</Link></button>
         <table className="modifyH">
             <thead>
              <tr >
                 <th>FirstName</th>
                 <th>lastName</th>
                 <th>present</th>
                 <th>absent</th>
              </tr>
             </thead>
             <tbody>
                 {
                 
                 sortedUsers.map((data,index)=>{
                     
                    const {present,absent}=handleCount(data.attendance);
                     
                     
                     return (
                <tr key={index}>
                   <td>{data.firstName}</td>
                   <td>{data.lastName}</td>
                   <td>{present}</td>
                   <td>{absent}</td>
                </tr>
 
 
                 )})
                 
                 
                 
                           
                           
                           
 
                             
             }
 
                 
 
             </tbody>
         </table>
     </div>
    )
       
}


export default ModifyInfo;
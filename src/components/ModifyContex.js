import { createContext ,useState} from "react";


export const ModifyContext=createContext();


export const ModifyProvider=({children})=>{
          
     const [data,setData]=useState([])
    const handleData=(users)=>{
        setData(users)
    }
   return (<ModifyContext.Provider value={{users:data,handleData}}>
                 {children}
           </ModifyContext.Provider>) 
}
import { useEffect, useState } from "react";
import "../CSS/Attendance.css";
import Info from "./Pop";
import { EthCalender } from "./EthCalender";

const Attendance = () => {
 
    const [attendanceForm, setAttendanceForm] = useState([]);
    const [isComplated,setIsComplated]=useState(false);
    const [countPresent,setCountPresent]=useState(0);
    const [countAbsent,setCountAbsent]=useState(0);
    const [newF,seNewF]=useState(false)
    

    useEffect(() => {
        if(isComplated){return;}
        
     const localStorageData=JSON.parse(localStorage.getItem("localStorage"));
      if(localStorageData){setAttendanceForm(localStorageData);return;}
        fetch("https://attendance-server-buy0.onrender.com/attendance")
            .then((res) => res.json()) 
            .then((data) => {
                if (!data) {
                    console.log("No attendance data present");
                    return;
                }
                const formatedData=data.map((data)=>{
                    return {...data,attend:false,startTime:`${EthCalender(new Date())}`}
                })
                setAttendanceForm(formatedData);
                localStorage.setItem("localStorage", JSON.stringify(formatedData));
                
            })
            .catch((err) => {
                console.log("Failed to fetch attendance form", err);
            });
    }, [isComplated,newF]);

    const handleEmptyClick = (id) => {
        const newAttendanceForm = attendanceForm.map((data) => {
            
            return data._id === id ? { ...data, attend: true } : data;
        });
        setAttendanceForm(newAttendanceForm);
        localStorage.setItem("localStorage", JSON.stringify(newAttendanceForm)); 
        
    };
   const handleSelectedClick=(id)=>{
         const newAttendanceForm=attendanceForm.map((data)=>{
           return data._id===id?{...data,attend:false}:data;
         })
         setAttendanceForm(newAttendanceForm);
         localStorage.setItem("localStorage",JSON.stringify(newAttendanceForm))
   }
   const handleCompleted=()=>{
    
    const newAttendanceForm=attendanceForm.map((data)=>{
        return {...data,endTime:`${EthCalender(new Date())}`}
    })
   
    
    fetch("https://attendance-server-buy0.onrender.com/attendance",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(newAttendanceForm)
    }) 
    .then((res) => res.json()) 
    .then((data)=>{
        
        setIsComplated(true);
        localStorage.removeItem("localStorage");
        setAttendanceForm([])

    })
    .catch((err)=>{
            console.log("faild to post formData")
    })
   }
   
    const handleNew=()=>{
        localStorage.removeItem("localStorage");
        setAttendanceForm([])
        seNewF((prev)=>!prev);
    }
   
   const handleInfo=()=>{
         let countP=0;
         let countA=0;
         attendanceForm.forEach(element => {
            if(element.attend){countP++; return}
            countA++;
         });
         setCountPresent(countP);
         setCountAbsent(countA);

   }

   const handleRemove=()=>{
 
    setIsComplated(false);
   }

   const handleClosePopup=()=>{

    setCountPresent(0);
    setCountAbsent(0);
   }







    return (isComplated?<div style={{width:"100%",minHeight:"100vh",backgroundColor:"rgba(0,0,0,0.3)"}}><div className="newFormButton" onClick={handleRemove} style={{position:"absolute",width:"200px",height:"200px",top:"50%",left:"50%",borderRadius:"50%",transform:"translate(-50%,-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}><button className="newFormBtn">NewForm</button></div></div>
                  :

     <>
      <Info countAbsent={countAbsent} countPresent={countPresent} onClose={handleClosePopup}/>
        <div className="attendanceContainer">
         
         <div className="attendanceController"><button onClick={handleNew} style={{padding:"0.6rem 10px",marginRight:"10px",borderRadius:"5px",backgroundColor:"yellow",border:"none"}}>New</button><button className="info" onClick={handleInfo}>Info</button><button className="completed" onClick={handleCompleted}>Completed</button></div>
         
          <ul>
             <li style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"48px",fontWeight:"600"}}> Attendance</li>
             <li><div className="fname header">First Name</div><div className="lname header">Last Name</div><div className="select header">Select</div></li><hr />
             {attendanceForm.map((data) => 
                  (<li key={data._id}>
                     <div className="fname">{data.firstName}</div>
                     <div className="lname">{data.lastName}</div>
                     <div className="select">
                         {!data.attend ? (
                             <div className="emptySpan" onClick={() => handleEmptyClick(data._id)}></div>
                         ) : (
                             <div className="selectedSpan" onClick={() => handleSelectedClick(data._id)}></div>
                         )}
                     </div>
                 </li>
             ) )}
         </ul>
       </div>
         </>
      
    );
};

export default Attendance;
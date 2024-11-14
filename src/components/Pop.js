import "../CSS/Info.css";
import { EthCalender } from "./EthCalender";
const Info=({countPresent,countAbsent,onClose})=>{

    return(
        countPresent || countAbsent?
        (
        <div className="infoOverlay">
           <p style={{textAlign:"center",border:"none",fontSize:"28px",color:"white",wordBreak:"break",padding:"10px",position:"absolute",top:"0",left:"0",width:"100%",textAlign:"center"}}>{`${EthCalender(new Date())}`}</p>
          <div className="infoPopup">
          <button className="closePop"  onClick={onClose}>x</button>
          <table className="infoTable">
            <tbody>
              <tr>
                 <td><div>Present</div></td>
                 <td> <div>{`${countPresent}`}</div></td>
              </tr>
              <tr>
                 <td> <div>Abscent</div></td>
                 <td> <div>{`${countAbsent}`}</div></td>
              </tr>
              <tr>
                  <td> <div>Total</div></td>
                  <td>  <div>{`${countPresent + countAbsent}`}</div></td>
              </tr>
             
            </tbody>
           
          </table>
         
         
         
         
         
          
          
        
          </div>
          
        </div>
        )
        : 
        null
    )
}


export default Info;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars ,faHouse} from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { Minu } from "../../context/MinuContext"
import style from "./bars.module.css"
import imgLogo from "./Perfecto New.png"
import { Link } from "react-router-dom"
export default function Topbar() {
  const minu = useContext(Minu)
  const setIsOPin = minu.setIsOPin;
  return (
    <div className={`${style.top_bar} `}>

     <div className={style.top_bar_logo}>
     <img src={imgLogo} alt="logo"  />
     <FontAwesomeIcon onClick={()=> setIsOPin(prv => !prv )}  icon={faBars} className={style.icoon} />
     <h2 className="fs-3 fw-bold">(Admin)</h2>
     </div>
      
     
     
    
     <Link to='/' className="text-dark p-4 text-center fs-3 " > <FontAwesomeIcon  icon={faHouse} /> </Link>
     
      </div>
      

     
  
   
  )
}

import { createContext, useEffect, useState } from "react";


export const WindowSize = createContext(null);


export default function WindoContext({children}) {
const [windowSize , setWindowSize] = useState(window.innerWidth);

useEffect(()=>{
function setWindowWidth(){
    setWindowSize(window.innerWidth)
}
window.addEventListener("resize" , setWindowWidth);

//cleenUp fumction
return ()=> {
window.removeEventListener("resize" , setWindowWidth)
}

},[])




  return <WindowSize.Provider value={{windowSize,setWindowSize}}>{children}</WindowSize.Provider>
  
}

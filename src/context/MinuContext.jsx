import {  createContext, useState } from "react"

 export  const Minu = createContext(true)
export default function MinuContext({children}) {

    const [isOpin , setIsOPin] = useState(true)


  return <Minu.Provider value={{isOpin,setIsOPin}}>{children}</Minu.Provider>
   
}

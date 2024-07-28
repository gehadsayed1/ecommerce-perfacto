import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios"
import { GETGROUB } from "../../../Api/Api"
import { useParams } from 'react-router-dom';
import ProductShow from "../../../components/websit/productShow/ProductShow";



export default function Blouses() {
    const {groubId , subGroubId } = useParams()
    const [loading, setLoading] = useState(true);
   const [dataGroub ,setDataGroub] = useState();
    useEffect(()=>{
      setLoading(true);
    Axios.get(`/${GETGROUB}?id=${groubId}`).then((data)=> {
   const prodauct  = data.data.filter((item)=> item.subGroupId === subGroubId)
   setDataGroub( prodauct )
   setLoading(false);
}).catch((err)=> console.log(err))
setLoading(false);
    },[groubId, subGroubId]);

  
 
   
  return(
<>
<ProductShow data={dataGroub} loading={loading} />
</>
  )
    
  
  
}

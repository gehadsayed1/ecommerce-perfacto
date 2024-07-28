// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import cookie from "cookie-universal";
// import { useEffect, useState } from "react";
// import {EIDETUSERS } from "../../Api/Api";
// import Laoding from "../../components/laoding/Laoding";
// import Error403 from "./Error403";
// import { Axios } from "../../Api/Axios";

// export default function ReqoireAuth({alllowetRole}) {
//   const cooki = cookie();
//   const idToken = cooki.get("e-commerce");
//   //navigate
//   const navigate = useNavigate();
//   //User
//   const [user, setUser] = useState("");
//   useEffect(() => {
//     Axios
//       .get(`/${EIDETUSERS}/?id=${idToken}`)
     
//       .then((data) => setUser(data.data))
//       .catch(() => navigate("/Login", { replace: true }));
//   }, [idToken]);

//   return idToken ? (
//     user === "" ? (
//       <Laoding />
//     ) : alllowetRole.includes(user.role_id) ? (
//       <Outlet /> 

//      ) :(
        
//         <Error403/>
//      )
//   ) : (
//     <Navigate to={"/Login"} replace={true} />
//   );
// }

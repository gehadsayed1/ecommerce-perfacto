import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
import { EIDETUSERS } from "../../Api/Api";
import { Axios } from '../../Api/Axios';
import SpinnerComponent from '../../components/laoding/Laoding';

export default function RecuirAuth({ children }) {
  const [role, setRole] = useState(null);
  const cookies = new Cookies();
  const idToken = cookies.get("ecommerc");


  useEffect(() => {
    async function fetchUserRole(token) {
      try {
        const res = await Axios.get(`/${EIDETUSERS}/?id=${token}`);
        const userData = res.data;
        setRole(userData.Role_id);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }

    if (idToken) {
      fetchUserRole(idToken);
    }
  }, [idToken]);

  if (role === null) {
    return <SpinnerComponent/>; // عنصر لعرض حالة التحميل
  }

  if (role === 1) {
    return children || <Outlet />; // رندر محتويات الداشبورد إذا كان المستخدم أدمن
  }
  if (role === 0) {
    <Navigate to="/" replace />
  }
   else {
    return <Navigate to="/login" replace />; // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم أدمن
  }
}

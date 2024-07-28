import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div >
      <Header/>
      {/* <main> */}
      <div style={{ minHeight:'100vh'}}>
      <Outlet/>
      </div>
       
      {/* </main> */}
      <Footer/>
    </div>
  );
};

export default Layout;

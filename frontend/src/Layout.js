import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import { AppContext } from './context/AppContext';
import Sidenavbar from './Sidenavbar';

const Layout = ({ children }) => {
  const { login } = useContext(AppContext);
  
  return (
    <div className="flex">
      <Header />
      <Sidenavbar />
      <Footer />
    </div>
   
  );
};

export default Layout;



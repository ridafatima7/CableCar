
// App.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './ScrollToTop';
import AppRoutes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/NavFooter/Footer';
import Header from './components/NavFooter/Navbar';
const App = () => {
  
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <ScrollToTop/>
        <Header />
        <AppRoutes /> 
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;


import Axios from "axios";
import {React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import Checkout from './Checkout';
// import Thankyou from './Thankyou';
import Home from './Home';
import Product from './Product';
import Cart from './Cart';
import Category from './Category';
import { CartProvider } from "react-use-cart";
import Display from "./Display";


function App() {
return(
  <CartProvider>
    <Router>
      <Routes>
        
        {/* <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Thankyou" element={<Thankyou />} /> */}
        <Route path="/Cart" element={<Cart />} />
         {/* Protected routes under /Home */}
        <Route path="/" element={<Navigate to = "/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Product/:productId" element={<Product />} />
        <Route path="/Category/:category"  element={<Home />} />
        
        </Routes>
        </Router>
        </CartProvider>
);


    

}


export default App;
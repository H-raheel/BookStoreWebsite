// Home.jsx

import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import NavigationBar from './Navbar';
import Display from './Display';
import './Styles/Home.css';

function Home() {
  const l=useLocation();
  const cat=l.state || "";
 console.log({cat});
  return (
    <div className="homeContainer">
      <div>
        <NavigationBar className="nav" />
      </div>
      <div>
        <Display className="display" cat={cat} />
      </div>
    </div>
  );
}

export default Home;

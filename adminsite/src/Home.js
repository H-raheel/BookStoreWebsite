import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Navigation.css';

function Home(){
    return (
    
    <div className="navigation"> 
        <h1><Link to="/Home/ViewAll" className="nav-link">VIEW ALL BOOKS</Link></h1>
        <h1><Link to="/Home/Add" className="nav-link">ADD BOOK</Link></h1>
        <h1><Link to="/Home/Delete" className="nav-link">DELETE BOOK</Link></h1>
        <h1><Link to="/Home/OrderInformation" className="nav-link">ORDER INFORMATION</Link></h1>
        <h1><Link to="/Home/CustomerInformation" className="nav-link">CUSTOMER INFORMATION</Link></h1>
    </div>)
}

export default Home;


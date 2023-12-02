
import React, {useState,useEffect} from 'react';
import {AiOutlineCaretUp,AiOutlineCaretDown} from "react-icons/ai";
import { Link } from 'react-router-dom';
import Axios from "axios";
import './Styles/Navbar.css';



function Navbar(){
  const [isOpen,setIsOpen]=useState(false);
const [category,setCategory]=useState([]);
const[data,setData]=useState('');
useEffect(() => {
  getInformation();
}, []);


const getInformation = () => {
  Axios.get("http://localhost:3008/getCategory")
    .then((response) => {
     setCategory(response.data);
      console.log('Response:', response); // Log the entire response object
      console.log('Data:', response.data); // Log the data
    })
    .catch((error) => {
      console.error(error);
    });
};
    return(
    <div className="navigation"> 
    <h1>Bookstore logo here</h1>
     <Link to="/Home" className="nav-link">ShopAll</Link>
     <div className="drop">
     <div className="category"> 
      <button onClick={()=>setIsOpen((prev)=>!prev)} className="dropButton" >BTTN
      {!isOpen ? (<AiOutlineCaretDown />): (<AiOutlineCaretUp/>)}
      </button>
    {isOpen &&
    <div className="list">
   {category.map((item,key)=>{
    return(
        <div key={key}>
      <div className='space'>
    <Link to={`/Category/${item[0]}`} state={item[0]} classname="list-link">{item[0]}</Link></div>
    </div>);
    
   })}

    </div>
   
    
    
    }
    </div>
     </div>
      <Link to="/Cart" className="cart-link">Cart</Link>
  </div>);
}

export default Navbar;
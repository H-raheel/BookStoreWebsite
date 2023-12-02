import React, {useState,useEffect} from 'react';
import {AiOutlineCaretUp,AiOutlineCaretDown} from "react-icons/ai";
import { Link } from 'react-router-dom';
import Axios from "axios";
import './Styles/Category.css';

function Category(){
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

    return (
    
    <div className="category"> 
      <button onClick={()=>setIsOpen((prev)=>!prev)} className="dropButton" >BTTN
      {!isOpen ? (<AiOutlineCaretDown />): (<AiOutlineCaretUp/>)}
      </button>
    {isOpen &&
    <div className="list">
   {category.map((item,key)=>{
    return(
        <div key={key}>
      
    <div><Link to={`/Category/${item[0]}`} state={item[0]}>{item[0]}</Link></div>
    </div>);
    
   })}

    </div>
   
    
    
    }
    </div>)
}

export default Category;



import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import './Styles/Display.css';



function Display(props){

    const[items,setItems]=useState([]);
    const[productId, setProductId]=useState(0);
    const[clicked,setClicked]=useState(false);
    const[category,setCategory]=useState("");
   console.log("pr",props.cat);



    useEffect(() => {
      if (props.cat==""){
        console.log(1);
        getInformation();}
      else   {
        setCategory(props.cat);
      getInformation2();
      console.log(2);;
      }}, [category,props]);

    const getInformation = () => {
      console.log('here1');
        Axios.get("http://localhost:3008/DisplayItems")
          .then((response) => {
           setItems(response.data);
            console.log('Response:', response); // Log the entire response object
            console.log('Data:', response.data); // Log the data
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const getInformation2 = () => {
        console.log('here2');
        Axios.get("http://localhost:3008/DisplayItems",{ params: { category } })
          .then((response) => {
           setItems(response.data);
            console.log('Response:', response); // Log the entire response object
            console.log('Data:', response.data); // Log the data
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
const handleClick=()=>{

}

        return (<div className="displayContainer">
         
         {items.map((val, key) => {
           return (
          <div >
             <div className="book" key={key}>
               <div className="details" >
               <div><Link to={`/Product/${val[6]}`}><img src={val[4]} alt="Image" style={{ width: '100px', height: 'auto' }} /></Link></div>
                 <div> {val[0]}</div>

                <div>Rs {val[2]} /-</div>
                <div><button className="viewbutton" onClick={()=>{setProductId(val[6]);handleClick();}}>View</button><button className="cartbutton">Add to Cart</button></div>
                
    
              
               </div>
             </div>
             </div>
           );
         })}
        </div>);
 
    };
    

export default Display;
import React, { useEffect } from 'react';
import Axios from "axios";
import { useState } from "react";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';



function ViewAll(){
  const [search, setSearch]=useState('');
  const [idSearch, setIdSearch]=useState(0);
  console.log(search);
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
const [informationList, setInformationList] = useState([]);
useEffect(() => {
  getInformation();
}, []);



const deleteRecord= (id) => {
    
    Axios.delete(`http://localhost:3009/delete/${id}`).then((response) => {
        console.log('Delete response:', response.data);
      setInformationList(
        informationList.filter((val) => {
          return val[0] != id;
        })
      );
    });
  };


const displayAll = () => {
  return (
    <tbody>
      {informationList.filter((val) => {
        // Return all data if search is 0
        if (search == '') {
          return val;
        }

        // Filter data based on book_id (val[0])
        else if (val[1].replace(/\s/g, "").toUpperCase().includes(search.replace(/\s/g, "").toUpperCase()) )
         {
         return val
        }

        // Return an empty array if no match found
        
      })
        .map((val, key) => {
          // Render table rows for filtered data
          return (
            <tr key={key}>
              <td>{val[0]}</td>
              <td>{val[1]}</td>
              <td>{val[2]}</td>
              <td>{formatDate(val[3])}</td>
              <td>{val[4]}</td>
              <td>{val[5]}</td>
              <td>{val[6]}</td>
              <td>
                <img src={val[7]} alt="Image" style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{val[8]}</td>
              <td>{val[10]}</td>
              <td>
              <Button onClick={()=>{deleteRecord(val[0]);}}><DeleteTwoToneIcon /></Button></td>
            </tr>
          );
        })}
    </tbody>
  );
};

    const getInformation = () => {
      Axios.get("http://localhost:3009/InformationGet")
        .then((response) => {
         setInformationList(response.data);
          console.log('Response:', response); // Log the entire response object
          console.log('Data:', response.data); // Log the data
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
  
   return (
 
      <div className="information">
    
        <div>

          <div>
            <form>
              <input className='searchBar' type='text' placeholder='Search by Title' onChange={(e)=>setSearch(e.target.value)}/>
              <SearchIcon />
            </form>
          </div>
            <table>
            <thead>
          <tr>
            <th>BOOOK ID</th>
            <th>BOOK TITLE</th>
            <th>ISBN</th>
            <th>PUBLICATION DATE</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>IMAGE</th>
            <th>BOOK DESCRIPTION</th>
            <th>AUTHOR NAME</th>
            <th>DELETE</th>

        
          </tr>
        </thead>
      
    {displayAll()}
  </table>
      </div>
      
      </div>
    );
  }




export default ViewAll;
import React, { useEffect, useState } from 'react';
import Axios from "axios";

function ShowMore(props) {
  const [filteredInformationList, setFilteredInformationList] = useState([]);
  
  console.log(props.custIdid);
  console.log('here');

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  useEffect(() => {
    filterData();
  }, [props.custId, props.informationList]);

  const filterData = () => {
    const filteredData = props.informationList.filter((val) => val[0] === props.custId);
    setFilteredInformationList(filteredData);
  };
  
  
  const displayAll=()=>{
   return (
   <div ><table className="table-container">
    <thead>
      <tr>
        <th>ORDER ID</th>
        <th>STATUS DATE</th>
        <th>STATUS</th>
      </tr>
    </thead>
    <tbody>
            {filteredInformationList.map((val, key) => (
              <tr className="employee" key={key}>
                <td>{val[0]}</td>
                <td>{formatDate(val[1])}</td>
                <td>{val[2]}</td>
              </tr>
            ))}
          </tbody>
</table>
</div>);}

    
 return (
    <div>
      {displayAll()}
    </div>
  );
}

export default ShowMore;

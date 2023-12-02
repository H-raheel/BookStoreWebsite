import React,{useEffect, useState} from 'react';


import About from './About';
import ViewAll from './ViewAll';
import Add from './Add';
import OrderInformation from './OrderInformation';
import CustomerInformation from './CustomerInformation';
import Delete from './Delete';
import Home from './Home';
import './Styles/Login.css';

//import { Router } from 'express';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';

function Login(){
const [loggedIn,setLoggedIn]=useState(false);
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
const [errorMessage, setErrorMessage] = useState('');
//const navigate = useNavigate();



const logIn=()=>{
    if(username==='admin' && password==='password'){
    setLoggedIn(true);
    //navigate('/Home');
    }
     else 
     setErrorMessage('Wrong credentials. Please try again.');
}

if (loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} /> 
          <Route path="/Home/ViewAll" element={<ViewAll />} />
          <Route path="/Home/Add" element={<Add />} />
          <Route path="/Home/Delete" element={<Delete />} />
          <Route path="/Home/OrderInformation" element={<OrderInformation />} />
          <Route path="/Home/CustomerInformation" element={<CustomerInformation />} />
          <Route path="/*" element={<Navigate to="/Home" />} />
        </Routes>
        
      </Router>

      
    );
  }

    return (
    
    <div class="login"> 
<h1>LOGIN</h1>

<form>
<label><h2>Enter UserName:</h2></label>
<input type='text' placeholder='username' onChange={(event)=>setUsername(event.target.value)}/>
<label><h2>Enter password:</h2></label>
<input type='password' onChange={(event)=>setPassword(event.target.value)} />
</form>
<button onClick={logIn}>LOGIN</button>
{errorMessage && <h2  className="error-message">{errorMessage}</h2>}
   </div>

   
   
   )


}

export default Login;
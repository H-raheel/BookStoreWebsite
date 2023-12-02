import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import CartAmountToggle from './CartAmountToggle';
import {useCart} from 'react-use-cart';



function Product(){
    const  {productId}  = useParams();
    const [id,setID]=useState(0);
    const [result,setResult]=useState([]);
    const [amount, setAmount]=useState(1);
    const [stock,setStock]=useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [title,setTitle]=useState('');
    const [url,setURL]=useState('');
    const [price,setPrice]=useState('');
    const data={amount,id,title,url,price};

    const {addItem, updateItemQuantity} = useCart();

    const handleAddToCart = async () => {
      console.log("u",amount);
     const product={id:id,name:title,price:price,url:url,stock:stock};
     addItem(product,amount);

//       if (id) {
// // Make sure the cart state is updated before calling updateItemQuantity
//         addItem({
//           id: productId,
//           title,
//           price,
//           quantity: amount,
//           url,
//           stock,
//         });
//         updateItemQuantity(id,amount);


// Now, you can safely call updateItemQuantity
//updateItemQuantity(productId, amount);

     // }
    };


    const setDecrease=()=>{
        amount >1 ? setAmount(amount-1):setAmount(1);
        console.log(amount);
    };

    const setIncrease=()=>{
        amount <stock ? setAmount(amount+1):setAmount(stock);
        console.log(data);
        if (amount==stock){
          setErrorMessage("Cannot add more items. Stock limit reached.");
        }
        
    };
 
 useEffect(() => {
  setID({productId});
    getInformation();
     
  }, []);

const getInformation = () => {
    Axios.get("http://localhost:3008/GetProduct",{ params: { productId } })
      .then((response) => {
    //    setResult(response.data[0][4]);
        setResult(response.data);
        const data = response.data[0];
        setPrice(data[5])
        setTitle(data[1]);
        setStock(data[4]);
        setURL(data[7]);
       console.log("stock",stock);
        console.log('Response:', response); // Log the entire response object
        console.log('Data:', response.data); // Log the data
        console.log("out",result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const displayAll = () => {
  
    console.log("stock", stock);
    return result.map((val, key) => {
        return (
       <div >
          <div  key={key}>
            <div  >
            <div><img src={val[7]} alt="Image" style={{ width: '100px', height: 'auto' }} /></div>
             <div>{val[0]}</div>
             <div>{val[1]}</div>
             <div>{val[2]}</div>
             <div>{val[3]}</div>
             <div>{val[4]}</div>
             <div>Rs {val[5]} /-</div>
             <div>{val[6]}</div>
    
             <div>{val[8]}</div>
             <div>{val[9]}</div>
             <div>{val[10]}</div>
             
             <Link to={`/Cart`} state={data} onClick={handleAddToCart}><button>Add To Cart</button></Link>
            

 
           
            </div>
          </div>
          
          <div className="amount-toggle">
<button onClick={setDecrease}>decrease</button>
<div className="amount-style">{amount}</div>
<button onClick={setIncrease}> Increase</button></div>
          </div>
        )
      })
  };

    return (
        <div className="ProductsContainer">
 {displayAll()}
 {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}
export default Product;
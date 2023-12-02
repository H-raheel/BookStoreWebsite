
import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import {useCart} from 'react-use-cart';

function Cart(){
const location=useLocation();
const data=location.state;
const id=data.id;
const amount=data.quantity;
const title=data.title;
const url=data.url;
const price=data.price;
const [qty, setQty]=useState(amount);


const {isEmpty,
    items,
    totalUniqueItems,
    totalItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
} = useCart();



const handleClick = (itemId, newQuantity) => {
    updateItemQuantity(itemId, newQuantity);
   // setQty(qty - 1); // Assuming you have a quantity state
  };

if(isEmpty) return <h1 className='text-center'> Your cart is empty</h1>

    return (
        
        <section className="py-4 container">
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
                    <table className='table table-light table-hover m-0'>
                       

                      {items.map((item, index) => {
                        //setQty(item.quantity);
                      
                        return(
                  <tr key={index}>
                  <td><img src={item.url} alt={item.title} style={{ width: '100px', height: 'auto' }} /></td>
                  <td>{item.title}</td>
                  <td>Price: Rs.{item.price}</td>
                  <td>Quantity: {item.quantity}</td>
                  {/* Add more details as needed */}
                  <button className='btn btn-danger ms-2' onClick={() => updateItemQuantity(item.id, item.quantity - 1) }>-</button>
                  <button className='btn btn-info ms-2' onClick={() => {
    // Assuming maxStock is the maximum allowed stock for an item
    const maxStock = item.stock; // Replace with your actual maximum stock value

    // Check if incrementing the quantity would exceed the maximum stock
    if (item.quantity + 1 <= maxStock) {
      // If not, update the quantity
      updateItemQuantity(item.id, item.quantity + 1);
    } else {
      // If exceeding the maximum stock, you can show a message or take appropriate action
      console.log('Cannot exceed maximum stock.');
    }
  }}>+</button>
                  <button className='btn btn-danger ms-2' onClick={()=> removeItem(item.id)}>Remove Item</button>
                </tr>
 
                   ) })}

                    </table>
                    
                    <div>
          <h6>Total Cost: Rs.{items.reduce((total, item) => total + (item.price * item.quantity), 0)}</h6>
        </div>
                </div>
            </div>
            </section>
    );
}

export default Cart;


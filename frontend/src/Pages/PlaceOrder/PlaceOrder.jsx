import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {getTotalCartAmount,token,food_list,url,cartItems} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const onChangeHandler =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData({...data,[name]:value})
  }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+5,
    }
    let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }
  
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount===0){
      navigate("/cart")
    }
  })

  const delieveryFee = getTotalCartAmount()>0?5:0;
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} id="" placeholder='First Name' />
          <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} id="" placeholder='Last Name' />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} id="" placeholder='Email Address' />
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} id="" placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city} id="" placeholder='City' />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} id="" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} id="" placeholder='Zip Code' />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} id="" placeholder='Country' />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} id="" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${delieveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + delieveryFee}</b>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
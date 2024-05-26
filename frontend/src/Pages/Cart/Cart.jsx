import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from '../../Context/StoreContext'
import { Link } from 'react-router-dom';
const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext)
  const delieveryFee = getTotalCartAmount()>0?5:0;
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div>
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <b>${getTotalCartAmount()+ delieveryFee}</b>
            </div>
            <Link to={'/order'}><button>PROCEED TO CHECKOUT</button></Link>
          </div>
            <div>
          </div>
        </div>
          <div className="cart-promocode">
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" name="" placeholder='promo code' id="" />
                <button>Submit</button>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Cart
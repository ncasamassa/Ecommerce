import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  const totalPrice = (cartItem.price * cartItem.count).toFixed(2);
  console.log(cartItem)
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img
          src={cartItem.image}
          alt={`${cartItem.make} ${cartItem.model}`}
          className="cart-item-thumbnail"
        />
        <div>
          <p>Brand: {cartItem.make}</p>
          <p>Model: {cartItem.model}</p>
          <p>Quantity: {cartItem.count}</p>
          <p>Price: ${totalPrice}</p>
        </div>
      </div>
      <button onClick={() => removeFromCart(cartItem._id)}>
        Remove from Cart
      </button>
    </div>
  );
};

export default CartItem;

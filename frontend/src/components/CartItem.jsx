import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  const totalPrice = (cartItem.product.price * cartItem.count).toFixed(2);

  return (
    <div className="cart-item">
      <p>Brand: {cartItem.product.make}</p>
      <p>Quantity: {cartItem.count}</p>
      <p>Price: ${totalPrice}</p>
      <button onClick={() => removeFromCart(cartItem.product.id)}>
        Remove from Cart
      </button>
    </div>
  );
};

export default CartItem;

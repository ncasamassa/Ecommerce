import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <p>{cartItem.book.name}</p>
      <p>Quantity: {cartItem.count}</p>
      <p>Price: ${cartItem.book.price.toFixed(2) * cartItem.count}</p>
      <button onClick={() => removeFromCart(cartItem.book.id)}>
        Remove from Cart
      </button>
    </div>
  );
};

export default CartItem;

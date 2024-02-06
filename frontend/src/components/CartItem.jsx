import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  const totalPrice = (cartItem.product.price * cartItem.count).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img
          src={cartItem.product.image}
          alt={`${cartItem.product.make} ${cartItem.product.model}`}
          className="cart-item-thumbnail"
        />
        <div>
          <p>Brand: {cartItem.product.make}</p>
          <p>Model: {cartItem.product.model}</p>
          <p>Quantity: {cartItem.count}</p>
          <p>Price: ${totalPrice}</p>
        </div>
      </div>
      <button onClick={() => removeFromCart(cartItem.product.id)}>
        Remove from Cart
      </button>
    </div>
  );
};

export default CartItem;

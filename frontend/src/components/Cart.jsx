import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import CartItem from "./CartItem";
import SignIn from "../SignIn";

const Cart = () => {
  const { state, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
    <SignIn />
      <h2>Your Cart</h2>
      {state.cart.map((cartItem) => (
        <CartItem key={cartItem.guitar.id} cartItem={cartItem} removeFromCart={removeFromCart} />
      ))}
      <p>Total Price: ${state.totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default Cart;

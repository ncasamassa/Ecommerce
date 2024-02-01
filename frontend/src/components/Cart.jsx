import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import CartItem from "./CartItem";
// import SignIn from "../SignIn";
import StripeCheckout from "react-stripe-checkout";

const onToken = (token) => {
  fetch("/save-stripe-token", {
    method: "POST",
    body: JSON.stringify(token),
  }).then((response) => {
    response.json().then((data) => {
      alert(`We are in business, ${data.email}`);
    });
  });
};

const Cart = () => {
  const { state, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      {/* <SignIn /> */}
      <h2>Your Cart</h2>
      {state.cart.map((cartItem) => (
        <CartItem
          key={cartItem.product.id}
          cartItem={cartItem}
          removeFromCart={removeFromCart}
        />
      ))}
      <p>Total Price: ${state.totalPrice.toFixed(2)}</p>

      <StripeCheckout
      stripeKey="pk_test_51OepDPIEo0qy9qOoGhEwRkclGuAhHwQjceS6P5ZRTYrySIkq06nXNnd52rzNguGTBAzik0StuRDLsrkDUJaLTAJ200vSUxp0bq"
      token={onToken}
      billingAddress
      shippingAddress
      amount={state.totalPrice * 100}
      />
    </div>
  );
};

export default Cart;

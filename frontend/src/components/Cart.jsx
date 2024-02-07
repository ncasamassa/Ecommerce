import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import CartItem from "./CartItem";
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

  const myStyle= {
    maxWidth: "100%",
    maxHeight: "100%"
  };

  return (
    <div className="cart-container" style={myStyle}>
      <h2>Your Cart</h2>
      {state.cart.map((cartItem) => (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          removeFromCart={removeFromCart}
        />
      ))}
      {!state.cart.length ? (
        <p>Price: $0</p>
      ) : (
        <p>Price: ${state.totalPrice.toFixed(2)}</p>
      )}

      <StripeCheckout
        stripeKey="pk_test_51OepDPIEo0qy9qOoGhEwRkclGuAhHwQjceS6P5ZRTYrySIkq06nXNnd52rzNguGTBAzik0StuRDLsrkDUJaLTAJ200vSUxp0bq"
        token={onToken}
        name = "Nick's Guitars"
        description = "Best Twigs in the Universe"
        image="https://tse1.mm.bing.net/th?id=OIP.PjQt1Rpp4N23jUZ7FDfTWQHaEK&pid=Api&P=0&h=220"
        panelLabel="Submit Payment"
        allowRememberMe
        alipay
        bitcoin
        billingAddress = {true}
        shippingAddress
        amount={state.totalPrice * 100}
      />
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { CartContext } from "./CartContext";
import Cart from "./components/Cart";

function App() {
  const [state, setState] = useState({
    products: [],
    cart: [],
    totalPrice: 0,
  });

  const addToCart = (product) => {
    const existingCartItem = state.cart.find(
      (cartItem) => cartItem.product.id === product.id
    );

    setState((prevState) => ({
      ...prevState,
      cart: existingCartItem
        ? prevState.cart.map((cartItem) =>
            cartItem.product.id === product.id
              ? { ...cartItem, count: cartItem.count + 1, price: parseFloat(cartItem.price) }
              : cartItem
          )
        : [...prevState.cart, { product, count: 1 }],
      totalPrice: prevState.totalPrice > 0 ? prevState.totalPrice + parseFloat(product.price): parseFloat(product.price),
    }));
  };
  

  const removeFromCart = (id) => {
    setState((prevState) => {
      const existingCartItem = prevState.cart.find(
        (cartItem) => cartItem.product.id === id
      );

      if (!existingCartItem) {
        return prevState;
      }

      const updatedCart = prevState.cart.map((cartItem) =>
        cartItem.product.id === id
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      );

      const updatedTotalPrice =
        prevState.totalPrice - parseFloat(existingCartItem.product.price);

      return {
        ...prevState,
        cart: updatedCart.filter((cartItem) => cartItem.count > 0),
        totalPrice: updatedTotalPrice,
      };
    });
  };

  useEffect(() => {
    fetch("http://localhost:3003/api/get-products")
      .then((response) => response.json())
      .then((data) =>
        setState((prevState) => ({ ...prevState, products: data }))
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  console.log(state)

  return (
    <CartContext.Provider value={{ state: state, addToCart, removeFromCart }}>
      <div className="App">
        <h1 className="available-products-title">Available Products</h1>
        <div className="products-container">
          {state.products.map((product) => (
            <div key={product.id} className="product-item">
              <h2>
                <i>{product.make}</i>
              </h2>
              <h3>{product.model}</h3>
              <img
                src={product.image}
                alt={`${product.make} ${product.model}`}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
              <h4>${product.price}</h4>
              <Button variant="contained" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
        <Cart />
      </div>
    </CartContext.Provider>
  );
}

export default App;

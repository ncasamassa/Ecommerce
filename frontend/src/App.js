import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import { CartContext } from "./CartContext";
import Cart from "./components/Cart";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({
    products: [],
    cart: [],
    totalPrice: 0,
  });

  const totalItemsInCart = state.cart.reduce(
    (total, cartItem) => total + cartItem.count,
    0
  );

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const addToCart = (product) => {
    const existingCartItem = state.cart.find(
      (cartItem) => cartItem.product.id === product.id
    );

    setState((prevState) => ({
      ...prevState,
      cart: existingCartItem
        ? prevState.cart.map((cartItem) =>
            cartItem.product.id === product.id
              ? {
                  ...cartItem,
                  count: cartItem.count + 1,
                  price: parseFloat(cartItem.price),
                }
              : cartItem
          )
        : [...prevState.cart, { product, count: 1 }],
      totalPrice:
        prevState.totalPrice > 0
          ? prevState.totalPrice + parseFloat(product.price)
          : parseFloat(product.price),
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

  console.log(state);

  return (
    <CartContext.Provider value={{ state: state, addToCart, removeFromCart }}>
      <div className="App">
        <AppBar position="fixed">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Nick's Guitars</Typography>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Gibson</MenuItem>
                <MenuItem onClick={handleMenuClose}>Tom Anderson</MenuItem>
                <MenuItem onClick={handleMenuClose}>Jackson</MenuItem>
                <MenuItem onClick={handleMenuClose}>Ormsby</MenuItem>
                <MenuItem onClick={handleMenuClose}>Suhr</MenuItem>
              </Menu>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={toggleDrawer(true)}
              />
              {totalItemsInCart > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    marginLeft: "5px",
                  }}
                >
                  {totalItemsInCart}
                </span>
              )}
            </div>

            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <div
                style={{
                  width: 300,
                  padding: "20px",
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Cart />
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
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
      </div>
    </CartContext.Provider>
  );
}

export default App;

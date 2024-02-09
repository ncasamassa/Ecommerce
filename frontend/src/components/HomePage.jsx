import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ position: "relative" }}>
      <Link to="/app">
        <img
          src="https://webstockreview.net/images/clipart-guitar-crossed-16.png"
          alt="Big Picture"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "8vw" }}>Nick's Guitars</h1>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;

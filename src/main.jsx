import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./Components/Context/WishlistContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <WishlistProvider>
    <App />
    </WishlistProvider>
  </BrowserRouter>
);

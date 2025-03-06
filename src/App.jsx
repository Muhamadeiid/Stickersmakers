import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Products from "./Routes/Products";
import Contact from "./Routes/Contact";
import Adminproducts from "./Routes/Adminproducts";
import Addproduct from "./Routes/Addproduct";
import Register from "./Routes/Register";
import AuthRoute from "./Routes/AuthRoute";
import axios from "axios";
import SingleProduct from "./Routes/SingleProduct";
import Wishlist from "./Routes/Wishlist";
import NotFoundPage from "./Routes/NotFoundPage";



function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/products" element={<Products />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/dashboard" element={<AuthRoute component={Adminproducts} />} />
    <Route path="/addproduct" element={<AuthRoute component={Addproduct} />} />
    <Route path="/login" element={<Register />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/products/:id" element={<SingleProduct />} />
    <Route path="*" element={<NotFoundPage />} />

  </Routes>
  );
}

export default App;
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Products from "./Routes/Products";
import Contact from "./Routes/Contact";
import Cart from "./Routes/Cart";


function App() {
  return (
    <Routes>
    <Route path="/" element = {<Home/>}></Route>
    <Route path="/about" element = {<About />}></Route>
    <Route path="/products" element = {<Products />}></Route>
    <Route path="/contact" element = {<Contact />}></Route>
    <Route path="/cart" element = {<Cart />}></Route>
    </Routes>
  );
}

export default App;
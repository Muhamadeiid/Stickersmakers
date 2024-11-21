import React from 'react'
import { FaEnvelope, FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import logo from "../../Images/logo.png"
import { Link } from 'react-router-dom';
import { IoCall } from 'react-icons/io5';



const Footer = () => {
  return (
    <>
      <footer className='dark:bg-[#2e2e2e] bg-[#415161] w-full flex justify-center py-10'>
        <div className='z-50 w-11/12 flex sm:flex-row flex-col gap-10 sm:gap-0 sm:flex-wrap'>
        <div className='footer-col h-40 align-top flex justify-start items-start relative sm:-top-10'>
        <Link to="/"><img src={logo} className="w-60 h-full" alt="Logo" /></Link>
            </div>
            <div className='footer-col'>
                <h3>Custom Print Store</h3>
                <div className='flex w-full gap-8'>
                <FaFacebookSquare className='cursor-pointer' size={24} fill='white' />
                <FaInstagram className='cursor-pointer' size={24} fill='white' />
                <AiFillTikTok className='cursor-pointer' size={24} fill='white' />
                </div>
            </div>
            <div className='footer-col'>
                <h3>Get in Touch with Us</h3>
                <div className="flex flex-col gap-4">
            <div className="flex gap-4 text-fontColor">
          <IoCall size={24} fill="#ff5151" />
          <p className="text-white">
          info@example.com</p>
          </div>
          <div className="flex gap-4 text-fontColor">
          <FaEnvelope size={24} fill="#ff5151" />
          <p className="text-white">123-456-7890/91</p>
          </div>
          </div>
            </div>
            <div className='footer-col'>
                <h3>Quick Links</h3>
                <ul className='flex flex-col gap-2'>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/products">All Products</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/cart">Your Cart</Link></li>
                </ul>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

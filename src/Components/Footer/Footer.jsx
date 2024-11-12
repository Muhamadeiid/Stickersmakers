import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";



const Footer = () => {
  return (
    <>
      <footer className='dark:bg-black bg-[#415161] w-full flex justify-center py-10'>
        <div className='w-11/12 flex'>
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
            </div>
            <div className='footer-col'>
                <h3>Quick Links</h3>
            </div>
            
        </div>
      </footer>
    </>
  )
}

export default Footer

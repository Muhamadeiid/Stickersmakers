import React from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { IoCall } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <section className=" dark:bg-darkColor w-full flex justify-center items-center px-8 pt-20 pb-24 ">
        <div className=" md:w-10/12 w-11/12 flex md:flex-row flex-col gap-8 justify-center items-center">
          <motion.div
            initial={{
              transform: "translateY(-1800px)",
            }}
            animate={{
              transform: "translateY(0px)",
              transition: {
                type: "spring",
                stiffness: 100,
                duration: 1,
              },
            }}
            className="md:w-1/2 w-full flex flex-col justify-start gap-8"
          >
            <div className="dark:text-white title w-full flex flex-col gap-8 justify-start ">
              <h1 className="dark:text-white lg:text-7xl text-5xl sm:text-4xl text-fontColor font-bold">
                Say Hello.
              </h1>
              <p className="dark:text-white text-fontColor md:max-w-[500px] max-w-[800px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
            <div className="flex flex-col gap-4 z-50">
              <div className="flex gap-4 dark:text-white text-fontColor">
                <IoCall size={24} />
                <p className="dark:text-white">info@example.com</p>
              </div>
              <div className="flex gap-4 dark:text-white text-fontColor">
                <FaEnvelope size={24} />
                <p className="dark:text-white fill-fontColor dark:fill-white">
                  123-456-7890/91
                </p>
              </div>
            </div>
          </motion.div>
          <div className="form md:w-1/2 w-full dark:shadow-darkShadow rounded-2xl shadow-lg p-12 flex flex-col gap-8">
            <h1 className="dark:text-white text-4xl font-bold text-fontColor">
              Ask Your Queries
            </h1>
            <form
              action="http://127.0.0.1:8000/api/inquire"
              method="post"
              className="flex flex-col gap-6"
            >
              <input type="text" placeholder="Your Email" name="name" />
              <input type="text" placeholder="Subject" name="phone" />
              <textarea
                name="message"
                className=""
                placeholder="Leave a comment..."
              />
              <input type="submit" value="Send Message" />
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;

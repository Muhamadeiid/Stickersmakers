import React from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";
import { GiTargetPoster } from "react-icons/gi";
import { TbSticker2 } from "react-icons/tb";
import { FaRegKeyboard } from "react-icons/fa6";
import { IoLaptop } from "react-icons/io5";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <section className="w-full py-32 flex justify-center items-center dark:bg-darkColor bg-[#f5f6f7]">
        <div className="flex flex-col items-center justify-center gap-8 text-fontColor dark:text-white ">
          <h1 className=" font-bold text-4xl md:text-6xl ">About Us</h1>
          <p className=" text-base max-w-[600px] text-center">
            Founded in 2020, Stickers Makers has been dedicated to providing
            high-quality and durable stickers for personalizing your workspace.
            Order your favorite sticker now!
          </p>
        </div>
      </section>
      <section className="px-20 dark:bg-darkColor flex lg:flex-row flex-col gap-12 py-16 md:py-24  justify-center ">
        <div className="lg:w-1/3 w-full text-fontColor  dark:text-white ">
          <h1 className="text-3xl mb-6 font-bold">
            What We Deliver<br />
          </h1>
          <p className="leading-8">
            At Stickers Makers, quality and affordability go hand in hand. We
            take pride in offering four main products, helping people to show
            personality and turn ideas into high-quality stickers.
          </p>
        </div>
        <div className=" gap-8 grid justify-items-center grid-cols-1 sm:grid-cols-2">
          <div className="about-box ">
            <TbSticker2 size={28} />
            <h1 className="title">Laptop Stickers</h1>
            <p className="description">
              Best quality for the best prices! Enjoy our cool stickers on your
              laptop.
            </p>
          </div>
          <div className="about-box">
            <IoLaptop size={28} />
            <h1 className="title">Laptop Skins</h1>
            <p className="description">
              One of our best-selling products. Gives any laptop a unique and
              delicate touch.
            </p>
          </div>
          <div className="about-box">
            <FaRegKeyboard size={28} />
            <h1 className="title">Keyboard Stickers </h1>
            <p className="description">
              Customized for your laptop model to fit perfectly. They will never
              let you down!
            </p>
          </div>
          <div className="about-box">
            <GiTargetPoster size={28} />
            <h1 className="title">Posters</h1>
            <p className="description">
              The coolest! Choose from our marvelous collection to decorate your
              walls.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-around bg-fontColor dark:bg-darkColor text-white py-10">
        <h1 className="text-4xl font-bold">
          Get Best Price On Customized Designs!
        </h1>
        <button className=" border-2 text-sm font-bold w-40 rounded-lg">
          <Link to="/products">GET STARTED</Link>
        </button>
      </section>
      <section className="w-full text-fontColor flex justify-evenly items-center dark:text-white dark:bg-darkColor px-20 py-40">
        <div className="flex flex-col gap-12 w-1/3">
          <h1 className=" text-start text-3xl font-bold">Best Quality</h1>
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h6>Personal Gifts</h6>
              <h6>Ocassional Gifts</h6>
              <h6> Corporate Gifts</h6>
            </div>
            <div className="flex flex-col gap-4">
              <h6>Couple T-shirts</h6>
              <h6>Wedding Package</h6>
              <h6>Coraporate Gifts</h6>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-16 font-bold">
          <div className="flex gap-6 justify-start items-center">
            <MdArrowRight className="text-mainColor" size={24} />
            <h4>We Can Custom Design Your ideas</h4>
          </div>
          <div className="flex gap-6 justify-start items-center">
            <MdArrowRight className="text-mainColor" size={24} />
            <h4>We Offer Discounts and Coupons</h4>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;

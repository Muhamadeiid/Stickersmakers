import React from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <section className="w-full py-20 flex justify-center items-center dark:bg-darkColor">
        <div className="flex flex-col items-center justify-center gap-8 text-fontColor dark:text-white ">
          <h1 className=" font-bold text-5xl ">About Us</h1>
          <p className=" text-base max-w-[600px] text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            ullam ad veritatis similique architecto iusto eius, sequi at vel
            veniam culpa ipsa aspernatur hic.
          </p>
        </div>
      </section>
      <section className="px-20 dark:bg-darkColor flex gap-12 py-40 ">
        <div className="w-1/2 text-fontColor  dark:text-white ">
          <h1 className="text-3xl mb-6 font-bold">
            We are your Favourite, <br />
            Online Store.
          </h1>
          <p className="leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            dolor ratione quisquam qui deserunt a. Vel, maxime a? Cum eaque
            consectetur laboriosam explicabo voluptates nam. Deleniti dolore
            officiis praesentium repellendus?
          </p>
        </div>
        <div className="w-1/2 grid grid-cols-2">
          <div>Hi</div>
          <div>Hi</div>
          <div>Hi</div>
          <div>Hi</div>
        </div>
      </section>
      <section className="w-full flex justify-around bg-mainColor dark:bg-darkColor text-white py-10">
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
            <h4>Your Payment Is Safe And Secured</h4>
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

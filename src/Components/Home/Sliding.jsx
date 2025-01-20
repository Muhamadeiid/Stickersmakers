import React, { useEffect, useState } from "react";
import first from "../../Images/Backgroundimage.jpg";
import second from "../../Images/second Background Image.jpg";
import third from "../../Images/third Background.png";
import "./Homepage.css";

const Sliding = () => {
  const backgrounds = [first, second, third];
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(null);

  useEffect(() => {
    const changeBackground = () => {
      const nextIndex = (currentImage + 1) % backgrounds.length;
      setNextImage(nextIndex);

      setTimeout(() => {
        setCurrentImage(nextIndex);
        setNextImage(null);
      }, 2000);
    };

    const timer = setTimeout(changeBackground, 2000);
    return () => clearTimeout(timer);
  }, [currentImage, backgrounds.length]);

  return (
    <section className="pb-20 mx-auto dark:bg-darkColor landing h-fit md:w-4/5 flex justify-center items-center">
      <div className="relative h-[80vh] w-full flex justify-center items-center overflow-hidden">
        <div className="hero w-4/5 z-20 absolute my-10 mx-5 text-white">
          <h3 className=" dark:text-white font-bold text-xl">
            Best Quality Products
          </h3>
          <h1 className="leading-[4rem] my-6 dark:text-white font-bold text-6xl">
            We Print What
            <br />
            You Want
          </h1>
          <p className="dark:text-white text-xl max-w-[550px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            nulla porro ex nobis, praesentium est sint culpa aut at ad deleniti
            voluptate ratione tempora id, quidem corporis quibusdam? Deleniti,
            magni.
          </p>
        </div>
        <div className="absolute w-full h-full">
          <div className="absolute h-full w-full z-10 opacity-50 bg-black"></div>
          <div className="absolute h-full w-full">
            <img
              className={`absolute h-full w-full transition-opacity object-cover ${
                nextImage !== null ? "fade-out" : ""
              }`}
              src={backgrounds[currentImage]}
              alt="current background"
            />
            {nextImage !== null && (
              <img
                className="absolute h-full w-full transition-opacity fade-in object-cover"
                src={backgrounds[nextImage]}
                alt="next background"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sliding;

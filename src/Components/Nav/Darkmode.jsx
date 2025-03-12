import React, { useEffect, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
const Darkmode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  useEffect(() => {
    if (theme == "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <>
      <MdLightMode
        className={theme == "light" ? "block cursor-pointer" : "hidden"}
        fill="#FDB813"
        size={32}
        onClick={() => {
          setTheme("dark");
        }}
      />
      <BsFillMoonStarsFill
        className={theme == "dark" ? "block cursor-pointer " : "hidden"}
        fill="#F6F1D5"
        size={32}
        onClick={() => {
          setTheme("light");
        }}
      />
    </>
  );
};

export default Darkmode;

import React from "react";
import { Link } from "react-router-dom";
import background from "../../Images/Backgroundimage.jpg";

const RegisterPage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen w-screen flex justify-center items-center">
        <div className="container md:w-1/2 w-4/5 border rounded-3xl shadow flex flex-col gap-4 text-fontColor p-8 bg-white">
          <h1 className="text-4xl font-bold">Create New Account</h1>
          <div className="flex gap-2  items-center ">
            <h6 className="text-fontColor">Already A Member?</h6>
            <Link className="text-[#2e679c] font-bold text-sm" to="/">
              Log in
            </Link>
          </div>
          <form
            action="post"
            className="register-form flex flex-col gap-8 mt-6"
          >
            <div>
              <label htmlFor="name">Enter Your Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label htmlFor="email">Enter Your Email</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label htmlFor="password">Enter Your Password</label>
              <input type="password" name="password" />
            </div>
            <input
              type="submit"
              value="Create Account"
              className="w-[200px] h-12 self-center rounded-full cursor-pointer bg-[#1d90f4] text-white font-bold "
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

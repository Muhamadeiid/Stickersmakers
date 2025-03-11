import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from '../Components/Nav/Navbar'
import Footer from "../Components/Footer/Footer";

const NotFoundPage = () => {
  return (
    <div className="dark:bg-darkColor dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-6xl font-bold text-fontColor dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-fontColor dark:text-white mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The page You're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
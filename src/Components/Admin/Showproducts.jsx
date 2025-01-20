import React from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";

const Showproducts = () => {
  return (
    <>
    <Navbar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Price
              </th>
              <th scope="col" className="px-16 py-3 text-center">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4 text-center"></td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                Apple Watch
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center"></div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center"></td>
              <td className="p-4 text-center">
                <img
                  src="/docs/images/products/apple-watch.png"
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt=""
                />
              </td>
              <td className="px-6 py-4 flex gap-4 justify-center">
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Showproducts;

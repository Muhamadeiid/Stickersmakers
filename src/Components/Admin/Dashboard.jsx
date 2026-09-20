import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import api from "../../lib/api";
import { getProductImageUrl, normalizeProduct } from "../../lib/products";
import { useNavigate, Link } from "react-router-dom";

const Showproducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    api
      .get("/showproducts", { withCredentials: true })
      .then((res) => {
        const productsWithParsedImage = (res.data.Products || []).map(normalizeProduct);
        setProducts(productsWithParsedImage);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleRemove = (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    api
      .delete(`/deleteproduct/${id}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch(() => {
        alert("Failed to delete product. Please try again.");
      });
  };

  const handleEdit = (product) => {
    navigate("/addproduct", { state: { product } });
  };

  return (
    <div className="dark:bg-darkColor">

      <Navbar />
      <div className="p-4">
        <div className="hidden md:block overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  NO.
                </th>
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
              {paginatedProducts.map((item, id) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4 text-center">
                    {(currentPage - 1) * itemsPerPage + id + 1}
                  </td>
                  <td className="p-4 text-center">{item.name}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      {item.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                    <div className="flex items-center justify-center">
                      {item.price}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <img
                        src={getProductImageUrl(item)}
                        className="w-16 md:w-32 max-w-[150px] max-h-[150px] rounded object-fit"
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-4 justify-center items-center h-full">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {paginatedProducts.map((item, id) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">NO.</span>
                  <span>{(currentPage - 1) * itemsPerPage + id + 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Product Name</span>
                  <span>{item.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Category</span>
                  <span>{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Description</span>
                  <span>{item.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Price</span>
                  <span>{item.price}</span>
                </div>
                <div className="flex justify-center">
                  <img
                    src={getProductImageUrl(item)}
                    className="w-32 md:w-32 max-w-[150px] max-h-[150px] rounded object-fit"
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 my-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            Page {currentPage} of {Math.max(totalPages, 1)}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex justify-center my-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
            <Link to="/addproduct">Add Product</Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Showproducts;

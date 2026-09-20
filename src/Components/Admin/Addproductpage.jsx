import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";
import api from "../../lib/api";
import { getProductImageUrl, normalizeProduct } from "../../lib/products";

const Addproductpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productToEdit = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productToEdit?.id) {
      setLoading(true);
      api
        .get(`/singleproduct/${productToEdit.id}`)
        .then((response) => {
          const productData = normalizeProduct(response.data.message);

          setFormData({
            name: productData.name,
            category: productData.category,
            description: productData.description,
            price: productData.price,
            image: productData.image.url,
          });

        })
        .catch(() => setError("Unable to load this product."))
        .finally(() => setLoading(false));
    }
  }, [productToEdit]);

  const getImageUrl = () => {
    if (imagePreview) return imagePreview;
    if (formData.image) return getProductImageUrl({ image: formData.image });
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    const url = productToEdit
      ? `/update/${productToEdit.id}`
      : "/addproduct";

    api
      .post(url, data)
      .then(() => navigate("/dashboard"))
      .catch(() => setError("Unable to save the product. Please check the form and try again."))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="dark:bg-darkColor dark:text-white">
      <Navbar />
      <div className="lg:w-4/5 md:w-9/10 w-4/5 py-10 mx-auto flex flex-col md:justify-center md:items-start items-center gap-4 dark:bg-darkColor">
        <p className="text-3xl dark:text-white text-fontColor font-bold">
          {productToEdit ? "Edit Product" : "Add Product"}
        </p>
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          method="post"
          className="addproduct-form  w-full flex flex-col mx-auto p-8  gap-10 items-start justify-center dark:shadow-darkShadow dark:border-[#2e2e2e] rounded-2xl shadow-md "
        >
          {error && <p className="text-red-600" role="alert">{error}</p>}
          <div className="w-full  flex flex-col-reverse sm:flex-row justify-start items-start md:gap-0 gap-8">
            <div className="image w-full md:w-1/2 flex flex-col items-start md:justify-start ">
              <h1 className="text-fontColor dark:text-white text-start font-bold  mb-10 md:mb-1">
                Main Image
              </h1>
              {loading ? (
                <p>Loading...</p>
              ) : getImageUrl() ? (
                <img
                  src={getImageUrl()}
                  alt="Product"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <MdOutlineImageSearch
                  className="lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[200px] h-[200px] fill-fontColor dark:fill-white siz"
                />
              )}
            </div>
            <div className=" inputs w-full md:w-1/2 flex flex-col justify-start items-start  px-4 gap-4">
              <div className="form-div ">
                <label htmlFor="name">Product Name</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-div">
                <label htmlFor="description">Product Description</label>
                <textarea
                  name="description"
                  id=""
                  required
                  value={formData.description}
                  onChange={handleChange}
                  autoComplete="off"
                  rows={4}
                />
              </div>
              <div className="form-div">
                <label htmlFor="category">Product Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="text-fontColor w-full border border-[#ddd] rounded-md px-4 py-2 dark:shadow-[#2e2e2e] shadow focus:border-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Sticker">Sticker</option>
                  <option value="Laptop Skin">Laptop Skin</option>
                  <option value="Keyboard Skin">Keyboard Skin</option>
                  <option value="Poster">Poster</option>
                </select>
              </div>

              {/* <div className="form-div">
                <label htmlFor="price">Product Price</label>
                <input type="text" value={formData.price}
                  onChange={handleChange} name="price" autoComplete="off" required />
              </div> */}
              <div className="form-div">
                <label htmlFor="image">Product Image</label>
                <input
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full h-10"
                  type="file"
                  name="image"
                  placeholder=""
                  required={!formData.image} 
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected file:{" "}
                    {formData.image instanceof File
                      ? formData.image.name
                      : "Existing image"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full buttons flex justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-40 h-10 bg-orange-600 text-white font-bold  py-1 rounded-md"
            >
              Cancel
            </button>
            <input
              type="submit"
              className=" w-40 h-10 cursor-pointer bg-fontColor text-white px-3 py-1  font-bold rounded-md"
              value={productToEdit ? "Update Product" : "Add Product"}
              disabled={submitting}
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Addproductpage;

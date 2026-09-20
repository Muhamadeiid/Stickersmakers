import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./Routes/AuthRoute";
import PageLoader from "./Components/Common/PageLoader";
import RouteMetadata from "./Components/Common/RouteMetadata";

const Home = lazy(() => import("./Routes/Home"));
const About = lazy(() => import("./Routes/About"));
const Products = lazy(() => import("./Routes/Products"));
const Contact = lazy(() => import("./Routes/Contact"));
const AdminProducts = lazy(() => import("./Routes/Adminproducts"));
const AddProduct = lazy(() => import("./Routes/Addproduct"));
const Login = lazy(() => import("./Routes/Register"));
const SingleProduct = lazy(() => import("./Routes/SingleProduct"));
const Wishlist = lazy(() => import("./Routes/Wishlist"));
const NotFoundPage = lazy(() => import("./Routes/NotFoundPage"));
const Inquiries = lazy(() => import("./Routes/DMs"));
const CustomOrder = lazy(() => import("./Routes/CustomOrder"));
const CustomOrders = lazy(() => import("./Routes/CustomOrders"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouteMetadata />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/custom-order" element={<CustomOrder />} />
        <Route path="/dashboard" element={<AuthRoute component={AdminProducts} />} />
        <Route path="/addproduct" element={<AuthRoute component={AddProduct} />} />
        <Route path="/inquiries" element={<AuthRoute component={Inquiries} />} />
        <Route path="/custom-orders" element={<AuthRoute component={CustomOrders} />} />
        <Route path="/inquires" element={<AuthRoute component={Inquiries} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

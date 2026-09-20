import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/fredoka/latin-400.css";
import "@fontsource/fredoka/latin-500.css";
import "@fontsource/fredoka/latin-600.css";
import "@fontsource/fredoka/latin-700.css";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./Components/Context/WishlistContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </BrowserRouter>
);

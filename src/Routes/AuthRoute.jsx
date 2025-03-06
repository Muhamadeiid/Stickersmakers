import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, 
        });

        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    validateToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div className="container-loading flex h-screen w-full justify-center items-center"><span className="loader"></span></div>;
  }

  return isAuthenticated ? <Component /> : null;
};

export default AuthRoute;

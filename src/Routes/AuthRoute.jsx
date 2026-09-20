import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../lib/api";
import PageLoader from "../Components/Common/PageLoader";

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
        const response = await api.get("/validate-token", {
          withCredentials: true, 
        });

        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    };

    validateToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <PageLoader />;
  }

  return isAuthenticated ? <Component /> : null;
};

AuthRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default AuthRoute;

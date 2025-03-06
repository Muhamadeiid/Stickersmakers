import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"
import { div } from "framer-motion/client";

axios.defaults.withCredentials = true;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    axios.post("http://127.0.0.1:8000/api/login", data)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.username);
          localStorage.setItem('isAuthenticated', 'true');
          navigate("/dashboard");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError("An error occurred during login. Please try again.");
        console.error("Login error:", err);
      });
  };

  
  if (isLoading) {
    return <div className="container-loading flex h-screen w-full justify-center items-center"><span className="loader"></span></div>
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          <input
            type="password"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
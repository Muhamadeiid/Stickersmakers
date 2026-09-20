import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import "./Register.css"

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    api.get('/validate-token', { withCredentials: true })
      .then((res) => {
        if (res.data.valid) navigate('/dashboard', { replace: true });
        else localStorage.removeItem('token');
      })
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const data = {
      email: email,
      password: password,
    };

    api.post("/login", data, { withCredentials: true })
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
      .catch(() => {
        setError("An error occurred during login. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
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
            type="email"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            autoComplete="current-password"
          />
          {error && <p className="text-red-500 text-center" role="alert">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

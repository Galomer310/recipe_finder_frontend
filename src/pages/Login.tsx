import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Hook for redirecting

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password }
      );
      dispatch(setToken(response.data.token));

      // ✅ Redirect to Search Recipes page
      navigate("/search");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

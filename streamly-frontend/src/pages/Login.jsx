// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const role = await login(email, password);
      if (role === "ADMIN") navigate("/admin");
      else if (role === "USER") navigate("/user");
      else if (role === "VIEWER") navigate("/viewer");
    } catch (err) {
      console.error(err);
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="page-container auth-page">
      <div className="card">
        <h2>Login</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {message && <p className="error-text">{message}</p>}

        <p style={{ marginTop: "12px", textAlign: "center" }}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

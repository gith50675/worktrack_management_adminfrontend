// src/components/auth/Login.jsx
import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill both fields");
      return;
    }

    try {
      setLoading(true);
      // Ensure Django URL matches; recommended to use trailing slash
      const res = await api.post("/admin_app/login", formData);
      toast.success(res.data?.message || "Login successful");

      // Save tokens / user as you need (example localStorage)
      if (res.data?.access) localStorage.setItem("access", res.data.access);
      if (res.data?.refresh) localStorage.setItem("refresh", res.data.refresh);
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect to dashboard or home
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.detail || err.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupmain">
      <div className="signupcontainer">
        <div className="signup-left-section">
          <div className="signup-logo-box">
            <img className="tron-logo" src="Component 180.png" alt="Tron Logo" />
          </div>
        </div>

        <div className="signup-right-section">
          <div className="signup-form-card">
            <div className="signup-login-and-signup">
              <Link to="/signup"><p className="inactive">Sign Up</p></Link>
              <p className="signupname">Login</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="signup-label">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="signup-input"
                placeholder="Enter your email"
                required
              />

              <label className="signup-label">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="signup-input password-input"
                placeholder="Enter your password"
                required
              />

              <button className="signupbutton" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

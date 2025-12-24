
import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"; 
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    const { name, email, mobile, password } = formData;
    if (!name || !email || !mobile || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      // Ensure the URL matches your Django route (trailing slash if your Django uses it)
      const res = await api.post("/admin_app/signup", formData);
      toast.success(res.data?.message || "Signup successful!");
      setFormData({ name: "", email: "", mobile: "", password: "" });
      // optionally redirect to login
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.error || error.message || "Signup failed.";
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
              <p className="signupname">Sign Up</p>
              <Link to="/login"><p className="inactive">Login</p></Link>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="signup-label">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="signup-input"
                placeholder="Enter your name"
                required
              />

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

              <label className="signup-label">Mobile Number</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                className="signup-input"
                placeholder="Enter your mobile number"
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
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

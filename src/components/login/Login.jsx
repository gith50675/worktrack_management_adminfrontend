import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../signup/Signup.css";
import api from "../../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shownRef = useRef(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      location.state?.reason === "signup-disabled" &&
      !shownRef.current
    ) {
      toast.info("Login required. Only admins can create new users.");
      shownRef.current = true;
    }
  }, [location.state]);

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

      const res = await api.post(
        "/admin_app/login/",
        formData
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      toast.success("Admin login successful");
      navigate("/dashboard");

    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Login failed";
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
            <img
              className="tron-logo"
              src="\tron...-02.png"
              alt="Tron Logo"
            />
            {/* <h1 style={{
              color: 'white',
              fontSize: '42px',
              fontWeight: '800',
              margin: '0',
              letterSpacing: '2px',
              fontFamily: "'Outfit', sans-serif"
            // }}>TRON</h1>
            <p style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              margin: '0',
              letterSpacing: '4px',
              opacity: '0.9',
              fontFamily: "'Outfit', sans-serif",
              fontStyle: 'italic'
            // }}>ACADEMY</p> */}
          </div>
        </div>

        <div className="signup-right-section">
          <div className="signup-form-card">

            <div className="signup-login-and-signup">
              <Link to="/signup">
                <p className="inactive">Sign Up</p>
              </Link>
              <p className="signupname">Login</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="signup-field">
                <label className="signup-label">Name</label>
                <input
                  name="email"
                  type="email"
                  className="signup-input"
                  placeholder="Enter your name or email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-field">
                <label className="signup-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="signup-input"
                    placeholder="Enter your password"
                    style={{ marginBottom: '0' }}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </div>
                </div>
              </div>


              <button
                className="signupbutton"
                type="submit"
                disabled={loading}
              >
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

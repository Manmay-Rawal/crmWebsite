import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import banner from "../images/banner.png";
import axios from "axios";
import { useAuth } from "../pages/auth/AuthContext";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value.trim() });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      axios
        .post("http://localhost:4000/user/login", userData)
        .then((res) => {
          if (res.status === 200) {
            if(res.data.role==="admin"){
              const userData = res.data;
              login(userData)
              navigate("/admin-dashboard")
            }
            else{
            const userData = res.data;
            login(userData);
            navigate("/");
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.message || "Login failed. Please try again.");
          } else {
            console.error(error);
            alert("An error occurred. Please try again later.");
          }
        });
    } else {
      alert("Please provide both email and password.");
    }
  };

  return (
    <div>
      <div id="header"></div>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="container-fluid vh-100 vw-100 row shadow-lg bg-white rounded w-75">
          <div className="col-md-6 p-5 w-50 h-100">
            <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: "150px" }} />
            <h1 className="h4">Log in</h1>
            <p className="text-muted">Enter your credentials to log in</p>
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Admin ID</label>
                <input
                  type="String"
                  className="form-control"
                  role="admin"
                  id="admin"
                  name="admin"
                  placeholder="Admin ID"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">User ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="User ID"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-outline-secondary toggle-password"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-danger w-100 mb-3">Log in with Password</button>
              <Link to="/loginotp" className="btn btn-danger w-100 mb-3">Log in with OTP</Link>
              <hr />
              <Link to="/signup" className="btn btn-outline-danger w-100">Sign-up</Link>
            </form>
            <p className="text-center small mt-4">
              Engineered by <span className="text-danger fw-bold">SUBTECH</span>
            </p>
          </div>
          <div className="col-md-6 d-md-flex align-items-left justify-content-left">
            <img src={banner} alt="Banner" className="img-fluid" />
          </div>
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default Login;

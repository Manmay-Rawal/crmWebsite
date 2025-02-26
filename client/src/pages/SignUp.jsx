import React, { useState } from 'react';
import logo from '../images/logo.png';
import banner from '../images/banner.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value.trim() });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, phoneNo, password, confirmPassword } = userData;

    if (!firstName || !lastName) {
      alert('First Name and Last Name are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('https://crmwebsite-ww7w.onrender.com/user/signup', userData);
        if (response.status === 201) {
          alert('Registration successful!');
          navigate('/login');
        }
      } catch (error) {
        if (error.response) {
          alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
        } else if (error.request) {
          alert('No response from server. Please check your network or server status.');
        } else {
          alert('An unexpected error occurred.');
        }
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div id="header"></div>

      {/* Sign-Up Section */}
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="container-fluid vh-100 vw-100 row shadow-lg bg-white rounded w-75">
          {/* Left Section: Sign-Up Form */}
          <div className="col-md-6 p-5">
            <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '150px' }} />
            <h1 className="h4">Sign Up</h1>
            <p className="text-muted">Enter your credentials to Sign Up</p>
            <form id="signUpForm" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">E-mail ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="E-mail ID"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phoneNo" className="form-label">Phone No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Phone No."
                  value={userData.phoneNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary toggle-password"
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary toggle-password"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-danger w-100 mb-3">Submit</button>
            </form>
            <p className="text-center small mt-4">
              Engineered by <span className="text-danger fw-bold">SUBTECH</span>
            </p>
          </div>

          {/* Right Section: Banner */}
          <div className="col-md-6 d-md-flex align-items-center justify-content-center">
            <img src={banner} alt="Banner" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer"></div>
    </div>
  );
}

export default SignUp;

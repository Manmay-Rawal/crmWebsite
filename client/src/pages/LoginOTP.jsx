import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import banner from "../images/banner.png";
import { useAuth } from "../pages/auth/AuthContext";


const LoginOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");  // Clear any previous success message

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Enter a valid email address");
        return;
    }

    setLoading(true);
    try {
        const response = await axios.post("https://crmwebsite-ww7w.onrender.com/user/password", { email });

        // console.log(response.data); // Debugging: Check the entire response in console
        if (response.data.success === true) {
            setIsOtpSent(true);
            setSuccessMessage("OTP sent to your email.");
        } else {
            setError(response.data.message || "Failed to send OTP. Try again.");
        }
    } catch (err) {
        console.error("Error sending OTP:", err.response?.data);
        setError("Error sending OTP. Check server.");
    } finally {
        setLoading(false);
    }
};

const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{4}$/.test(otp)) {
        setError("Enter a valid 4-digit OTP");
        return;
    }

    setLoading(true);
    try {

        const response = await axios.post(
          "https://crmwebsite-ww7w.onrender.com/user/verify-otp",
          { email, otp: Number(otp) },
          { headers: { 'Content-Type': 'application/json' } }
        );

       
        if (response.data.success === true) {
          login(response.data);
            navigate("/");
            // Redirect user after successful login
        } else {
            setError("Invalid OTP. Try again.");
        }
    } catch (err) {
        console.error("Error verifying OTP:", err.response?.data);
        setError(err.response?.data?.message || "Error verifying OTP. Try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container-fluid vh-100 vw-100 row shadow-lg bg-white rounded w-75">
        <div className="col-md-6 p-5 w-50 h-100">
          <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: "150px" }} />
          <h1 className="h4" >Log in</h1>
          <p className="text-muted" >Enter your email to receive an OTP</p>

          {error && <p className="error">{error}</p>}

          {!isOtpSent ? (
            <form onSubmit={handleSendOtp}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <input
                type="number"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter the OTP"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
          {/* <hr />
          <Link to="/signup" className="btn btn-outline-danger w-100">
            Sign-up
          </Link> */}
          <p className="footer">Engineered by <span>SUBTECH</span></p>
        </div>

        <div className="col-md-6 d-md-flex align-items-left justify-content-left">
          <img src={banner} alt="Banner" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default LoginOTP;

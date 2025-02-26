import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";


const Navbar = () => {
  const { user,logout } = useAuth();


  useEffect(() => {
    console.log(user); // Logs user whenever it changes
  }, [user]);


  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2c3e50" }}>
      <div className="container-fluid">
        {/* Brand Section */}
        <a className="navbar-brand d-flex align-items-center text-white" href="#">
          <img
            src={logo}
            alt="Logo"
            className="me-2"
            height="30"
          />
          CRM
        </a>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Leads
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Contacts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Accounts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Deals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Tasks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Meetings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Calls
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Projects
              </a>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="d-flex align-items-center">
            <a href="#" className="me-3 text-primary fw-bold">
              UPGRADE
            </a>
            <a href="#" className="me-3 text-white">
              🔍
            </a>
            <a href="#" className="me-3 text-white">
              🔔
            </a>
            <a href="#" className="me-3 text-white">
              ⚙️
            </a>
            <Link
              className="d-flex justify-content-center align-items-center"
              to="/login"
              style={{
                backgroundColor: "#e74c3c",
                textDecoration: "none",
                color: "white",
                height: "35px",
                width: "60px",
                borderRadius: "10%",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {user ? (
                <>
                  <button
                    className="btn btn-sm text-white ms-2"
                    onClick={() => {
                      logout(); // Logout and clear sessionStorage
                    }} style={{
                      color:"white",
                      fontWeight:"bold",
                      cursor:"pointer",
                      textDecoration:"none",
                      justifyContent:"center",
                      alignItems:"center"
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                "Login"
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
// user.name.name[0].toUpperCase()

export default Navbar;




import React from 'react';
import { useAuth } from './auth/AuthContext.jsx';
import CRM from '../images/crm-reasons.jpg';

const Home = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        backgroundImage: `url(${CRM})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {user && (user.message === "Login successful" || user.message === "OTP verified successfully") ? (
        <h1 style={{ textAlign: "center" }}>
          WELCOME TO OUR SITE '{`${(user.name ?? "").toUpperCase()}`}'
        </h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please log in to access the site.</h1>
      )}
    </div>
  );
};

export default Home;

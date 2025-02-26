import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Home = () => {
    const { user } = useAuth();

  return (
    <>
      {user && ( user.message ===  "Admin login successful") ? (
        <h1 style={{ textAlign: "center" }}>
          WELCOME YOU ARE ADMIN OF THIS WEBSITE '{`${(user.name)}`}'
        </h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please log in to access the site.</h1>
      )}
    </>
  );
};

export default Home;

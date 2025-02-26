import React, { createContext, useContext, useState} from "react";

// Create Context
const AuthContext = createContext();

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData); // Update user state
        sessionStorage.setItem("user", JSON.stringify(userData)); 
        console.log("User logged in:", userData);
    };

    const logout = () => {
        setUser(null); // Clear user state
        sessionStorage.removeItem("user"); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const accessToken = localStorage.getItem("accessToken");

            if (storedUser && accessToken) {
                setIsLoggedIn(true);
                setUser(JSON.parse(storedUser)); // Parse user JSON string
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Error in AuthProvider:", error);
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []); // Runs only on mount
  
    const handleLogout = ()=>{
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser,handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

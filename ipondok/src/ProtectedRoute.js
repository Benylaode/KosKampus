import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        setIsAuthenticated(false);
        return;
      }

      const isAccessTokenValid = checkTokenExpiration(accessToken);
      if (isAccessTokenValid) {
        setIsAuthenticated(true); 
        return;
      }


      try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          localStorage.setItem("access_token", newAccessToken); 
          setIsAuthenticated(true); 
        } else {
          setIsAuthenticated(false); 
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        setIsAuthenticated(false); 
      }
    };

    verifyToken();
  }, []);


  const checkTokenExpiration = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const expirationTime = payload.exp * 1000; 
      return Date.now() < expirationTime; 
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return false;
    }
  };


  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch("http://localhost:5000/api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await response.json();
      if (response.ok) {
        return data.access_token; 
      } else {
        console.error("Refresh token failed:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" />; 
};

export default ProtectedRoute;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import koskampus from "../assets/KosKampus.png";
import { login } from '../api'; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const credentials = {
        username,
        password,
      };


      const responseData = await login(credentials);


      if (responseData.status_code === 200) {
        navigate("/admin"); 
      } else {
        alert(responseData.message || "Login gagal!"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan saat login!"); 
    }
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-red-100">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg flex overflow-hidden">
        {/* Bagian Kiri dengan Logo */}
        <div className="w-1/2 bg-red-200 flex items-center justify-center p-8">
          <img src={koskampus} alt="Kos Kampus" className="w-48" />
        </div>

        {/* Bagian Kanan dengan Form Login */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Login Admin</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block font-semibold text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-600 focus:outline-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white w-full px-6 py-2 rounded shadow hover:bg-red-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
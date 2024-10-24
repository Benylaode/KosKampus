import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Pastikan Anda memiliki file logo

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300 bg-white">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="max-w-full h-auto" /> {/* Ukuran logo disesuaikan */}
      </div>


      {/* Navigation */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <div id="home">
            <Link to="/" className="text-gray-800 hover:text-red-500">
              Home
            </Link>
            </div>
          </li>
          <li>
            <div id="kosku"> 
            <Link to="/kosku" className="text-red-500 hover:text-black">
            Kosku
            </Link>
            </div>
          </li>
          <li>
            <div id="dasbor">
            <Link to="/login" className="text-gray-800 hover:text-red-500">
              Dasbor Login
            </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

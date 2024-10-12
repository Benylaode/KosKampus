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
            <Link to="/" className="text-gray-800 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            {/* <Link to="/kosku" className="text-gray-800 hover:text-blue-500"> */}
            <span className="text-red-500">Kosku</span>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/login" className="text-gray-800 hover:text-blue-500"> */}
              Dasbor Login
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

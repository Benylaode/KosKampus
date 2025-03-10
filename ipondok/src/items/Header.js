import React from "react";
import { Link } from "react-router-dom";
import koskampus from "../assets/logo.png";

export default function Header() {
  return (
    <header className="flex justify-between mb-10 items-center p-4 bg-gray-100 border-b border-gray-300 bg-white">
      {/* Logo */}
      <div className="flex-shrink-0">
      <img src={koskampus} alt="Logo" className="w-24  h-auto" />  {/* Ukuran logo disesuaikan */}
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

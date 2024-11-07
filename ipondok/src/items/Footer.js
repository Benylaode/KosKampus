import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 p-4 bg-black">
      <div className="flex-shrink-0 mt-8 mb-2">
        <img src={logo} alt="Logo" className="max-w-full h-auto" /> {/* Ukuran logo disesuaikan */}
      </div>
      <hr/>
      <div className="flex justify-between items-center mt-6">

        <p className="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/about" className="text-gray-800 hover:text-red-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-800 hover:text-red-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-800 hover:text-red-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

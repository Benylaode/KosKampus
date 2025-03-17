import React from "react";
import { useNavigate } from "react-router-dom";
import koskampus from "../assets/logo.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-300 my-10 p-4 bg-black">
      <div className="flex-shrink-0 ">
        <img src={koskampus} alt="Logo" className="w-24  h-auto" /> 
      </div>
      <hr/>
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button onClick={() => navigate("/TentangKami")} className="text-gray-800 hover:text-red-500 bg-transparent border-none cursor-pointer">
                Tentang Kami
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/SyaratKetentuan")} className="text-gray-800 hover:text-red-500 bg-transparent border-none cursor-pointer">
                Syarat dan Ketentuan
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/HakKewajiban")} className="text-gray-800 hover:text-red-500 bg-transparent border-none cursor-pointer">
                Hak dan Kewajiban
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

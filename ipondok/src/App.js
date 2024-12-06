import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Home, PondokDetail, Pemesanan} from "./pages/"; // Halaman utama
import { PondokProvider } from './PondokContext';
import './App.css'; // Ganti dengan nama file CSS Anda

function App() {
  return (
    <Router>
      <PondokProvider>
        <Routes>
          {/* Route untuk halaman Home */}
          <Route path="/" element={<Home />} />
          {/* Route untuk halaman Detail Pondok */}
          <Route path="/pondok/:id" element={<PondokDetail />} />
          <Route path="/pondok/:id/pesan" element={<Pemesanan />} />
        </Routes>
      </PondokProvider>
    </Router>
  );
}

export default App;

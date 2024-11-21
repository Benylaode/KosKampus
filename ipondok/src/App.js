import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Halaman utama
import PondokDetail from "./pages/PondokDetail"; // Halaman detail pondok
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
        </Routes>
      </PondokProvider>
    </Router>
  );
}

export default App;

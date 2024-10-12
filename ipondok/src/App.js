import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'; // Ganti dengan nama file CSS Anda


function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Home, PondokDetail, Pemesanan, Admin, Login} from "./pages/"; 
import { PondokProvider } from './PondokContext';
import ProtectedRoute from "./ProtectedRoute";
import './App.css'; 

function App() {
  return (
    <Router>
      <PondokProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pondok/:id" element={<PondokDetail />} />
          <Route path="/pondok/:id/pesan" element={<Pemesanan />} />
          <Route path="/login" element={<Login />} />
          <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </PondokProvider>
    </Router>
  );
}

export default App;

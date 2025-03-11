import React from "react";
import { HashRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import {Home, PondokDetail, Pemesanan, Admin, Login, EditOrder} from "./pages/"; 
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
                      <Outlet /> 
                  </ProtectedRoute>
                }
                >
                  <Route index element={<Admin />} /> 
                  <Route path="edit-order" element={<EditOrder />} /> 
                </Route>
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      </PondokProvider>
    </Router>
  );
}

export default App;

import React from "react";
import { HashRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import {Home, PondokDetail, Pemesanan, Admin, Login, EditOrder, TentangKami, HakKewajiban, SyaratKetentuan} from "./pages/"; 
import { PondokProvider } from './PondokContext';
import ProtectedRoute from "./ProtectedRoute";
import './App.css'; 
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
    <Router>
      <PondokProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pondok/:id" element={<PondokDetail />} />
          <Route path="/pondok/:id/pesan" element={<Pemesanan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/TentangKami" element={<TentangKami />} />
          <Route path="/HakKewajiban" element={<HakKewajiban />} />
          <Route path="/SyaratKetentuan" element={<SyaratKetentuan />} />
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
    </HelmetProvider>
  );
}

export default App;

import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // opsional, tergantung struktur project kamu

const container = document.getElementById('root');
const root = createRoot(container); // Menggunakan React 18

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

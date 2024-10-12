// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}/`); // Menggunakan axios untuk mendapatkan data
    console.log("Raw Response:", response.data); // Lihat apa yang dikembalikan server
    return response.data; // Mengembalikan data yang diterima dari respons
  } catch (error) {
    console.error("Error fetching data:", error.message); // Log error jika terjadi
    throw new Error("Failed to fetch data"); // Buat pesan error yang lebih informatif
  }
};

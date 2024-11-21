import React from 'react';
import { useLocation, useParams } from "react-router-dom";

const PondokDetail = () => {
    const { id } = useParams();  // Mendapatkan id dari URL
    const location = useLocation();  // Mengakses data state dari navigate
    const { pondok } = location.state || {};  // Mengambil data pondok dari state
  
    // Menampilkan data pondok jika ada
    return (
      <div>
        <h1>Detail Pondok ID: {id}</h1>
        {pondok ? (
          <div>
            <h2>{pondok.nama}</h2>
            <p>{pondok.universitas}</p>
            <p>{pondok.harga_bulan}</p>
            {/* Tampilkan detail pondok lainnya */}
          </div>
        ) : (
          <p>Pondok tidak ditemukan.</p>
        )}
      </div>
    );
};

export default PondokDetail;

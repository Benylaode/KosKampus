import React, { useState, useContext, useEffect } from "react";
import Maps from "../items/Maps";
import Footer from "../items/Footer";
import 'leaflet/dist/leaflet.css';
import logo from "../assets/image.png";
import { PondokContext } from '../PondokContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { pondoks, error } = useContext(PondokContext);
  const [filteredPondoks, setFilteredPondoks] = useState(pondoks); // Inisialisasi sebagai array kosong
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  function formatRupiah(angkaStr) {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  useEffect(() => {
    setFilteredPondoks(pondoks); // Set data awal ke semua pondok
  }, [pondoks]);

  const handleSearch = () => {
    // Filter data pondok berdasarkan pencarian dan dropdown
    const isInPriceRange = (price) => {
      const priceNumber = parseFloat(price);
      switch (selectedPrice) {
        case "low":
          return priceNumber <= 1000000;
        case "medium":
          return priceNumber > 1000000 && priceNumber <= 2000000;
        case "high":
          return priceNumber > 2000000;
        default:
          return true;
      }
    };

    const filtered = pondoks.filter((pondok) =>
      pondok.nama.toLowerCase().includes(searchQuery) &&
      (selectedUniversity === "" || pondok.universitas === selectedUniversity) &&
      (selectedPrice === "" || isInPriceRange(pondok.harga_bulan)) &&
      (selectedType === "" || pondok.tipe === selectedType)
    );

    setFilteredPondoks(filtered); // Simpan hasil filter ke state
  };

  return (
    <>
      <div className="inset-0 bg-gray-100 -z-10">
        <div>
          <Maps pondoks={filteredPondoks} navigate={navigate} error={error} />
        </div>

        {/* Search and Filter */}
        <div className="flex justify-center my-4 space-x-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Cari Nama Kos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Universitas</option>
              <option value="Unhas">Unhas</option>
              <option value="Universitas A">Universitas A</option>
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Harga</option>
              <option value="low">Murah (≤ 1,000,000)</option>
              <option value="medium">Sedang (1,000,000 - 1,999,999)</option>
              <option value="high">Mahal (≥ 2,000,000)</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tipe Kos</option>
              <option value="Putra">Putra</option>
              <option value="Putri">Putri</option>
              <option value="Campur">Campur</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filtered Pondok List */}
        <div className="flex flex-wrap justify-center">
          {error && <p>Error: {error.message}</p>}
          {filteredPondoks.length > 0 ? (
            filteredPondoks.map((pondok) => (
              <div
                key={pondok.id}
                className="w-auto rounded-lg overflow-hidden m-1 mb-5 bg-white flex flex-col"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/pondok/${pondok.id}`, { state: { pondok } })}
              >
                <div className="flex flex-col items-start rounded border border-grey group hover:bg-red-900">
                  <div className="pl-8 pr-8 pb-3">
                    <img
                      src={logo}
                      alt={pondok.nama}
                      className="object-cover h-46 w-72 mt-4 mb-4 drop-shadow-xl"
                    />
                    <div className="text-base mt-0 mb-1 text-black font-bold drop-shadow-xl group-hover:text-white transition-colors">
                      {pondok.nama.split(" ").slice(0, 3).join(" ")}
                    </div>
                    <div className="text-base text-black drop-shadow-xl group-hover:text-white transition-colors">
                      {pondok.universitas}
                    </div>
                    <div className="text-base text-black drop-shadow-xl group-hover:text-white transition-colors">
                      {formatRupiah(pondok.harga_bulan)} per bulan
                    </div>
                    <div className="text-base text-black drop-shadow-xl group-hover:text-white transition-colors">
                      Tersedia {pondok.jumlah_kamar} kamar
                    </div>
                    <div className="text-base text-black drop-shadow-xl group-hover:text-white transition-colors">
                      {pondok.tipe}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada pondok yang cocok dengan pencarian Anda.</p>
          )}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

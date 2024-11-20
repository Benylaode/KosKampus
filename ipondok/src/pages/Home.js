import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import Header from "../items/Header";
import Footer from "../items/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import logo from "../assets/image.png";
import icon from "../assets/logo.png"; 

export default function Home() {
  const [pondoks, setPondoks] = useState([]);
  const [filteredPondoks, setFilteredPondoks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [error, setError] = useState(null);

  function formatRupiah(angkaStr) {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  const customMarkerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [40, 40], // Ukuran ikon
    iconAnchor: [20, 40], // Titik jangkar (biasanya bagian bawah ikon)
    popupAnchor: [0, -40], // Titik jangkar popup relatif terhadap ikon
  });

  useEffect(() => {
    const getPondoks = async () => {
      try {
        if (process.env.REACT_APP_DEBUG === 'true') {
          console.log('Fetching pondok data from API...');
        }

        const responseData = await fetchData('pondok');
        
        if (process.env.REACT_APP_DEBUG === 'true') {
          console.log('Data fetched successfully:', responseData);
        }

        setPondoks(responseData.data);
        setFilteredPondoks(responseData.data); // Set initial filtered data
      } catch (error) {
        setError(error);
        
        if (process.env.REACT_APP_DEBUG === 'true') {
          console.error('Error fetching pondok data:', error);
        }
      }
    };

    getPondoks();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter data based on search and dropdown selections
  useEffect(() => {
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
    let filtered = pondoks.filter(pondok =>
      pondok.nama.toLowerCase().includes(searchQuery) &&
      (selectedUniversity === "" || pondok.universitas === selectedUniversity) &&
      (selectedPrice === "" || isInPriceRange(pondok.harga_bulan)) &&
      (selectedType === "" || pondok.tipe === selectedType)
    );

    setFilteredPondoks(filtered);
  }, [searchQuery, selectedUniversity, selectedPrice, selectedType, pondoks]);


  return (
    <>
      <div className="inset-0 bg-gray-100 -z-10">
        <div>
          <Header />
        </div>
        
      {/* Peta Interaktif */}
      <div className="w-full rounded-lg overflow-hidden m-4 p-2 bg-grey-900 border border-grey-900 shadow-lg">
          <div className="relative h-[500px]">
            <MapContainer
              center={[-5.147665, 119.432731]} 
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {filteredPondoks.map((pondok) => (
                <Marker
                  key={pondok.id}
                  position={[parseFloat(pondok.latitude), parseFloat(pondok.longitude)]}
                  icon={customMarkerIcon}
                >
                  <Popup>
                    <b>{pondok.nama}</b><br />
                    {pondok.universitas}<br />
                    {formatRupiah(pondok.harga_bulan)} / bulan
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-center my-4 space-x-4">
          <input
            type="text"
            placeholder="Cari Nama Kos"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />

          {/* Universitas Dropdown */}
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Universitas</option>
            <option value="Unhas">Unhas</option>
            <option value="Universitas A">Universitas A</option>
            {/* Tambahkan universitas lainnya di sini */}
          </select>

          {/* Harga Dropdown */}
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

          {/* Tipe Kos Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Tipe Kos</option>
            <option value="Putra">Putra</option>
            <option value="Putri">Putri</option>
            <option value="Campur">Campur</option>
            {/* Tambahkan tipe kos lainnya jika ada */}
          </select>
        </div>

        <div className="flex flex-wrap justify-center">
          {error && <p>Error: {error.message}</p>}
          {filteredPondoks.map((pondok) => (
            <div
              key={pondok.id}
              className="w-auto rounded-lg overflow-hidden m-1 mb-5 bg-white flex flex-col"
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
          ))}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

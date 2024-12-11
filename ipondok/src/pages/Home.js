import React, { useState, useContext, useEffect, useCallback, useMemo} from "react";
import { listUniversitas,listHarga } from '../api';
import Maps from "../items/Maps";
import Footer from "../items/Footer";
import 'leaflet/dist/leaflet.css';
import logo from "../assets/image.png";
import { PondokContext } from '../PondokContext';
import { useNavigate } from 'react-router-dom';
import hrg from "../assets/src/harga.png"; 
import tipe from "../assets/src/tipe.png"; 
import univ from "../assets/src/universitas.png"; 
import src_white from "../assets/src/src_putih.png"; 


// Debounce utility function

export default function Home() {
  const { 
    pondoks, 
    isSearching,
    searchResults, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    searchPondok
  } = useContext(PondokContext);

  const [filteredPondoks, setFilteredPondoks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [paginationVisible, setPaginationVisible] = useState(true);
  const [universities, setUniversities] = useState([]);
  const [harga, setHarga] = useState([]);

  const fetchUniversities = async () => {
    try {
      const data = await listUniversitas();
      setUniversities(data); // Data langsung berupa array string
    } catch (error) {
      console.error('Error fetching universities:', error.message);
    }
  };

  const fetchHarga = async () => {
    try {
      const data = await listHarga();
      setHarga(data); // Data langsung berupa array string
    } catch (error) {
      console.error('Error fetching universities:', error.message);
    }
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
        params.append('nama', searchQuery); // Tambahkan parameter 'nama'
    }

    if (selectedType) {
        params.append('tipe', selectedType); // Tambahkan parameter 'tipe'
    }

    if (selectedUniversity) {
        params.append('universitas', selectedUniversity); // Tambahkan parameter 'universitas'
    }

    if (selectedPrice) {
        if (selectedPrice > 5000000) {
            params.append('harga_tahun', selectedPrice); // Jika harga lebih dari 5 juta, tambahkan ke 'harga_tahun'
        } else {
            params.append('harga_bulan', selectedPrice); // Jika tidak, tambahkan ke 'harga_bulan'
        }
    }

    return params.toString(); // Konversi URLSearchParams ke string query
}, [searchQuery, selectedType, selectedUniversity, selectedPrice]); 


  const navigate = useNavigate();

  // Format for Rupiah currency
  const formatRupiah = (angkaStr) => {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

const isInPriceRange = useCallback((price) => {
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
}, [selectedPrice]);

  // Update filteredPondoks based on search query, filrefreshLoginters, and currentPage
  useEffect(() => {
    fetchHarga()
    fetchUniversities()
    if (!isSearching || queryString === "") {
      setFilteredPondoks(pondoks); // Show all pondoks when not searching
      setPaginationVisible(true); // Show pagination
    } else {
      // When searching, apply filters and show search results
      setFilteredPondoks(searchResults);
      setPaginationVisible(false); 
      console.log("jalan")
      
       // Hide pagination for search results
    }
  }, [pondoks, searchResults, queryString, selectedUniversity, selectedPrice, selectedType, isSearching, isInPriceRange]);

  // Trigger search in context when debounced query changes

  // Handle the search button click
  const handleSearchClick = () => {
    searchPondok(queryString); 
    // Trigger search
  };

  // Handle the back button click
  const handleBackClick = () => { // Set search inactive
    setSearchQuery(""); // Clear the search query
    setSelectedUniversity(""); // Clear the selected filters
    setSelectedPrice("");
    setSelectedType("");
    setFilteredPondoks(pondoks); // Reset to all pondoks
    setPaginationVisible(true);  // Clear search query
  };

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="inset-0 bg-gray-100 -z-10">
      <div className="w-full h-1/4 mx-auto">
          <Maps pondoks={filteredPondoks} navigate={navigate} error={error} />
        </div>

        {/* Search and Filter */}
        <div className="w-full max-w-8xl mx-auto justify-center pb-4">
        <div className=" flex flex-wrap justify-center pt-2 items-center rounded-lg overflow-hidden bg-white shadow-lg ">
          <div className="flex items-center w-full pl-1 sm:w-auto  sm:mb-0 justify-center">

            <input
              type="text"
              placeholder="Cari Pondok"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              className="w-full h-full sm:w-64 px-4 py-2 text-center bg-white"
            />
          </div>
          <div className="flex items-center w-full mx-2 sm:w-auto sm:mb-0 justify-center">
            <img
              src={univ}
              alt="Logo"
              className="hidden sm:block max-w-full h-auto"
            />
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="hidden sm:block w-full h-full sm:w-64 px-4 py-2 text-center bg-white"
            >
              <option value="">Universitas</option>
              {universities.map((university, index) => (
                <option key={index} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center w-full  mx-2   sm:w-auto sm:mb-0 justify-center">
          <img src={hrg} alt="Logo" className="hidden sm:block max-w-full h-auto" /> {/* Ukuran logo disesuaikan */}
          <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="hidden sm:block w-full h-full sm:w-64 px-4 py-2 text-center bg-white"
            >
              <option value="">Harga</option>
              {harga.map((harga, index) => (
                <option key={index} value={harga}>
                  {harga}
                </option>
              ))}
            </select>

          </div>
          <div className="flex items-center w-full  mx-2   sm:w-auto  sm:mb-0 justify-center">
          <img src={tipe} alt="Logo" className="hidden sm:block  max-w-full h-auto" /> {/* Ukuran logo disesuaikan */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="hidden sm:block  w-full h-full sm:w-64 px-4 py-2 text-center bg-white"
            >
              <option value="">Tipe Kos</option>
              <option value="Putra">Putra</option>
              <option value="Putri">Putri</option>
              <option value="Campur">Campur</option>
            </select>
          </div>
          <div className="flex items-center p-5 w-full  pl-4 sm:w-auto space-x-2 mb-4 sm:mb-0 justify-center">
          <button
            onClick={handleSearchClick}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 flex justify-center items-center shadow-md"
          >
            <img src={src_white} alt="Logo" className="max-w-full h-auto" /> {/* Ukuran logo disesuaikan */}
          </button>
            <button
              onClick={handleBackClick}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white  shadow-md"
            >
              Back
            </button>
          </div>
        </div>
      </div>




        {/* Filtered Pondok List */}
        <div className="flex flex-wrap justify-center">
          {error && <p>Error: {error.message}</p>}
          {loading && <p>Loading...</p>}
          {filteredPondoks.length > 0 ? (
            filteredPondoks.map((pondok) => (
              <div
                key={pondok.id}
                className="w-auto rounded-lg overflow-hidden m-1 mb-5 bg-white flex flex-col"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/pondok/${pondok.id}`, { state: { pondok } })}
              >
                <div className="flex flex-col items-start rounded h-full border border-grey group hover:bg-red-900">
                  <div className="pl-8 pr-8 pb-3">
                  <img
                    src={pondok.gambar && pondok.gambar.length > 0 ? pondok.gambar[0].image : logo}
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

        {/* Pagination Section */}
        {paginationVisible && (
          <div className="flex justify-center space-x-4 my-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600"
            >
              Next
            </button>
          </div>
        )}

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

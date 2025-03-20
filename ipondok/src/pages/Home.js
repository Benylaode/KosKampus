import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { listUniversitas, listHarga } from '../api';
import Maps from "../items/Maps";
import Footer from "../items/Footer";
import 'leaflet/dist/leaflet.css';
import logo from "../assets/image.png";
import notFound from "../assets/notFound.png";
import koskampus from "../assets/KosKampus.png";
import { PondokContext } from '../PondokContext';
import { useNavigate } from 'react-router-dom';
import hrg from "../assets/src/harga.png"; 
import tipe from "../assets/src/tipe.png"; 
import univ from "../assets/src/universitas.png"; 
import src_white from "../assets/src/src_putih.png"; 
import SEO from "../SEO";

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [paginationVisible, setPaginationVisible] = useState(true);
  const [universities, setUniversities] = useState([]);
  const [harga, setHarga] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);

  const fetchUniversities = async () => {
    try {
      const data = await listUniversitas();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching universities:', error.message);
    }
  };

  const fetchHarga = async () => {
    try {
      const data = await listHarga();
      setHarga(data);
    } catch (error) {
      console.error('Error fetching universities:', error.message);
    }
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.append('nama', searchQuery);
    }

    if (selectedType) {
      params.append('tipe', selectedType);
    }

    if (selectedUniversity) {
      params.append('universitas', selectedUniversity);
    }

    if (selectedPrice) {
      if (selectedPrice > 5000000) {
        params.append('harga_tahun', selectedPrice);
      } else {
        params.append('harga_bulan', selectedPrice);
      }
    }

    return params.toString();
  }, [searchQuery, selectedType, selectedUniversity, selectedPrice]);

  const navigate = useNavigate();

  const formatRupiah = (angkaStr) => {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    if (angka === 0) return "Tidak Melayani Pesanan";
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

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const isComplete = entries.every((entry) => entry.startTime > 0);

      if (isComplete) {
        setIsLoading(false);
        observer.disconnect();
      }
    });

    observer.observe({ entryTypes: ["resource", "paint"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchHarga();
    fetchUniversities();
    if (!isSearching || queryString === "") {
      setFilteredPondoks(pondoks);
      setPaginationVisible(true);
    } else {
      setFilteredPondoks(searchResults);
      setPaginationVisible(false);
    }
  }, [pondoks, searchResults, queryString, selectedUniversity, selectedPrice, selectedType, isSearching, isInPriceRange]);

  const handleSearchClick = () => {
    searchPondok(queryString);
  };

  const handleBackClick = () => {
    setSearchQuery("");
    setSelectedUniversity("");
    setSelectedPrice("");
    setSelectedType("");
    setFilteredPondoks(pondoks);
    setPaginationVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  if (isLoading) {
    return (
      <>
      <SEO 
        title="Beranda | KosKampus" 
        description="Selamat datang di aplikasi kami. Kami adalah KosKampus adalah platform terbaik untuk mencari 
        kos di Makassar atau pondok di Makassar yang ramah mahasiswa. 
        Temukan rekomendasi tempat tinggal dekat kampus dengan lokasi 
        strategis dan lingkungan yang nyaman. Peta ini menampilkan lokasi kos 
        dan pondok terbaik untuk mendukung aktivitas akademik Anda." 
      />
      <div className="flex flex-col justify-center items-center h-screen bg-grey-100">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
          <span className="text-red-500">Kos</span>Kampus
        </h1>
        <div className="loading-spinner mb-4"></div>
        <p className="text-gray-700 font-semibold text-lg sm:text-sm md:text-md lg:text-xl text-center px-4 mt-2">
          Selamat datang di KosKampus
        </p>
      </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Beranda | KosKampus" 
        description="Selamat datang di aplikasi kami. Kami adalah KosKampus adalah platform terbaik untuk mencari 
        kos di Makassar atau pondok di Makassar yang ramah mahasiswa. 
        Temukan rekomendasi tempat tinggal dekat kampus dengan lokasi 
        strategis dan lingkungan yang nyaman. Peta ini menampilkan lokasi kos 
        dan pondok terbaik untuk mendukung aktivitas akademik Anda." 
      />
      <div className="inset-0 bg-white -z-10">
        <div className="relative w-full h-1/4 mx-auto">
          <head>
          <meta name="robots" content="index, follow"/>
          <meta name="viewport" content="width=device-width, initial-scale=0.6"/>
          <meta property="og:url" content="https://koskampus.com"/>
          <meta property="og:description" content="KosKampus membantu mahasiswa menemukan kos dan pondok terbaik di Makassar. KosKampus adalah platform terbaik untuk mencari
                  kos di Makassar atau pondok di Makassar  yang ramah mahasiswa.
                  Temukan rekomendasi tempat tinggal dekat kampus dengan lokasi strategis dan lingkungan yang nyaman.
                  Peta ini menampilkan lokasi kos dan pondok
                   terbaik untuk mendukung aktivitas akademik Anda"/>
          </head>
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
              showOverlay ? 'backdrop-blur-sm bg-gray-800 bg-opacity-50 z-10' : ''
            }`}
          >
            {showOverlay && (
              <div className="flex flex-col items-center justify-center h-full bg-grey p-6 rounded-xl shadow-lg">
                <img 
                  src={koskampus} 
                  alt="App Logo" 
                  className="w-auto h-auto mb-4 drop-shadow-lg"
                />
                
                <h3 className="text-white text-center text-md md:text-base lg:text-md lg:mx-24 px-6  leading-relaxed">
                  <span className="font-semibold text-red-400">KosKampus</span> adalah platform terbaik untuk mencari
                  <span className="font-bold"> kos di Makassar</span> atau <span className="font-bold">pondok di Makassar</span> yang ramah mahasiswa.
                  Temukan rekomendasi tempat tinggal dekat kampus dengan lokasi strategis dan lingkungan yang nyaman.
                  Peta ini menampilkan lokasi kos dan pondok
                   terbaik untuk mendukung aktivitas akademik Anda.
                </h3>
                
                <button
                  className="mt-4 bg-red-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
                  onClick={toggleOverlay}
                >
                  Lihat Peta
                </button>
                
                <p className="text-white text-xs md:text-xs lg:text-xs text-center mt-4">
                  Peta hanya menampilkan lokasi <span className="underline">pondok</span> yang tersedia di bawah.
                </p>
                <p className="text-white text-xs md:text-xs lg:text-xs text-center">
                  Tekan pojok kanan atas peta untuk menutup.
                </p>
              </div>
            )
            }

          </div>


          <div className={`w-full h-full ${showOverlay ? 'blur-sm' : 'blur-none'}`}>
            <Maps pondoks={filteredPondoks} navigate={navigate} error={error} />
            <button
              className="absolute fixed top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              onClick={toggleOverlay}
            >
              {showOverlay ? 'Lihat Peta' : 'Tutup Peta'}
            </button>
          </div>
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
              {harga.sort((a, b) => a - b).map((harga, index) => (
                <option key={index} value={harga}>
                  {formatRupiah(harga)}
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
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white font-bold shadow-md"
            >
              Back
            </button>
          </div>
        </div>
      </div>
        {/* Filtered Pondok List */}
        <div className="flex flex-wrap justify-center">
          {loading ? (<div className="loading-spinner mb-4"></div>) : (
            filteredPondoks.length > 0 ? (
              filteredPondoks.map((pondok) => (
                <div
                  key={pondok.id}
                  className="w-auto rounded-lg overflow-hidden m-1 mb-5 bg-grey-200 drop-shadow-2xl flex flex-col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/pondok/${pondok.id}`, { state: { pondok } })}
                >
                  <div className="flex flex-col items-start rounded h-full border-2 drop-shadow-2xl border-red-900 group hover:bg-red-900">
                    <div className="pl-8 pr-8 bg-grey-100 pb-3">
                    <img
                      src={pondok.gambar && pondok.gambar.length > 0 ? pondok.gambar[0].image : logo}
                      alt={pondok.nama}
                      className="w-72 aspect-square object-contain mt-4 mb-4 drop-shadow-xl bg-white"
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
              <img src={notFound} alt="App Logo" className="mb-4 w-auto h-auto" />
            )
          )}
          
        </div>

        {/* Pagination Section */}
        {paginationVisible && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 my-6">
          {/* Tombol Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`
              bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 
              ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'}
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            `}
          >
            Previous
          </button>

        
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
            <span className="text-gray-700 font-medium">
             <span className="text-red-500">{currentPage}</span> of {totalPages}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`
              bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 
              ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'}
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            `}
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

import React, { useEffect, useState } from "react";
import Maps from "../items/Maps";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; 
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import airLogo from "../assets/air.jpg";
import bersihLogo from "../assets/kebersihan.jpg";
import internetLogo from "../assets/internet.jpg";
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import SEO from "../SEO";

Modal.setAppElement("#root");

const PondokDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { pondok } = location.state || {};
  const pondoks = pondok ? [pondok] : [];
  const error = pondok ? null : "Pondok tidak ditemukan.";
  const ratings = [
    { id: 1, title: "Air", value: pondok.rating_air },
    { id: 2, title: "Kebersihan", value: pondok.rating_kebersihan },
    { id: 3, title: "Jaringan", value: pondok.rating_jaringan },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formatRupiah = (angkaStr) => {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    if (angka === 0) return "Tidak Melayani Pesanan";
    return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const processString = (data) => {
    const cleanedData = data.replace(/\s+dan\s+/g, ",");
    return cleanedData.split(",").map((item) => item.trim());
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const gambarCadangan = [
    logo
  ];
  const gambarYangDigunakan = pondok?.gambar?.length > 0 ? pondok.gambar : gambarCadangan;

  return (
    <>
        <SEO 
          title="Pondok Detail | Nama Aplikasi" 
          description="Selamat datang di detail pondoks" 
        />   
         <div className="font-sans lg:pl-10 pl-5 lg:pr-24 pr-5">
    <div className="flex flex-row gap-5 fixed pt-5 pb-5 w-full bg-white z-20 pr-8 lg:pr-32">
         <div className="flex w-full lg:w-2/3 gap-5">
             <button 
                 className="hidden md:block bg-red-500 text-white drop-shadow-md rounded-lg px-8 py-4 font-bold text-center cursor-pointer hover:bg-red-300"
                 onClick={() => window.history.back()}
             >
                 Back
             </button>

             <button className="bg-red-500 text-white rounded-lg w-full px-8 py-4 drop-shadow-md text-center cursor-pointer">
                 <span className="font-bold text-lg">{pondok?.nama || "Pondok Detail"}</span>
             </button>
         </div>

         <div className="hidden w-1/3 px-8 py-4"></div>
     </div>

     <div className="hidden lg:flex flex-1 w-1/3 top-5 flex-col gap-5 grid grid-rows-1 pr-32 fixed right-0 top-0 bg-white z-20">
         <button 
             className="bg-red-500 text-white rounded-lg px-8 py-4 drop-shadow-md text-center cursor-pointer"
         >
             <span className="font-bold ">{formatRupiah(pondok.harga_bulan)} per bulan</span>
         </button>
        
         {[
             { id: "Gambar", label: "Gambar" },
             { id: "Fasilitas", label: "Fasilitas" },
             { id: "Alamat", label: "Alamat" },
             { id: "Rating", label: "Rating" },
             { id: "Aturan", label: "Aturan" },
             { id: "Catatan", label: "Catatan" },
         ].map((item, index) => (
             <button 
                 key={index} 
                 className="bg-white border-2 border-gray-700 rounded-lg px-8 py-4 text-center drop-shadow-md cursor-pointer hover:bg-red-300"
                 onClick={() => scrollToSection(item.id)}
             >
                 <span className="font-bold ">{item.label}</span>
             </button>
         ))}

          <div className="flex flex-row gap-2 justify-between">
              <button
                className="bg-red-500 text-white w-[48%] rounded-lg px-4 py-4 text-center drop-shadow-md cursor-pointer hover:bg-red-700 transition-colors"
                onClick={() => navigate(`/pondok/${pondok.id}/pesan`, { state: { pondok } })}
              >
                <span className="font-bold">Pesan Sekarang</span>
              </button>
              <button
                className="bg-red-500 text-white w-[48%] rounded-lg px-4 py-4 text-center drop-shadow-md cursor-pointer hover:bg-red-700 transition-colors"
                onClick={() =>
                  window.open(
                    `https://wa.me/6288246212357?text=Saya%20ingin%20melakukan%20pemesanan%20review%20pondok`,
                    "_blank"
                  )
                }
              >
                <span className="font-bold">Hubungi Admin</span>
              </button>
            </div>


     </div>

      {/* Main Content */}
      <div className="flex items-start gap-5 pb-5 pt-5 w-full sticky top-0 bg-white z-10">
        <div className="flex-2 flex w-full lg:w-2/3 flex-col gap-5 relative top-20">
          {/* Gambar Utama */}
          <div className="flex flex-col gap-5" id="Gambar">
            <div className="w-full drop-shadow-md">
              <Swiper
                modules={[Navigation, Pagination]} // Tambahkan modul Navigation dan Pagination
                spaceBetween={10}
                slidesPerView={1}
                navigation // Aktifkan navigasi (tombol next/previous)
                pagination={{ clickable: true }} // Aktifkan pagination (indikator slide)
                loop={true} // Aktifkan loop
                className="h-[400px] w-full"
                style={{
                    "--swiper-navigation-color": "red", // Warna tombol navigasi
                    "--swiper-pagination-color": "red", // Warna pagination
                    "--swiper-pagination-bullet-inactive-opacity": "0.5", // Opacity bullet tidak aktif
                  }}
              >
                {/* Tampilkan gambar pertama sebagai slide pertama */}
                {gambarYangDigunakan.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={pondok?.gambar && pondok.gambar.length > 0 ? item.image : logo }
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer aspect-square"
                        onClick={() => openModal(item.image)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Alamat */}
          <h2 className="text-xl font-semibold mt-4" id="Alamat">
            Alamat:
          </h2>
          <p>{pondok?.alamat || "Alamat tidak tersedia"}</p>

          {/* Maps */}
          <div className="mt-0 mb-10">
            <Maps pondoks={pondoks} navigate={navigate} error={error} />
          </div>

          {/* Fasilitas */}
          <h2 className="text-xl font-semibold mt-4" id="Fasilitas">
            Fasilitas:
          </h2>
          <div className="grid grid-cols-3 gap-2 w-full ">
            {processString(pondok.fasilitas).map((item, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-700 rounded-lg px-8 py-4 text-center cursor-pointer hover:bg-red-300"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Rating */}
          <h2 className="text-xl font-semibold mt-4" id="Rating">
            Rating:
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 gap-2 w-full mb-10">
            {ratings.map((item) => {
            let gambar;
            switch (item.title) {
              case 'Jaringan':
                gambar = internetLogo; 
                break;
              case 'Air':
                gambar = airLogo;
                break;
              case 'Kebersihan':
                gambar = bersihLogo; 
                break;
              default:
                gambar = logo; // Default image atau biarkan kosong
                break;
            }

        return (

              <div
                key={item.id}
                className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                  <img src={gambar} alt={item.title} className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-lg font-bold text-gray-800">{item.value}</p>
                </div>
              </div>
            );
          })}
          </div>

          {/* Aturan */}
          <div className="mb-10 mt-4" id="Aturan">
            <h2 className="text-xl font-semibold mt-5">Aturan:</h2>
            <p>{pondok?.aturan || "Aturan tidak tersedia"}</p>
          </div>
          <div className="lg:hidden mb-10 mt-4 flex flex-row gap-2 justify-between">
              <button
                className="bg-red-500 text-white w-[48%] rounded-lg px-4 py-4 text-center cursor-pointer hover:bg-red-300"
                onClick={() => navigate(`/pondok/${pondok.id}/pesan`, { state: { pondok } })}
              >
                <span className="font-bold">Pesan Sekarang</span>
              </button>
              <button
                className="bg-red-500 text-white w-[48%] rounded-lg px-4 py-4 text-center cursor-pointer hover:bg-red-300"
                onClick={() =>
                  window.open(
                    `https://wa.me/6288246212357?text=Saya%20ingin%20melakukan%20pemesanan%20review%20pondok`,
                    "_blank"
                  )
                }
              >
                <span className="font-bold">Hubungi Admin</span>
              </button>
            </div>

        </div>
      </div>

      {/* Modal Preview */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90 z-50"
      >
        <div className="relative max-w-4xl w-full p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white text-black p-2 rounded-full z-60 hover:bg-gray-200"
          >
            ✖
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </Modal>
    </div>
    </>

  );
};

export default PondokDetail;
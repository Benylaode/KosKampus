import React, {useEffect}from 'react';
import Maps from "../items/Maps";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import logo from "../assets/image.png";

const PondokDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();  
    const { pondok } = location.state || {};  
    const pondoks = pondok ? [pondok] : []; // Jika `pondok` ada, jadikan array; jika tidak, array kosong.
    const error = pondok ? null : "Pondok tidak ditemukan."; 
    const ratings = [
        { id: 1, title: "Air", value: pondok.rating_air },
        { id: 2, title: "Kebersihan", value: pondok.rating_kebersihan },
        { id: 2, title: "Jaringan", value: pondok.rating_jaringan},
    ];

    function formatRupiah(angkaStr) {
        const angka = parseFloat(angkaStr);
        if (isNaN(angka)) return "";
        return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    }
    const processString = (data) => {
        const cleanedData = data.replace(/\s+dan\s+/g, ',');
        return cleanedData.split(',').map(item => item.trim());
    };
    useEffect(() => {
        // Mengecek apakah ada hash di URL
        if (location.hash) {
          const element = document.querySelector(location.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
      }, [location])

    return (
        <div className="font-sans pl-10 pr-24">
            <div className="flex flex-row gap-5 fixed pt-5 pb-5 w-full bg-white z-20 pr-32">
                {/* Tombol Kiri */}
                <div className="flex w-2/3 gap-5">
                    <button 
                        className="bg-red-500 text-white rounded-lg px-8 py-4 text-center cursor-pointer hover:bg-red-300"
                        onClick={() => window.history.back()}
                    >
                        back
                    </button>
                    <button className="bg-red-500 text-white rounded-lg w-full px-8 py-4 text-center cursor-pointer hover:bg-red-300">
                        {pondok?.nama || "Pondok Detail"}
                    </button>
                </div>

                {/* Div Kanan */}
                <div className="hidden w-1/3 px-8 py-4">
                </div>
            </div>

        
            <div className="flex-1 w-1/3 top-5 flex flex-col gap-5 grid grid-rows-1 pr-32 fixed right-0 top-0 bg-white z-20">
                    {/* Tombol Harga per Bulan */}
                    <button 
                        className="bg-red-500 text-white rounded-lg px-8 py-4 text-center cursor-pointer hover:bg-red-300"
                    >
                        {formatRupiah(pondok.harga_bulan)} per bulan
                    </button>
                    
                    {/* Tombol Navigasi */}
                    {["Gambar", "Fasilitas", "Alamat", "Rating", "Aturan", "Catatan"].map((item, index) => (
                        <button 
                            key={index} 
                            className="bg-white border-2 border-gray-700 rounded-lg px-8 py-4 text-center cursor-pointer hover:bg-red-300"
                        >
                            {item}
                        </button>
                    ))}

                    {/* Tombol Pesan Sekarang */}
                    <button className="bg-red-500 text-white rounded-lg px-8 py-4 text-center cursor-pointer hover:bg-red-300"
                            onClick={() => navigate(`/pondok/${pondok.id}/pesan`, { state: { pondok } })}>
                        Pesan Sekarang
                    </button>
            </div>
            <div className="flex items-start gap-5 pb-5 pt-5 w-full sticky top-0 bg-white z-10">
                <div className="flex-2 flex w-2/3 flex-col gap-5 relative  top-20">
                    
                    {/* Gambar utama */}
                    <div className="flex flex-row gap-5 " id='Gambar'>
                    {/* Gambar utama */}
                    <img 
                        src={image}
                        alt="Main"
                        className="w-2/3 h-[calc(100vh-120px)] object-cover rounded"
                    />

                    {/* Grid gambar kecil */}
                    <div className="grid grid-cols-1 h-[calc(100vh-120px)] gap-2 w-1/3">
                        {[1, 2, 3].map((_, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover rounded cursor-pointer"
                            />
                        ))}
                    </div>
                    </div>

                     {/* Fasilitas */}
                    <h2 className="text-xl font-semibold mt-4">Fasilitas:</h2>
                    <div className="grid grid-cols-3 gap-2 w-full ">
                    {processString(pondok.fasilitas).map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border-2 border-gray-700 rounded-lg px-8 py-4 text-center cursor-pointer hover:bg-red-300"
                        >
                        {item}
                        </div>))
                    }
                     </div>
                    {/* Maps */}
                    <div className="mt-0 mb-10" id='Alamat'>
                        <Maps pondoks={pondoks} navigate={navigate} error={error} />
                    </div>
                    {/* Alamat */}
                    <h2 className="text-xl font-semibold mt-4">Alamat:</h2>
                    <p>{pondok?.alamat || "Alamat tidak tersedia"}</p>
                    {/* Rating */}
                    <h2 className="text-xl font-semibold mt-4">Rating:</h2>
                    <div className="grid grid-cols-3 grid-rows-1 gap-2 w-full mb-10">
                    {ratings.map((item) => (
                    <div class="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm">
                    <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                        <img src={logo} alt="Sinyal" class="w-6 h-6 text-red-500"/>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-500">{item.title}</p>
                        <p class="text-lg font-bold text-gray-800">{item.value}</p>
                    </div>
                    </div>))
                    }
                    </div>
                    {/* Aturan */}
                    <div className='mb-10 mt-4'>
                    <h2 className="text-xl font-semibold mt-5">Aturan:</h2>
                    <p>{pondok?.aturan || "Aturan tidak tersedia"}</p>
                    </div>

                </div>

                {/* Kolom Kanan - Harga Perbulan dan Tombol Navigasi */}
 
            </div>
        </div>
    );
};

export default PondokDetail;
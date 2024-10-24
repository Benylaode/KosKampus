import React, { useEffect, useState } from "react";
import { fetchData } from "../api"; 
import Header from "../items/Header";
import Footer from "../items/Footer";
import logo from "../assets/image.png"; 

export default function Home() {
  const [pondoks, setPondoks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPondoks = async () => {
      try {
        if (process.env.REACT_APP_DEBUG === 'true') {
          console.log('Fetching pondok data from API...');
        }

        const responseData = await fetchData('pondok'); // Memanggil endpoint pondoks
        
        if (process.env.REACT_APP_DEBUG === 'true') {
          console.log('Data fetched successfully:', responseData);
        }

        setPondoks(responseData);
      } catch (error) {
        setError(error);
        
        if (process.env.REACT_APP_DEBUG === 'true') {
          console.error('Error fetching pondok data:', error);
        }
      }
    };

    getPondoks();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div class="w-full rounded-lg overflow-hidden m-4 p-2 bg-red-300 border border-red-300 shadow-lg">
      <div class="relative h-[500px]">
      <iframe 
          src="https://www.google.com/maps/d/u/0/embed?mid=1ISw5NyWHUbmtkvkhY62bk9nsllOJ5cA&ehbc=2E312F" 
          allowfullscreen 
          title="MAPS KOSUNHAS"
          class="absolute top-0 left-0 w-full h-full rounded-lg">
      </iframe>
      </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {error && <p>Error: {error.message}</p>}
        {pondoks.map((pondok) => (
          <div
            key={pondok.id}
            className="w-auto rounded-lg overflow-hidden m-1 bg-white flex hover:bg-red-100"
            
          >
            {/* Bagian gambar dan tombol di sisi kiri */}
            <div className="flex flex-col items-start p-1"> 
            <img 
                src={logo} 
                alt={pondok.nama} 
                className="object-cover h-46 w-56 mt-4 mb-4 drop-shadow-xl" // Mengatur ukuran gambar
              />
            <p className="text-gray-700 text-base  mt-0 mb-5">
                <span className="bg-white hover:bg-red-200 hover:border-red-200 text-black font-bold py-2 px-4 rounded border border-grey drop-shadow-xl">
                  {pondok.nama.split(" ").slice(0, 3).join(" ")}
                </span>
              </p>
              
              
            </div>

            {/* Bagian konten di sisi kanan */}
            <div className="w-auto pr-6 pl-2 py-1 text-right">
              <p className="text-gray-700 text-base mt-5 mb-5">
                <span className="bg-white hover:bg-red-200 hover:border-red-200 text-black font-bold py-2 px-4 rounded w-36 inline-block text-center border border-grey drop-shadow-xl">{pondok.harga} 100</span>
              </p>
              <p className="text-gray-700 text-base mt-5 mb-5">
                <span className="bg-white hover:bg-red-200 hover:border-red-200  text-black font-bold py-2 px-4 rounded w-36 inline-block text-center border border-grey drop-shadow-xl">{pondok.fasilitas} 100</span>
              </p>
              <p className="text-gray-700 text-base mt-5 mb-5">
                <span className="bg-white hover:bg-red-200 hover:border-red-200  text-black font-bold py-2 px-4 rounded w-36 inline-block text-center border border-grey drop-shadow-xl">{pondok.aturan} 100</span>
              </p>
              <p className="text-gray-700 text-base mt-5 mb-5">
                <a
                  href={pondok.link_alamat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-red-200 hover:border-red-200  text-black font-bold py-2 px-4 rounded w-36 inline-block text-center border border-grey drop-shadow-xl"
                >
                Map
              </a>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}

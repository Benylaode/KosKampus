import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/pointer.png";

export default function Maps({ pondoks, navigate, error }) {
  const [mapCenter, setMapCenter] = useState({ lat: -5.147665, lng: 119.432732 }); 

  useEffect(() => {
    if (Object.keys(pondoks).length > 0) {
      const firstPondok = Object.values(pondoks)[0];
  
      const latitude = parseFloat(firstPondok.latitude);
      const longitude = parseFloat(firstPondok.longitude);
  
      if (!latitude || !longitude) {
        setMapCenter({
          lat: -5.147665, 
          lng: 119.432732, 
        });
      } else {
        setMapCenter({
          lat: latitude,
          lng: longitude,
        });
      }
  
    }
  }, [pondoks]); 

  
  
  const customMarkerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });


  function formatRupiah(angkaStr) {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }


  return (
    <div className="w-full  rounded-lg overflow-hidden m-0 p-0 bg-grey-900 border border-grey-900 shadow-lg">
    <div className="relative" style={{ height: 'min(calc(70vh + 10vw), 85svh)' }}>
      <MapContainer
        key={`${mapCenter.lat}-${mapCenter.lng}`}
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={14} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {error && <p>Error: {error.message}</p>}
        {pondoks.map((pondok) => (
        (parseFloat(pondok.latitude) && parseFloat(pondok.longitude)) ? (
          <Marker
            key={pondok.id}
            position={[parseFloat(pondok.latitude), parseFloat(pondok.longitude)]}
            icon={customMarkerIcon}
          >
            <Popup interactive={true}>
              <b>{pondok.nama}</b>
              <br />
              {pondok.universitas}
              <br />
              {formatRupiah(pondok.harga_bulan)} / bulan
              <br />
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                style={{ marginTop: "5px", cursor: "pointer" }}
                onClick={() => {
                  navigate(`/pondok/${pondok.id}#Alamat`, { state: { pondok } });
                }} 
              >
                Set Lokasis
              </button>
            </Popup>
          </Marker>
        ) : null
      ))}

      </MapContainer>
    </div>
  </div>
  );
}

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/pointer.png";

// Daftar fakultas dengan posisi dan warna
const fakultasData = [
  { nama: "Fakultas Ekonomi dan Bisnis", lat: -5.1318, lng: 119.4869, color: "#f94144", singkatan: "FEB" },
  { nama: "Fakultas Hukum", lat: -5.1307, lng: 119.4857, color: "#f3722c", singkatan: "FH" },
  { nama: "Fakultas Kedokteran", lat: -5.1303, lng: 119.4873, color: "#f9c74f", singkatan: "FK" },
  { nama: "Fakultas Teknik", lat: -5.1718, lng: 119.4686, color: "#90be6d", singkatan: "FT" },
  { nama: "Fakultas Ilmu Sosial dan Ilmu Politik", lat: -5.1328, lng: 119.4863, color: "#43aa8b", singkatan: "FISIP" },
  { nama: "Fakultas Ilmu Budaya", lat: -5.1325, lng: 119.4847, color: "#577590", singkatan: "FIB" },
  { nama: "Fakultas Pertanian", lat: -5.138, lng: 119.487, color: "#277da1", singkatan: "FAPERTA" },
  { nama: "Fakultas MIPA", lat: -5.1305, lng: 119.488, color: "#7b2cbf", singkatan: "FMIPA" },
  { nama: "Fakultas Peternakan", lat: -5.1298, lng: 119.4888, color: "#9d4edd", singkatan: "FAPET" },
  { nama: "Fakultas Kedokteran Gigi", lat: -5.1299, lng: 119.4885, color: "#c77dff", singkatan: "FKG" },
  { nama: "Fakultas Kesehatan Masyarakat", lat: -5.1301, lng: 119.4878, color: "#70e000", singkatan: "FKM" },
  { nama: "Fakultas Ilmu Kelautan dan Perikanan", lat: -5.1322, lng: 119.4884, color: "#00bbf9", singkatan: "FIKP" },
  { nama: "Fakultas Kehutanan", lat: -5.1313, lng: 119.4853, color: "#3a0ca3", singkatan: "FAHUTAN" },
  { nama: "Fakultas Farmasi", lat: -5.1309, lng: 119.4859, color: "#ef476f", singkatan: "FF" },
  { nama: "Fakultas Keperawatan", lat: -5.1315, lng: 119.4849, color: "#06d6a0", singkatan: "FKep" },
  { nama: "Sekolah Pascasarjana", lat: -5.1304, lng: 119.4865, color: "#ffd166", singkatan: "SPs" },
  { nama: "Fakultas Vokasi", lat: -5.128, lng: 119.4864, color: "#118ab2", singkatan: "FV" },
];

export default function Maps({ pondoks, navigate, error }) {
  const [mapCenter, setMapCenter] = useState({ lat: -5.147665, lng: 119.432732 });
  const [selectedFakultasIndex, setSelectedFakultasIndex] = useState(null);

  useEffect(() => {
    if (Object.keys(pondoks).length > 0) {
      const firstPondok = Object.values(pondoks)[0];
      const latitude = parseFloat(firstPondok.latitude);
      const longitude = parseFloat(firstPondok.longitude);

      if (!latitude || !longitude) {
        setMapCenter({ lat: -5.147665, lng: 119.432732 });
      } else {
        setMapCenter({ lat: latitude, lng: longitude });
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
    <div className="w-full rounded-lg overflow-hidden m-0 p-0 bg-grey-900 border border-grey-900 shadow-lg">
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

          {/* Marker Pondok */}
          {pondoks.map((pondok) =>
            parseFloat(pondok.latitude) && parseFloat(pondok.longitude) ? (
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
                    onClick={() => {
                      navigate(`/pondok/${pondok.id}#Alamat`, { state: { pondok } });
                    }}
                  >
                    Set Lokasi
                  </button>
                </Popup>
              </Marker>
            ) : null
          )}

          {/* Marker Fakultas */}
          {fakultasData.map((fakultas, index) => (
            <React.Fragment key={index}>
              <Marker
                position={[fakultas.lat, fakultas.lng]}
                icon={L.divIcon({
                  className: "custom-div-icon",
                  html: `<div style="
                    background-color: ${fakultas.color};
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    border: 2px solid white;
                    box-shadow: 0 0 5px rgba(0,0,0,0.5);
                  "></div>`,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10],
                })}
                eventHandlers={{
                  click: () => setSelectedFakultasIndex(index),
                }}
              />

              {selectedFakultasIndex === index && (
                <>
                  <Circle
                    center={[fakultas.lat, fakultas.lng]}
                    radius={700}
                    pathOptions={{
                      color: fakultas.color,
                      fillColor: fakultas.color,
                      fillOpacity: 0.2,
                    }}
                  />
                  <Popup position={[fakultas.lat, fakultas.lng]}>
                    <strong>{fakultas.nama}</strong>
                    <br />
                    Radius: 700 meter
                  </Popup>
                </>
              )}
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-md max-h-[50vh] overflow-y-auto text-sm z-[1000]">
          <b className="block mb-2">Legenda Fakultas</b>
          <ul className="space-y-1">
            {fakultasData.map((fakultas, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: fakultas.color }}
                  className="inline-block w-4 h-4 rounded-full border"
                ></span>
                <span>{fakultas.singkatan}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

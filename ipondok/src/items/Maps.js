import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/pointer.png";

const fakultasData = [
  { nama: "Fakultas Ekonomi dan Bisnis", lat: -5.130666696710492, lng: 119.49033963231578, color: "#f94144", singkatan: "FEB" },
  { nama: "Fakultas Hukum", lat: -5.131159216820301, lng: 119.4920644859905, color: "#f3722c", singkatan: "FH" },
  { nama: "Fakultas Kedokteran", lat: -5.129216201943465, lng: 119.48719420462345, color: "#f9c74f", singkatan: "FK" },
  { nama: "Fakultas Teknik", lat: -5.221856916369651, lng: 119.50206709566473, color: "#90be6d", singkatan: "FT" },
  { nama: "Fakultas Ilmu Sosial dan Ilmu Politik", lat: -5.1313250794695, lng: 119.48996392536012, color: "#43aa8b", singkatan: "FISIP" },
  { nama: "Fakultas Ilmu Budaya", lat: -5.132535730213637, lng: 119.49078817234165, color: "#577590", singkatan: "FIB" },
  { nama: "Fakultas Pertanian", lat: -5.13111820071469, lng: 119.48449444965269, color: "#277da1", singkatan: "FAPERTA" },
  { nama: "Fakultas MIPA", lat: -5.132060830128631, lng: 119.48606654344722, color: "#7b2cbf", singkatan: "FMIPA" },
  { nama: "Fakultas Peternakan", lat: -5.12953578620904, lng: 119.48583544102924, color: "#9d4edd", singkatan: "FAPET" },
  { nama: "Fakultas Kedokteran Gigi", lat: -5.128999377842959, lng: 119.486700897088, color: "#c77dff", singkatan: "FKG" },
  { nama: "Fakultas Kesehatan Masyarakat", lat: -5.128324872782947, lng: 119.48647958583213, color: "#70e000", singkatan: "FKM" },
  { nama: "Fakultas Ilmu Kelautan dan Perikanan", lat: -5.129237271993119, lng: 119.48397264107034, color: "#00bbf9", singkatan: "FIKP" },
  { nama: "Fakultas Kehutanan", lat: -5.1303641598788, lng: 119.4838142884484, color: "#3a0ca3", singkatan: "FAHUTAN" },
  { nama: "Fakultas Farmasi", lat: -5.1317209445972125, lng: 119.48529808336531, color: "#ef476f", singkatan: "FF" },
  { nama: "Fakultas Keperawatan", lat: -5.133035921986141, lng: 119.48612391349445, color: "#06d6a0", singkatan: "FKep" },
  { nama: "Sekolah Pascasarjana", lat: -5.128352886927829, lng: 119.48554785689132, color: "#ffd166", singkatan: "SPs" },
  { nama: "Fakultas Vokasi", lat: -5.1356706423571845, lng: 119.48814959140431, color: "#118ab2", singkatan: "FV" }
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
          eventHandlers={{
            click: () => setSelectedFakultasIndex(null)
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

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
                  click: (e) => {
                    e.originalEvent.stopPropagation();
                    setSelectedFakultasIndex(index);
                  },
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
                  <Popup 
                    position={[fakultas.lat, fakultas.lng]}
                    eventHandlers={{
                      click: (e) => e.originalEvent.stopPropagation()
                    }}
                  >
                    <strong>{fakultas.nama}</strong>
                    <br />
                    Radius: 700 meter
                  </Popup>
                </>
              )}
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Transparent Overlay with No Interference */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-lg px-4 py-2 text-sm shadow-md pointer-events-none z-[999]">
          Tutup Peta
        </div>
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

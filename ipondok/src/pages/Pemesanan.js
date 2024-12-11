import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OrderPondok } from '../api';  // Pastikan import OrderPondok
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css";  // Import style react-datepicker

const InvoiceForm = () => {
  const location = useLocation();
  const { pondok } = location.state || {};

  const [invoiceData, setInvoiceData] = useState({
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(), // Menggunakan objek Date untuk dueDate
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    buyerEmail: "",
    pondok_id: pondok ? pondok.id : "",
    notes: "",
    tangga: new Date().toISOString(),
    isBulanan: true,
    totalBiaya: 0,
    biayaAdmin: 0,
  });

  useEffect(() => {
    if (pondok) {
      // Mengambil harga_bulan dan harga_tahun dari pondok
      const harga = invoiceData.isBulanan ? pondok.harga_bulan : pondok.harga_tahun;

      // Menghitung total biaya dan biaya admin
      const totalBiaya = parseFloat(harga);
      const biayaAdmin = totalBiaya * 0.1; // 10% dari total biaya

      setInvoiceData((prevData) => ({
        ...prevData,
        totalBiaya,
        biayaAdmin,
      }));
    }
  }, [pondok, invoiceData.isBulanan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value === "bulanan" });
  };

  const handleDateChange = (date) => {
    setInvoiceData({ ...invoiceData, dueDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      pondok_id: invoiceData.pondok_id,
      email_buyer: invoiceData.buyerEmail,
      order_date: invoiceData.invoiceDate,
      nama_buyer: invoiceData.buyerName,
      status: "pending",
      isBulanan: invoiceData.isBulanan,
      tanggal_mulai: invoiceData.dueDate.toISOString().split("T")[0], // Mengonversi date ke string
      tangga: invoiceData.tangga,
      biaya_admin: invoiceData.biayaAdmin,
      total_biaya: invoiceData.totalBiaya,
    };

    try {
      // Panggil API untuk membuat order
      const result = await OrderPondok(dataToSend);  // Kirim data ke API
      console.log(result);
      alert("Order successfully created!");
    } catch (error) {
      console.error("Error during order creation:", error);
      alert("An error occurred, please try again.");
    }
  };

  return (
    <div className="font-sans p-8 bg-red-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Form Pemesanan</h2>
        <form onSubmit={handleSubmit}>
          {/* Informasi Invoice */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold text-gray-700">Due Date</label>
              <DatePicker
                selected={invoiceData.dueDate}
                onChange={handleDateChange}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
                dateFormat="dd-MM-yyyy"  // Format tampilan tanggal
                minDate={new Date()}  // Membatasi tanggal untuk tidak memilih tanggal di masa lalu
              />
            </div>
          </div>

          {/* Informasi Pembeli */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Buyer Email</label>
            <input
              type="text"
              name="buyerEmail"
              value={invoiceData.buyerEmail}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Nama Pembeli</label>
            <input
              type="text"
              name="buyerName"
              value={invoiceData.buyerName}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>


          {/* Pilihan Bulanan atau Tahunan */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Pilih Durasi</label>
            <select
              name="isBulanan"
              value={invoiceData.isBulanan ? "bulanan" : "tahunan"}
              onChange={handleSelectChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            >
              <option value="bulanan">Bulanan</option>
              <option value="tahunan">Tahunan</option>
            </select>
          </div>

          {/* Catatan */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={invoiceData.notes}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Menampilkan total biaya dan biaya admin */}
          <div className="mb-4 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
              <p>Nama Pondok</p>
              <p>{pondok.nama}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Total Biaya</p>
              <p>{invoiceData.totalBiaya.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Biaya Admin</p>
              <p>{invoiceData.biayaAdmin.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <p>Total Pembayaran</p>
              <p>{(invoiceData.totalBiaya + invoiceData.biayaAdmin).toFixed(2)}</p>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700"
          >
            Submit
          </button>
        </form>
        <button
          onClick={() => window.history.back()}
          className="bg-red-600 text-white px-6 py-2 mt-5 rounded shadow hover:bg-red-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;

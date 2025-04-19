import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OrderPondok } from '../api';  
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";  
import SEO from "../SEO";

const InvoiceForm = () => {
  const location = useLocation();
  const { pondok } = location.state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(), 
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    buyerEmail: "",
    pondok_id: pondok ? pondok.id : "",
    notes: "",
    tangga: new Date().toISOString(),
    isBulanan: true,
    nomor: "",
    totalBiaya: 0,
    biayaAdmin: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pondok) {
      const harga = invoiceData.isBulanan ? pondok.harga_bulan : pondok.harga_tahun;

      const totalBiaya = parseFloat(harga);
      const biayaAdmin = 50000; 

      setInvoiceData((prevData) => ({
        ...prevData,
        totalBiaya,
        biayaAdmin,
      }));
    }
  }, [pondok, invoiceData.isBulanan]);

  const formatRupiah = (angkaStr) => {
    const angka = parseFloat(angkaStr);
    if (isNaN(angka)) return "";
    if (angka === 0) return "Tidak Melayani Pesanan";
    return `Rp${angka.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

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
    setIsSubmitting(true); 

    if (
      !invoiceData.buyerEmail ||
      !invoiceData.buyerName ||
      !invoiceData.nomor ||
      !invoiceData.dueDate
    ) {
      showPopupMessage("Harap isi semua field yang wajib diisi!", true);
      setIsSubmitting(false);
      return; 
    }
  
    const dataToSend = {
      pondok_id: invoiceData.pondok_id,
      email_buyer: invoiceData.buyerEmail,
      order_date: invoiceData.invoiceDate,
      nama_buyer: invoiceData.buyerName,
      status: "pending",
      isBulanan: invoiceData.isBulanan,
      tanggal_mulai: invoiceData.dueDate.toISOString().split("T")[0], 
      tangga: invoiceData.tangga,
      nomor_buyer : invoiceData.nomor,
      biaya_admin: invoiceData.biayaAdmin,
      total_biaya: invoiceData.totalBiaya + invoiceData.biayaAdmin,
    };
  
    try {
      const result = await OrderPondok(dataToSend);
      showPopupMessage(result.message + ", Check Your Email", false);
    } catch (error) {
      console.error("Error during order creation:", error);
      showPopupMessage("An error occurred, please try again.", true);
    } finally {
      setIsSubmitting(false); 
    }
  };
  const showPopupMessage = (message, error) => {
    setPopupMessage(message);
    setIsError(error);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
};

  if (isLoading) {
    return (
      <>
        <SEO 
          title="Pemesanan| KosKampus" 
          description="Cobalah Mememesan Kos Murah di Makassar" 
        />   
      <div className="flex justify-center items-center h-screen bg-red-100">
        <div className="loading-spinner"></div>
      </div>
      </>
    );
  }

  return (
    <>
        <SEO 
          title="Pemesanan| KosKampus" 
          description="Cobalah Mememesan Kos Murah di Makassar" 
        /> 
    <div className="font-sans p-8 bg-red-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Form Pemesanan</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold text-gray-700">Tanggal Masuk</label>
              <DatePicker
                selected={invoiceData.dueDate}
                onChange={handleDateChange}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
                dateFormat="dd-MM-yyyy"  
                minDate={new Date()}  
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Email Pembeli</label>
            <input
              type="text"
              name="buyerEmail"
              value={invoiceData.buyerEmail}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Nomor WhatsApp</label>
            <input
              type="text"
              name="nomor"
              value={invoiceData.nomor}
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

          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={invoiceData.notes}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="mb-4 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
              <p>Nama Pondok</p>
              <p>{pondok.nama}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Total Biaya</p>
              <p>{formatRupiah(invoiceData.totalBiaya.toFixed(2))}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Biaya Admin</p>
              <p>{formatRupiah(invoiceData.biayaAdmin.toFixed(2))}</p>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <p>Total Pembayaran</p>
              <p>{formatRupiah((invoiceData.totalBiaya + invoiceData.biayaAdmin).toFixed(2))}</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 flex items-center justify-center"
            disabled={isSubmitting} 
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 font-bold border-white"></div>
                <span className="ml-2">Mememsan...</span>
              </div>
            ) : (
              "Pesan"
            )}
          </button>
        </form>
        {showPopup && (
                <div className={`popup ${isError ? "error" : "success"}`}>
                    {popupMessage}
                </div>
            )}
        <button
          onClick={() => window.history.back()}
          className="bg-red-600 text-white px-6 py-2 mt-5 font-bold rounded shadow hover:bg-red-700"
        >
          Back
        </button>
      </div>
    </div>
    </>
  );
};

export default InvoiceForm;
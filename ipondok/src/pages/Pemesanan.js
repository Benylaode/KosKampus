import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const InvoiceForm = () => {
    const location = useLocation();  
    const { pondok } = location.state || {};  
    // const error = pondok ? null : "Pondok tidak ditemukan."; 

    const [invoiceData, setInvoiceData] = useState({
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    buyerEmail:"",
    Pondok: 
        [{
          id: pondok.id,
          nama: pondok.nama,
          universitas: pondok.universitas,
        }],
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handlePondokChange = (index, field, value) => {
    const updatedPondoks = [...invoiceData.Pondok];
    updatedPondoks[index][field] = value;
    setInvoiceData({ ...invoiceData, Pondok: updatedPondoks });
  };

  const addPondok = () => {
    setInvoiceData({
      ...invoiceData,
      Pondok: [...invoiceData.Pondoks, { description: "", quantity: 0, price: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoiceData); // Simpan atau kirim data invoice ke backend
  };

  return (
    <div className="font-sans p-8 bg-red-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Form Pemesanan
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Informasi Invoice */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold text-gray-700">Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleInputChange}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Informasi Penjual dan Pembeli */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Beller Email</label>
            <input
              type="text"
              name="buyerEmail"
              value={invoiceData.buyerEmail}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={invoiceData.buyerName}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Buyer Address</label>
            <textarea
              name="buyerAddress"
              value={invoiceData.buyerAddress}
              onChange={handleInputChange}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-red-400"
            />
          </div>
          {/* Daftar Barang */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Pondok</h3>
            {invoiceData.Pondok.map((pondok, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                <input 
                  type="number"
                  placeholder="id"
                  value={pondok.id}
                  onChange={(e) =>
                    handlePondokChange(index, "id", parseInt(e.target.value))
                  }
                  className="border p-2 hidden rounded focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="text"
                  placeholder="nama"
                  value={pondok.nama}
                  onChange={(e) =>
                    handlePondokChange(index, "nama", e.target.value)
                  }
                  className="border p-2 rounded focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="text"
                  placeholder="universitas"
                  value={pondok.universitas}
                  onChange={(e) =>
                    handlePondokChange(index, "universitas", e.target.value)
                  }
                  className="border p-2 rounded focus:ring-2 focus:ring-red-400"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addPondok}
              className="bg-red-600 text-white px-4 py-2 rounded mt-2"
            >
              Add Pondok
            </button>
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

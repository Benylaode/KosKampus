import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../items/Header';
import Footer from '../items/Footer';
import { UpdateOrderPondok, DeleteOrderPondok } from '../api';

const EditOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pondok } = location.state || {};
    const [orders, setOrders] = useState(pondok?.orders || []);
    const [tempStatus, setTempStatus] = useState({}); 

    const status_mapping = {
        pending: "Menunggu Konfirmasi",
        shipped: "Disetujui",
        cancelled: "Ditolak",
        delivered: "Lunas",
    };

    const handleStatusChange = (orderId, newStatus, emailBuyer, namaBuyer, pondok_id) => {
        setTempStatus((prev) => ({
            ...prev,
            [orderId]: {
                status: newStatus,
                email_buyer: emailBuyer,
                nama_buyer: namaBuyer,
                pondok_id : pondok_id,
            },
        }));
    };
    

    const handleSaveChanges = async () => {
        try {
            for (const [orderId, data] of Object.entries(tempStatus)) {
                const { status, email_buyer, nama_buyer, pondok_id } = data;
                await UpdateOrderPondok(orderId, { status, email_buyer, nama_buyer, pondok_id});
            }
    
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    tempStatus[order.id] ? { ...order, status: tempStatus[order.id].status } : order
                )
            );
    
            setTempStatus({});
            alert('Perubahan berhasil disimpan!');
        } catch (error) {
            console.error("Gagal menyimpan perubahan:", error);
            alert('Terjadi kesalahan saat menyimpan perubahan.');
        }
    };
    

    const handleDeleteOrder = async (orderId) => {
        try {
            await DeleteOrderPondok(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error("Gagal menghapus order:", error);
        }
    };

    if (!pondok) {
        return <div>Data tidak ditemukan.</div>;
    }

    return (
        <div className="font-sans min-h-screen bg-white-100">
            <Header />
            <div className="p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Daftar Order untuk {pondok.nama}</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Kembali
                </button>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-red-200 text-red-800">
                            <th className="border p-2">ID Order</th>
                            <th className="border p-2">Nama Pemesan</th>
                            <th className="border p-2">Tanggal Order</th>
                            <th className="border p-2">Tanggal Mulai</th>
                            <th className="border p-2">WhatsApp buyer</th>
                            <th className="border p-2">Biaya</th>
                            <th className="border p-2">Bulanan</th>
                            <th className="border p-2">Tahun</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="border">
                                    <td className="border p-2">{order.id}</td>
                                    <td className="border p-2">{order.nama_buyer}</td>
                                    <td className="border p-2">{order.order_date}</td>
                                    <td className="border p-2">{order.tanggal_mulai}</td>
                                    <td className="border p-2">{order.nomor_buyer}</td>
                                    <td className="border p-2">{order.total_biaya}</td>
                                    <td className="border p-2">
                                        {order.isBulanan ? (
                                            <span className="text-green-600">✔</span>
                                        ) : (
                                            <span className="text-red-600">✖</span>
                                        )}
                                    </td>
                                    <td className="border p-2">
                                        {!order.isBulanan ? (
                                            <span className="text-green-600">✔</span>
                                        ) : (
                                            <span className="text-red-600">✖</span>
                                        )}
                                    </td>
                                    <td className="border p-2">
                                        {order.status === 'delivered' ? (
                                            <span className="font-bold text-green-600">
                                                {status_mapping[order.status]}
                                            </span>
                                        ) : (
                                            <select
                                                value={tempStatus[order.id]?.status || order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value, order.email_buyer, order.nama_buyer, order.pondok)}
                                                className="border px-2 py-1 rounded"
                                            >
                                                <option value="pending">{status_mapping.pending}</option>
                                                <option value="shipped">{status_mapping.shipped}</option>
                                                <option value="cancelled">{status_mapping.cancelled}</option>
                                            </select>
                                        )}
                                    </td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="border p-2 text-center">
                                    Tidak ada order.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    onClick={handleSaveChanges}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    disabled={Object.keys(tempStatus).length === 0} // Nonaktifkan tombol jika tidak ada perubahan
                >
                    Simpan Perubahan
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default EditOrder;
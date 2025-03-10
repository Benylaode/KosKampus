import React, { useState, useContext, useEffect } from 'react';
import Header from "../items/Header";
import Footer from "../items/Footer";
import 'leaflet/dist/leaflet.css';
import { PondokContext } from '../PondokContext';
import EditPondokModal from './EditPondok';
import { deletePondok } from '../api';

const Admin = () => {
    const {
        pondoks,
        isSearching,
        searchResults,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
        searchPondok
      } = useContext(PondokContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPondok, setSelectedPondok] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(null);
    const [paginationVisible, setPaginationVisible] = useState(true);
    const [filteredPondoks, setFilteredPondoks] = useState([]);

    // Fungsi untuk menghapus pondok
    const handleDeletePondok = async (id) => {
        setLoadingDelete(id);
        try {
            await deletePondok(id);
            window.location.reload();
        } catch (error) {
            console.error("Gagal menghapus pondok:", error);
        } finally {
            setLoadingDelete(null);
        }
    };

    useEffect(() => {
        if (!isSearching || searchQuery === "") {
          setFilteredPondoks(pondoks);
          setPaginationVisible(true);
        } else {
          setFilteredPondoks(searchResults);
          setPaginationVisible(false);
        }
      }, [pondoks, searchResults, isSearching, searchQuery]);
  

    const handleSearchClick = () => {
        searchPondok("nama="+searchQuery);
        setPaginationVisible(false);
    };

    // Fungsi untuk kembali ke tampilan semua data
    const handleBackClick = () => {
        setSearchQuery("");
        setFilteredPondoks(pondoks);
        setPaginationVisible(true);
    };

    // Fungsi untuk mengubah halaman
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Efek untuk mengupdate filteredPondoks berdasarkan searchResults atau pondoks


    return (
        <div className="font-sans min-h-screen bg-white-100">
            <Header />
            <div className="p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
                {/* Search Bar */}
                <div className="mb-4 flex">
                    <input
                        type="text"
                        placeholder="Cari..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border px-4 py-2 w-full rounded focus:ring-2 focus:ring-red-400"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleBackClick}
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setSelectedPondok({})}
                        className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Tambah
                    </button>
                </div>

                {/* Loading dan Error */}
                {loading && <p className="text-red-600">Loading...</p>}
                {error && <p className="text-red-600">Error loading data.</p>}

                {/* Tabel Pondok */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-red-200 text-red-800">
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Universitas</th>
                            <th className="border p-2">Harga</th>
                            <th className="border p-2">Tipe</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPondoks
                            .slice((currentPage - 1) * 10, currentPage * 10) // Paginasi data
                            .map((pondok) => (
                                <tr key={pondok.id} className="border">
                                    <td className="border p-2">{pondok.nama}</td>
                                    <td className="border p-2">{pondok.universitas}</td>
                                    <td className="border p-2">{pondok.harga_bulan}</td>
                                    <td className="border p-2">{pondok.tipe}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => setSelectedPondok(pondok)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePondok(pondok.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                            disabled={loadingDelete === pondok.id}
                                        >
                                            {loadingDelete === pondok.id ? "Loading..." : "Hapus"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Pagination Section */}
                {paginationVisible && (
                    <div className="flex justify-center space-x-4 my-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />

            {/* Modal Edit Pondok */}
            {selectedPondok && (
                <EditPondokModal
                    pondok={selectedPondok}
                    onClose={() => setSelectedPondok(null)}
                />
            )}
        </div>
    );
};

export default Admin;
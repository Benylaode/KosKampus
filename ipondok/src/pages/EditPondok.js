import React, { useState } from 'react';
import { addPondok, updatePondok, uploadPondokImage, deletePondokImage } from '../api';

const EditPondokModal = ({ pondok, onClose }) => {
    // State untuk menyimpan data form
    const [formData, setFormData] = useState({
        id: pondok?.id || '',
        nama: pondok?.nama || '',
        universitas: pondok?.universitas || '',
        harga_tahun: pondok?.harga_tahun || '',
        harga_bulan: pondok?.harga_bulan || '',
        tipe: pondok?.tipe || '',
        fasilitas: pondok?.fasilitas || '',
        rating_jaringan: pondok?.rating_jaringan || '',
        rating_kebersihan: pondok?.rating_kebersihan || '',
        rating_air: pondok?.rating_air || '',
        jumlah_kamar: pondok?.jumlah_kamar || '',
        gambar: pondok?.gambar || [], // Array gambar dari API
        alamat: pondok?.alamat || '',
        link_alamat: pondok?.link_alamat || '',
        latitude: pondok?.latitude || '',
        longitude: pondok?.longitude || '',
        aturan: pondok?.aturan || '',
    });

    // State untuk menyimpan file gambar yang dipilih
    const [selectedImages, setSelectedImages] = useState([]);

    // State untuk menyimpan ID gambar yang dihapus
    const [deletedImages, setDeletedImages] = useState([]);

    // State untuk menangani loading saat menyimpan
    const [loading, setLoading] = useState(false);

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Fungsi untuk menangani perubahan file gambar
    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setSelectedImages(prev => [...prev, ...files]);
        }
    };

    // Fungsi untuk menghapus gambar yang sudah ada
    const handleDeleteImage = (imageId) => {
        setFormData(prevState => ({
            ...prevState,
            gambar: prevState.gambar.filter(img => img.id !== imageId)
        }));

        setDeletedImages(prev => [...prev, imageId]); // Tandai gambar untuk dihapus di API
    };

    // Fungsi untuk menghapus gambar baru yang dipilih
    const handleRemoveSelectedImage = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    // Fungsi untuk menyimpan data pondok
    const handleSave = async () => {
        setLoading(true);
        try {
            let savedPondok;

            if (formData.id) {
                savedPondok = await updatePondok(formData.id, formData);
            } else {
                savedPondok = await addPondok(formData);
            }

            for (const imageId of deletedImages) {
                await deletePondokImage(imageId);
            }

            if (selectedImages.length > 0) {
                for (const file of selectedImages) {
                    await uploadPondokImage(savedPondok.data.id, file);
                }
            }


            // Tutup modal
            onClose();

            // Reload halaman setelah berhasil menyimpan
            window.location.reload();
        } catch (error) {
            console.error('Gagal menyimpan pondok:', error);
            alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {formData.id ? 'Edit Pondok' : 'Tambah Pondok'}
                </h2>
                <div className="space-y-3">
                    {/* Input Nama */}
                    <label className="block">
                        Nama:
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Universitas */}
                    <label className="block">
                        Universitas:
                        <input
                            type="text"
                            name="universitas"
                            value={formData.universitas}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Harga Tahun */}
                    <label className="block">
                        Harga Tahun:
                        <input
                            type="text"
                            name="harga_tahun"
                            value={formData.harga_tahun}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Harga Bulan */}
                    <label className="block">
                        Harga Bulan:
                        <input
                            type="text"
                            name="harga_bulan"
                            value={formData.harga_bulan}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Tipe */}
                    <label className="block">
                        Tipe:
                        <input
                            type="text"
                            name="tipe"
                            value={formData.tipe}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Fasilitas */}
                    <label className="block">
                        Fasilitas:
                        <textarea
                            name="fasilitas"
                            value={formData.fasilitas}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Rating Jaringan */}
                    <label className="block">
                        Rating Jaringan:
                        <input
                            type="text"
                            name="rating_jaringan"
                            value={formData.rating_jaringan}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Rating Kebersihan */}
                    <label className="block">
                        Rating Kebersihan:
                        <input
                            type="text"
                            name="rating_kebersihan"
                            value={formData.rating_kebersihan}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Rating Air */}
                    <label className="block">
                        Rating Air:
                        <input
                            type="text"
                            name="rating_air"
                            value={formData.rating_air}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Jumlah Kamar */}
                    <label className="block">
                        Jumlah Kamar:
                        <input
                            type="number"
                            name="jumlah_kamar"
                            value={formData.jumlah_kamar}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Alamat */}
                    <label className="block">
                        Alamat:
                        <input
                            type="text"
                            name="alamat"
                            value={formData.alamat}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Link Alamat */}
                    <label className="block">
                        Link Alamat (Google Maps):
                        <input
                            type="text"
                            name="link_alamat"
                            value={formData.link_alamat}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Latitude */}
                    <label className="block">
                        Latitude:
                        <input
                            type="text"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Longitude */}
                    <label className="block">
                        Longitude:
                        <input
                            type="text"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Aturan */}
                    <label className="block">
                        Aturan:
                        <textarea
                            name="aturan"
                            value={formData.aturan}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Input Gambar */}
                    <label className="block">
                        Gambar:
                        <input
                            type="file"
                            onChange={handleImageChange}
                            multiple // Izinkan upload banyak gambar
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-red-400"
                        />
                    </label>

                    {/* Preview Gambar */}
                    {(formData.gambar.length > 0 || selectedImages.length > 0) && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Gambar Pondok</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {/* Tampilkan gambar yang sudah ada */}
                                {formData.gambar.map((img) => (
                                    <div key={img.id} className="relative">
                                        <img
                                            src={img.image}
                                            alt={`Gambar ${img.id}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(img.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}

                                {/* Tampilkan gambar baru yang dipilih */}
                                {selectedImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Gambar Baru ${index}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            onClick={() => handleRemoveSelectedImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Tombol Simpan dan Batal */}
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                        ) : "Simpan"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded shadow"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPondokModal;
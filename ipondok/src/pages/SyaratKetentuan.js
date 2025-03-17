import React from 'react';
import Header from "../items/Header";
import Footer from "../items/Footer";

const SyaratKetentuan = () => {
    return (
        <div className="font-sans min-h-screen bg-gray-100">
            <Header />
            <div className="p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Syarat dan Ketentuan</h1>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">A. Pendahuluan</h2>
                    <p className="text-gray-700 mt-2">
                        1. KosKampus adalah platform informasi kos berbasis website yang bertujuan untuk memudahkan mahasiswa dalam mencari, membandingkan, dan menyewa kos.
                        <br />
                        2. Dengan menggunakan platform KosKampus, pengguna dan mitra dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan ini.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">B. Penggunaan Layanan</h2>
                    <p className="text-gray-700 mt-2">
                        1. Pengguna wajib memberikan data yang benar dan bertanggung jawab atas segala informasi yang mereka masukkan ke dalam platform.
                        <br />
                        2. KosKampus hanya sebagai perantara informasi dan pembayaran dari pemilik kos, tidak bertanggung jawab atas kesalahan atau ketidaksesuaian informasi yang diberikan oleh mitra.
                        <br />
                        3. KosKampus berhak menghapus pengguna atau mitra yang melanggar ketentuan layanan.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">C. Pembayaran dan Refund</h2>
                    <p className="text-gray-700 mt-2">
                        1. Pengguna yang melakukan penyewaan melalui KosKampus wajib membayar sesuai tarif yang berlaku.
                        <br />
                        2. Jika terjadi kesalahan transaksi atau informasi tidak sesuai, pengguna dapat mengajukan refund paling lambat 1 x 12 jam dari pembayaran awal.
                        <br />
                        3. KosKampus berhak menolak pengajuan refund jika terbukti tidak sesuai dengan ketentuan yang berlaku.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">D. Perlindungan Data Pribadi</h2>
                    <p className="text-gray-700 mt-2">
                        1. KosKampus berkomitmen untuk melindungi data pribadi pengguna dan mitra sesuai dengan peraturan yang berlaku.
                        <br />
                        2. Informasi pengguna tidak akan disebarluaskan tanpa persetujuan kecuali dalam kondisi hukum yang mengharuskan.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">E. Kebijakan Konten</h2>
                    <p className="text-gray-700 mt-2">
                        1. Mitra wajib memastikan bahwa foto dan informasi yang diunggah ke platform adalah benar dan asli serta tidak melanggar hak cipta.
                        <br />
                        2. KosKampus berhak menghapus atau menyunting konten yang dianggap tidak sesuai dengan kebijakan KosKampus.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">F. Batasan Tanggung Jawab</h2>
                    <p className="text-gray-700 mt-2">
                        1. KosKampus hanya menyediakan layanan informasi dan tidak bertanggung jawab atas perselisihan antara penyewa dan pemilik kos.
                        <br />
                        2. KosKampus tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan informasi dari mitra atau pengguna.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">G. Penyelesaian Sengketa</h2>
                    <p className="text-gray-700 mt-2">
                        1. Jika terjadi perselisihan antara pengguna dan mitra, diutamakan penyelesaian secara musyawarah.
                        <br />
                        2. Jika tidak ditemukan solusi, KosKampus dapat menjadi mediator tetapi tidak memiliki kewajiban hukum untuk menyelesaikan sengketa.
                        <br />
                        3. Sengketa yang tidak dapat diselesaikan melalui musyawarah dapat diajukan ke jalur hukum sesuai dengan peraturan yang berlaku di Indonesia.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">H. Perubahan Syarat dan Ketentuan</h2>
                    <p className="text-gray-700 mt-2">
                        1. KosKampus berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
                        <br />
                        2. Pengguna dan mitra disarankan untuk secara berkala meninjau ketentuan ini guna mengetahui perubahan yang mungkin terjadi.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default SyaratKetentuan;
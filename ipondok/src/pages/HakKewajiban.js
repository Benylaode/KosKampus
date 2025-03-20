import React from 'react';
import Header from "../items/Header";
import Footer from "../items/Footer";
import SEO from "../SEO";

const HakKewajiban = () => {
    return (
        <>
    <SEO 
        title="Hak dan Kewajiban | Nama Aplikasi" 
        description="Mengakses informasi kos yang tersedia di platform KosKampus secara gratis.
        Melakukan pencarian kos berdasarkan fitur yang tersedia.
        Mendapatkan informasi yang akurat dan terkini dari pemilik kos.
        Menghubungi narahubung KosKampus untuk informasi lebih lanjut.
        Melaporkan ketidaksesuaian informasi atau kendala dalam transaksi melalui layanan pengaduan KosKampus.
        Mengajukan komplain atau refund sesuai ketentuan yang berlaku jika layanan yang diberikan tidak sesuai dengan yang ditampilkan." 
      />
        <div className="font-sans min-h-screen bg-gray-100">
            <Header />
            <div className="p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Hak dan Kewajiban</h1>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">A. Hak dan Kewajiban Pengguna (Penyewa Kos)</h2>
                    <h3 className="text-xl font-semibold text-gray-700 mt-3">Hak Pengguna:</h3>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Mengakses informasi kos yang tersedia di platform KosKampus secara gratis.</li>
                        <li>Melakukan pencarian kos berdasarkan fitur yang tersedia.</li>
                        <li>Mendapatkan informasi yang akurat dan terkini dari pemilik kos.</li>
                        <li>Menghubungi narahubung KosKampus untuk informasi lebih lanjut.</li>
                        <li>Melaporkan ketidaksesuaian informasi atau kendala dalam transaksi melalui layanan pengaduan KosKampus.</li>
                        <li>Mengajukan komplain atau refund sesuai ketentuan yang berlaku jika layanan yang diberikan tidak sesuai dengan yang ditampilkan.</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-700 mt-3">Kewajiban Pengguna:</h3>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Memberikan informasi yang benar saat melakukan pendaftaran dan pemesanan.</li>
                        <li>Tidak menggunakan platform untuk tujuan melanggar hukum atau merugikan pihak lain.</li>
                        <li>Membayar biaya layanan KosKampus sesuai ketentuan yang berlaku.</li>
                        <li>Bertanggung jawab atas segala transaksi yang dilakukan melalui platform KosKampus.</li>
                        <li>Tidak menyebarluaskan data pribadi atau informasi kos tanpa izin dari pemilik.</li>
                        <li>Mematuhi aturan dan kebijakan kos yang ditetapkan oleh pemilik kos.</li>
                    </ul>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">B. Hak dan Kewajiban Mitra (Pemilik Kos)</h2>
                    <h3 className="text-xl font-semibold text-gray-700 mt-3">Hak Mitra:</h3>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Mengiklankan properti kos di platform KosKampus sesuai ketentuan yang berlaku.</li>
                        <li>Menentukan harga sewa dan aturan kos sesuai kebijakan masing-masing.</li>
                        <li>Menerima pembayaran sewa penyewa melalui KosKampus.</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-700 mt-3">Kewajiban Mitra:</h3>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Memberikan informasi kos yang benar dan terbaru kepada KosKampus.</li>
                        <li>Menyediakan fasilitas dan layanan sesuai dengan yang ditampilkan di KosKampus.</li>
                        <li>Tidak memungut biaya tambahan di luar yang telah disepakati dalam platform tanpa pemberitahuan kepada penyewa.</li>
                        <li>Bertanggung jawab atas segala permasalahan yang terjadi di kos, termasuk konflik antara penyewa dan pemilik kos.</li>
                        <li>Mematuhi peraturan perundang-undangan terkait penyewaan properti.</li>
                    </ul>
                </section>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default HakKewajiban;
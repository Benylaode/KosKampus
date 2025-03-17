import React from 'react';
import Header from "../items/Header";
import Footer from "../items/Footer";

const TentangKami = () => {
    return (
        <div className="font-sans min-h-screen bg-gray-100">
            <Header />
            <div className="p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Tentang Kami</h1>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">Siapa Kami?</h2>
                    <p className="text-gray-700 mt-2">
                        KosKampus adalah sebuah platform sistem informasi kos berbasis website yang didedikasikan untuk
                        memudahkan mahasiswa dalam mencari hunian yang nyaman, aman, dan sesuai dengan kebutuhan mereka.
                        Berbasis di Sulawesi Selatan, KosKampus hadir sebagai solusi inovatif dalam menjawab tantangan keterbatasan
                        akses informasi mengenai fasilitas, harga, dan ketersediaan kos di sekitar universitas.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">Misi Kami</h2>
                    <p className="text-gray-700 mt-2">
                        Kami berkomitmen untuk menyediakan platform pencarian kos yang mudah diakses, transparan, dan terpercaya.
                        Dengan fitur pencarian berbasis peta, universitas, kisaran harga, tipe kamar, fasilitas, serta rating pengguna,
                        KosKampus bertujuan untuk menghilangkan hambatan informasi yang selama ini menjadi kendala utama bagi
                        mahasiswa dalam menemukan tempat tinggal yang sesuai dengan kebutuhan mereka.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">Visi Kami</h2>
                    <p className="text-gray-700 mt-2">
                        Menjadi platform utama dalam penyediaan informasi kos yang berbasis universitas dengan teknologi inovatif
                        yang memastikan pengalaman pencarian kos yang lebih cepat, transparan, dan efisien bagi mahasiswa di seluruh Indonesia.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">Layanan yang Kami Tawarkan</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Pencarian kos berbasis peta.</li>
                        <li>Filter berdasarkan fasilitas dan harga.</li>
                        <li>Rating dan ulasan pengguna.</li>
                        <li>Integrasi dengan WhatsApp Business.</li>
                        <li>Tanpa biaya bagi pemilik kos.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">Mengapa Memilih KosKampus?</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Akses Mudah: Sistem pencarian berbasis website yang intuitif dan user-friendly.</li>
                        <li>Harga Terjangkau: Biaya layanan yang lebih ekonomis dibandingkan platform sejenis.</li>
                        <li>Informasi Transparan: Detail kos mencakup harga, fasilitas, dan rating.</li>
                        <li>Jaringan Luas: Terintegrasi dengan berbagai universitas dan pemilik kos di berbagai kota.</li>
                        <li>Efisiensi Waktu: Proses pencarian kos yang lebih cepat dan praktis.</li>
                    </ul>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-500">Hubungi Kami</h2>
                    <p className="text-gray-700 mt-2">
                        Website: <a href="https://www.koskampus.com" className="text-blue-500">www.koskampus.com</a> <br/>
                        Email: <a href="mailto:ashanms22a@student.unhas.ac.id" className="text-blue-500">ashanms22a@student.unhas.ac.id</a> <br/>
                        Instagram: <a href="https://instagram.com/koskampus" className="text-blue-500">@koskampus</a> <br/>
                        WhatsApp: <a href="https://wa.me/6288246212357" className="text-blue-500">+62 882-4621-2357</a>
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TentangKami;

import React, { useState, useEffect, createContext, useCallback } from 'react';
import { fetchPaginatedData, searchPondok as searchPondokAPI } from './api';

export const PondokContext = createContext();

export const PondokProvider = ({ children }) => {
  const [pondoks, setPondoks] = useState([]); // Data pondok untuk halaman saat ini
  const [searchResults, setSearchResults] = useState([]); // Hasil pencarian
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Status error
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman dari paginasi
  const [isSearching, setIsSearching] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk mengambil data paginasi
  const getPondoks = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const responseData = await fetchPaginatedData(`/pondok/?page=${page}`);

      // Ekstrak data dan informasi paginasi
      console.log(responseData);
      const { results, total_pages } = responseData;

      setPondoks(results.data); // Set data pondok
      setTotalPages(total_pages); // Total halaman // URL halaman sebelumnya
    } catch (err) {
      setError(err.message);
      console.error("Error fetching pondoks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSearching) {
      // Jika sedang dalam mode pencarian
      searchPondok(searchQuery);
     
    } else {
      // Jika sedang dalam mode data utama
      getPondoks(currentPage);
    }
  }, [currentPage, isSearching, searchQuery, getPondoks]);

  // Handle search and update the results
  const searchPondok = async (query, currentPage) => {
    setLoading(true);
    setIsSearching(true); // Aktifkan mode pencarian
    setSearchQuery(query);
    try {
      const responseData = await searchPondokAPI(query, currentPage);
  
      // Ekstrak data dan informasi paginasi dari hasil pencarian
      const { results, total_pages } = responseData;
  
      setSearchResults(results.data); // Set hasil pencarian
      setTotalPages(total_pages); // Set total halaman // Set URL untuk halaman sebelumnya
    } catch (err) {
      setError(err.message);
      console.error("Error searching pondok:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <PondokContext.Provider
    value={{
      pondoks,
      isSearching,
      searchResults,
      loading,
      error,
      currentPage,
      totalPages,
      setCurrentPage,
      searchPondok, 
      setIsSearching
    }}
  >
    {children}
  </PondokContext.Provider>
);
};

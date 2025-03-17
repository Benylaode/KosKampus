import React, { useState, useEffect, createContext, useCallback } from 'react';
import { fetchPaginatedData, searchPondok as searchPondokAPI } from './api';

export const PondokContext = createContext();

export const PondokProvider = ({ children }) => {
  const [pondoks, setPondoks] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [isSearching, setIsSearching] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');

  const getPondoks = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const responseData = await fetchPaginatedData(`/pondok/?page=${page}`);


      const { results, total_pages } = responseData;

      setPondoks(results.data); 
      setTotalPages(total_pages); 
    } catch (err) {
      setError(err.message);
      console.error("Error fetching pondoks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSearching) {

      searchPondok(searchQuery);
     
    } else {
      getPondoks(currentPage);
    }
  }, [currentPage, isSearching, searchQuery, getPondoks]);

  const searchPondok = async (query, currentPage) => {
    setLoading(true);
    setIsSearching(true); 
    setSearchQuery(query);
    try {
      const responseData = await searchPondokAPI(query, currentPage);
  
  
      const { results, total_pages } = responseData;
  
      setSearchResults(results.data);
      setTotalPages(total_pages); 
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

import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from './api';

// Membuat konteks
export const PondokContext = createContext();

// Membuat Provider untuk memberikan data ke komponen lainnya
export const PondokProvider = ({ children }) => {
    const [pondoks, setPondoks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPondoks = async () => {
            try {
                const responseData = await fetchData('pondok');
                setPondoks(responseData.data);
            } catch (err) {
                setError(err);
                console.error("Error fetching pondoks:", err);
            }
        };

        getPondoks();
    }, []);

    return (
        <PondokContext.Provider value={{ pondoks, error }}>
            {children}
        </PondokContext.Provider>
    );
};

import axios from 'axios';

// Konfigurasi dasar Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Fungsi untuk melakukan pencarian pondok berdasarkan query
 * @param {string} query - Kata kunci pencarian
 * @returns {Promise<Array>} - Hasil pencarian pondok
 */
export const searchPondok = async (query, page = 1, limit = 6) => {
  let endpoint = `/pondok/?${query}&page=${page}&limit=${limit}`;

  try {
    if (endpoint) {
      const response = await axiosInstance.get(endpoint)
      console.log('Full Paginated Data:', response.data);
      return response.data;
      
    }


  } catch (error) {
    console.error('Error searching pondok:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Fungsi untuk login
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/token/', credentials);

    const { access_token, refresh_token } = response.data.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const refreshLogin = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('Refresh token is missing.');

    const response = await axiosInstance.post('/token/refresh/', {
      refresh: refreshToken,
    });

    const { access_token } = response.data.data;

    localStorage.setItem('access_token', access_token);

    console.log('Token refreshed successfully:', response.data);
    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

// Fungsi untuk registrasi
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/register/', userData);

    // Menyesuaikan respons dengan struktur {"data": {...}}
    const result = response.data.data;

    console.log('Registration successful:', result);
    return result;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Fungsi untuk mengambil profil pengguna
export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/');

    // Menyesuaikan respons dengan struktur {"data": {...}}
    const profile = response.data.data;

    console.log('User profile fetched:', profile);
    return profile;
  } catch (error) {
    console.error('Failed to fetch user profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};

// Fungsi untuk mengambil data paginated (misalnya untuk order)
export const fetchPaginatedData = async (endpoint) => {
  try {
    if (endpoint) {
      // Panggil API dengan nextUrl
      const response = await axiosInstance.get(endpoint);
      console.log('Full Paginated Data:', response.data);
      return response.data;
    }
    
  } catch (error) {
    console.error('Error fetching paginated data:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch paginated data');
  }
};

export const listUniversitas = async () => {
  let endpoint = `/universitas/`;

  try {
    if (endpoint) {
      const response = await axiosInstance.get(endpoint)
      console.log('Full Paginated Data:', response.data);
      return response.data;
      
    }


  } catch (error) {
    console.error('Error searching pondok:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};

export const listHarga = async () => {
  let endpoint = `/harga/`;

  try {
    if (endpoint) {
      const response = await axiosInstance.get(endpoint)
      console.log('Full Paginated Data:', response.data);
      return response.data;
      
    }


  } catch (error) {
    console.error('Error searching pondok:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};



export const OrderPondok = async (orderData) => {
  try {
    const response = await axiosInstance.post('/order/', orderData);  // Kirim data order ke API

    console.log('Order successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Order failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Order failed');
  }
};

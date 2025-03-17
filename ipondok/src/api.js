import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
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
      
      return response.data;
      
    }


  } catch (error) {
    console.error('Error searching pondok:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshLogin();
        axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error('Token refresh failed');
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/token/', credentials);

    const { access_token, refresh_token } = response.data.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

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
    const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
    const { access_token } = response.data.data;
    localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw new Error('Token refresh failed');
  }
};


export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/register/', userData);

    const result = response.data.data;

      return result;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};


export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/');

    const profile = response.data.data;

    return profile;
  } catch (error) {
    console.error('Failed to fetch user profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};


export const fetchPaginatedData = async (endpoint) => {
  try {
    if (endpoint) {

      const response = await axiosInstance.get(endpoint);
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
      return response.data;
      
    }


  } catch (error) {
    console.error('Error searching pondok:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};

export const updatePondok = async (pondokId, pondokData) => {
  try {
    const response = await axiosInstance.put(`/pondok/${pondokId}/`, pondokData);
       return response.data;
  } catch (error) {
    console.error('Update failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Update failed');
  }
};

  export const addPondok = async (pondokData) => {
    try {
      const response = await axiosInstance.post('/pondok/', pondokData);
      
      return response.data;
    } catch (error) {
      console.error('Addition failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Addition failed');
    }
  };

export const deletePondok = async (pondokId) => {
  try {
    const response = await axiosInstance.delete(`/pondok/${pondokId}/`);
       return response.data;
  } catch (error) {
    console.error('Delete failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Delete failed');
  }
};

export const uploadPondokImage = async (pondokId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('gambar', imageFile);

    const response = await axiosInstance.post(`/pondok/${pondokId}/upload-gambar/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    return response.data;
  } catch (error) {
    console.error('Image upload failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Image upload failed');
  }
};

export const deletePondokImage = async (imageId) => {
  try {
    const response = await axiosInstance.delete(`/pondok/delete-gambar/${imageId}`);
    
    return response.data;
  } catch (error) {
    console.error('Image deletion failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Image deletion failed');
  }
};



export const OrderPondok = async (orderData) => {
  try {
    const response = await axiosInstance.post('/order/', orderData);  

      return response.data;
  } catch (error) {
    console.error('Order failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Order failed');
  }
};

export const UpdateOrderPondok = async (orderId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/order/${orderId}/`, updatedData);
 
    return response.data;
  } catch (error) {
    console.error('Update order failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Update order failed');
  }
};

export const DeleteOrderPondok = async (orderId) => {
  try {
    const response = await axiosInstance.delete(`/order/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error('Delete order failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Delete order failed');
  }
};

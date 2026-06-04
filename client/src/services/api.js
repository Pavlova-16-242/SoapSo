import axios from 'axios';

const getApiUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000/api/';
    }
    return '/api/';
};

const API_URL = getApiUrl();

function getCsrfToken() {
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 && getCsrfToken() && !error.config._retry) {
            error.config._retry = true;
            error.config.headers['X-CSRFToken'] = getCsrfToken();
            return api(error.config);
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    getCsrf: () => api.get('csrf/'),
    checkAuth: () => api.get('check-auth/'),
    register: (d) => api.post('register/', d),
    login: (d) => api.post('login/', d),
    logout: () => api.post('logout/'),
    getProfile: () => api.get('profile/'),
    updateProfile: (d) => api.patch('profile/update/', d),
    changePassword: (d) => api.put('profile/change-password/', d),
    deleteAccount: (password) => api.delete('profile/delete/', { data: { password } }),
};



let csrfPromise = null;

const refreshCsrfToken = async () => {
    if (csrfPromise) {
        return csrfPromise;
    }
    
    csrfPromise = api.get('csrf/')
        .catch(() => {})
        .finally(() => {
            csrfPromise = null;
        });
    
    return csrfPromise;
};

api.interceptors.request.use(
    async (config) => {
        if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
            await refreshCsrfToken();
        }
        
        const csrfToken = getCsrfToken();
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 400 && 
            error.response?.data?.includes?.('SessionInterrupted')) {
            await refreshCsrfToken();
            
            if (originalRequest.url.includes('/logout/')) {
                await refreshCsrfToken();
                const csrfToken = getCsrfToken();
                if (csrfToken) {
                    originalRequest.headers['X-CSRFToken'] = csrfToken;
                }
            return Promise.resolve({
                data: {
                    is_authenticated: false,
                    user: null,
                    session_refreshed: true
                }
            });
            }
        }
        
        if (error.response) {
            const status = error.response.status;
            const url = error.config.url;
            
            const silentErrors = [
                { status: 401, url: '/profile/' },
                { status: 403, url: '/profile/' },
                { status: 401, url: '/check-auth/' },
                { status: 403, url: '/check-auth/' },
                { status: 400, url: '/check-auth/' },
                { status: 401, url: '/orders/' },
                { status: 403, url: '/orders/' },
                { status: 401, url: '/cart/' },
                { status: 403, url: '/cart/' },
                { status: 400, url: '/cart/' },
            ];
            
            const isSilentError = silentErrors.some(
                err => status === err.status && url.includes(err.url)
            );
            
            if (!isSilentError) {
                console.error('API Error:', {
                    status: error.response.status,
                    url: error.config.url,
                    data: error.response.data
                });
            }
        }
        
        return Promise.reject(error);
    }
);

export const productsAPI = {
    getProducts: () => api.get('products/'),
    getProduct: (id) => api.get(`products/${id}/`),
};

export const cartAPI = {
    getCart: () => api.get('cart/'),
    addToCart: (productId, quantity = 1) => api.post('cart/', { product_id: productId, quantity }),
    updateCartItem: (itemId, quantity) => api.put(`cart/${itemId}/`, { quantity }),
    removeFromCart: (itemId) => api.delete(`cart/${itemId}/`),
    clearCart: () => api.delete('cart/'),
    getCartCount: () => api.get('cart/count/'),
};

export const orderAPI = {
    createOrder: (address) => api.post('orders/create/', { address }),
    getOrders: () => api.get('orders/'),
};

export default api;
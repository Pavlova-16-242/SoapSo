import axios from 'axios';

const getApiUrl = () => {
    // Если запущено локально - используем localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000/api/';
    }
    // Если на продакшене - используем Render URL
    return 'https://soapso.onrender.com/api/'; // ЗАМЕНИ НА СВОЙ RENDER URL
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

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
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',  // Добавляем этот заголовок
    }
});

// Флаг для отслеживания запроса CSRF
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

// Интерцептор для запросов
api.interceptors.request.use(
    async (config) => {
        // Для мутирующих запросов обновляем CSRF-токен
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

// Интерцептор для ответов
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Если получаем 403 ошибку CSRF и это не повторный запрос
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Для запроса логаута - пробуем еще раз с новым токеном
            if (originalRequest.url.includes('/logout/')) {
                await refreshCsrfToken();
                const csrfToken = getCsrfToken();
                if (csrfToken) {
                    originalRequest.headers['X-CSRFToken'] = csrfToken;
                }
                return api(originalRequest);
            }
        }
        
        // Тихая обработка ожидаемых ошибок
        if (error.response) {
            const status = error.response.status;
            const url = error.config.url;
            
            // Ожидаемые ошибки авторизации
            const silentErrors = [
                { status: 401, url: '/profile/' },
                { status: 403, url: '/profile/' },
                { status: 401, url: '/check-auth/' },
                { status: 403, url: '/check-auth/' },
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

export const authAPI = {
    getCsrf: () => api.get('csrf/'),
    checkAuth: () => api.get('check-auth/'),
    register: (userData) => api.post('register/', userData),
    login: (credentials) => api.post('login/', credentials),
    logout: () => api.post('logout/'),
    getProfile: () => api.get('profile/'),
    updateProfile: (userData) => api.patch('profile/update/', userData),
    changePassword: (passwordData) => api.put('profile/change-password/', passwordData),
};

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

export default api;

export const orderAPI = {
    createOrder: () => api.post('orders/create/'),
    getOrders: () => api.get('orders/'),
    getOrder: (id) => api.get(`orders/${id}/`),
};
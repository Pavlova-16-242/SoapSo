import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cartAPI, orderAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const CartPage = () => {
    const { user, checkAuth } = useAuth();
    const { fetchCart } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [imageErrors, setImageErrors] = useState({});
    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    useEffect(() => {
        loadCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCart = async () => {
        try {
            const userData = await checkAuth();
            if (!userData) {
                navigate('/');
                return;
            }

            const response = await cartAPI.getCart();
            setCartItems(response.data.items);
            setTotalPrice(response.data.total_price);
            setTotalQuantity(response.data.total_quantity);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        try {
            if (newQuantity <= 0) {
                await handleRemoveItem(itemId);
                return;
            }

            await cartAPI.updateCartItem(itemId, newQuantity);
            await loadCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await cartAPI.removeFromCart(itemId);
            await loadCart();
            await fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm('Вы уверены, что хотите очистить корзину?')) {
            return;
        }

        try {
            await cartAPI.clearCart();
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantity(0);
            await fetchCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

const handleCheckout = async () => {
    setProcessing(true);
    
    try {
        const response = await orderAPI.createOrder(address);
        console.log('Order created:', response.data);
        
        setShowSuccess(true);
        setAddress(''); 
        await fetchCart();
    } catch (error) {
        console.error('Error creating order:', error);
        alert('Ошибка при создании заказа');
    } finally {
        setProcessing(false);
    }
};

    const handleImageError = (itemId) => {
        setImageErrors(prev => ({ ...prev, [itemId]: true }));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getImageUrl = (item) => {
        if (item?.product?.image_url) {
            return item.product.image_url;
        }
        if (item?.product?.image) {
            return `/static/${item.product.image}`;
        }
        return null;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                    <div className="text-xl">Загрузка корзины...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="">
        <SEO 
            title="Корзина"
            description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
        />
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="font-serif text-6xl">Корзина</h1>

                {showSuccess ? (
                    <div className="bg-white/70 rounded-3xl p-8 text-center my-4">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">
                            Заказ успешно оформлен!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Спасибо за покупку! Ваш заказ будет обработан в ближайшее время.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                            Вернуться в магазин
                        </button>
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="bg-white/70 rounded-3xl p-8 text-center my-4">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">
                            Корзина пуста
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Добавьте товары из каталога, чтобы сделать заказ
                        </p>
                        <button
                            onClick={() => navigate('/catalogue')}
                            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                            Перейти к покупкам
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white/70 rounded-3xl">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">
                                        Товары ({totalQuantity})
                                    </h2>
                                    <button
                                        onClick={handleClearCart}
                                        className="text-red-500 hover:text-red-700 text-sm transition-colors"
                                    >
                                        Очистить корзину
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div 
                                            key={item.id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-200 pb-6 last:border-0"
                                        >
                                            <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                {getImageUrl(item) && !imageErrors[item.id] ? (
                                                    <img 
                                                        src={getImageUrl(item)}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                        onError={() => handleImageError(item.id)}
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <span className="text-4xl">📦</span>
                                                        <p className="text-white/80 text-xs mt-1">Нет фото</p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Цена за шт: {formatPrice(item.product.price)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="flex items-center border rounded-lg">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-lg transition-colors text-lg"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-12 text-center font-semibold text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-lg transition-colors text-lg"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                
                                                <div className="text-right min-w-[100px]">
                                                    <p className="font-bold text-lg">
                                                        {formatPrice(item.total_price)}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-gray-400">
                                                            {formatPrice(item.product.price)} × {item.quantity}
                                                        </p>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-400 hover:text-red-600 transition-colors p-2 text-xl"
                                                    title="Удалить товар"
                                                >
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 rounded-3xl p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Товаров в корзине:</span>
                                    <span className="font-semibold">{totalQuantity} шт.</span>
                                </div>
                                
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Адрес доставки
                                    </label>
                                    <textarea
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Введите адрес доставки (город, улица, дом, квартира)"
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                                    />
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between items-center text-xl">
                                        <span className="text-cyan-900 font-medium">Итого к оплате:</span>
                                        <span className="font-bold text-cyan-600 text-2xl">
                                            {formatPrice(totalPrice)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={processing}
                                    className="w-full bg-cyan-600 text-white py-4 px-6 rounded-lg hover:bg-cyan-900 transition-colors disabled:bg-gray-400 text-lg font-semibold mt-4"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Обработка заказа...
                                        </span>
                                    ) : (
                                        'Оформить заказ'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
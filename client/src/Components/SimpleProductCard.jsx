import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SimpleProductCard = ({ product }) => {
    const { addToCart, updateCartItem, getCartItemQuantity, getCartItemId } = useCart();
    const { user } = useAuth();
    const [showAuthMessage, setShowAuthMessage] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const currentQuantity = getCartItemQuantity(product.id);
    const cartItemId = getCartItemId(product.id);

    const handleAddToCart = async () => {
        if (!user) {
            setShowAuthMessage(true);
            setTimeout(() => setShowAuthMessage(false), 3000);
            return;
        }
        
        await addToCart(product.id);
    };

    const handleQuantityChange = async (newQuantity) => {
        if (cartItemId) {
            await updateCartItem(cartItemId, newQuantity);
        }
    };

    const getImageUrl = () => {
        if (product.image_url) return product.image_url;
        if (product.image) return `/static/${product.image}`;
        return null;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            {/* Изображение */}
            <div className="relative h-64 bg-gradient-to-br from-cyan-100 to-blue-100 overflow-hidden">
                {getImageUrl() && !imageError ? (
                    <img 
                        src={getImageUrl()} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-6xl">🧼</span>
                            <p className="text-gray-400 mt-2">Нет изображения</p>
                        </div>
                    </div>
                )}
                
                {/* Бейдж цены */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <span className="font-bold text-cyan-600 text-lg">
                        {formatPrice(product.price)}
                    </span>
                </div>
            </div>

            {/* Информация */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                    {product.description}
                </p>

                {/* Кнопка корзины */}
                <div className="relative">
                    {showAuthMessage && (
                        <div className="absolute -top-12 left-0 right-0 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-sm text-center z-10">
                            Войдите, чтобы добавлять товары в корзину
                        </div>
                    )}
                    
                    {currentQuantity > 0 ? (
                        <div className="flex items-center justify-between bg-cyan-50 rounded-xl p-3">
                            <button
                                onClick={() => handleQuantityChange(currentQuantity - 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-100 transition-colors text-xl font-bold text-cyan-600"
                            >
                                −
                            </button>
                            
                            <span className="text-xl font-bold text-cyan-600">
                                {currentQuantity}
                            </span>
                            
                            <button
                                onClick={() => handleQuantityChange(currentQuantity + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-100 transition-colors text-xl font-bold text-cyan-600"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-cyan-600 text-white py-4 px-6 rounded-xl hover:bg-cyan-700 transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 group"
                        >
                            <span>🛒</span>
                            <span>{user ? 'В корзину' : 'Войдите для покупки'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleProductCard;
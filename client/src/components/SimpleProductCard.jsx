import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';
import bag from "../assets/icon/bag-w.webp"
import bag_hover from "../assets/icon/bag-w-hover.webp"

const SimpleProductCard = ({ product }) => {
    const { addToCart, updateCartItem, getCartItemQuantity, getCartItemId } = useCart();
    const { user } = useAuth();
    const [imageError, setImageError] = useState(false);
    const { addToast } = useToast();
    
    const currentQuantity = getCartItemQuantity(product.id);
    const cartItemId = getCartItemId(product.id);

    const handleAddToCart = async () => {
        if (!user) {
            addToast('Войдите в аккаунт, чтобы добавлять товары в корзину');
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

    return (
        <div className="bg-white rounded-2xl overflow-hidden duration-300 group">
            <div className="relative h-64 bg-gradient-to-br from-cyan-100 to-blue-100 overflow-hidden">
                {getImageUrl() && !imageError ? (
                    <img 
                        src={getImageUrl()} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
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
                
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-bold text-cyan-900 mb-2">
                    {product.name}
                </h3>
                <p className="text-cyan-600 text-lg mb-2">
                    {product.description}
                </p>
                <span className="font-bold text-cyan-900 text-3xl">
                    {product.price} Р
                </span>
                <div className="relative">
                    
                    {currentQuantity > 0 ? (
                        <div className="flex items-center justify-between bg-cyan-600/50 rounded-xl p-3">
                            <button
                                onClick={() => handleQuantityChange(currentQuantity - 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-100 transition-colors text-xl font-bold text-cyan-600"
                            >
                                −
                            </button>
                            
                            <span className="text-xl font-bold text-white">
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
                            className="group/button w-full bg-cyan-600 text-white py-4 px-6 rounded-xl hover:bg-cyan-700 transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 group"
                        >
                            <div className="relative -translate-y-1">
                                <img src={bag} alt="Корзина" className="w-4 absolute" loading="lazy"/>
                                <img src={bag_hover} alt="Корзина" className="w-4 transition-opacity duration-300 opacity-0 group-hover/button:opacity-100" loading="lazy"/>                               
                            </div>

                            
                            <span>{user ? 'В корзину' : 'Войдите для покупки'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleProductCard;
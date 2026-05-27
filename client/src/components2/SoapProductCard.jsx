import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SoapProductCard = ({ product }) => {
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

    // Кнопка корзины
    const CartButton = () => (
        <div className="relative">
            {showAuthMessage && (
                <div className="absolute -top-12 right-0 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm whitespace-nowrap z-20">
                    Войдите для покупки
                </div>
            )}
            
            {currentQuantity > 0 ? (
                <div className="flex items-center gap-2 bg-cyan-600 rounded-full p-1">
                    <button
                        onClick={() => handleQuantityChange(currentQuantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors text-white font-bold"
                    >
                        −
                    </button>
                    <span className="text-white font-bold min-w-[20px] text-center">
                        {currentQuantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(currentQuantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors text-white font-bold"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button 
                    onClick={handleAddToCart}
                    className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300"
                >
                    <span className="text-white text-xl">🛒</span>
                </button>
            )}
        </div>
    );

    // Рендер в зависимости от layout
    const renderLayout = () => {
        switch (product.layout) {
            case 'horizontal':
                return (
                    <div className={`bg-white ${product.size} grid grid-cols-5 rounded-2xl relative`}>
                        <div className="col-span-3 rounded-l-2xl overflow-hidden">
                            {getImageUrl() && !imageError ? (
                                <img 
                                    src={getImageUrl()} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                    <span className="text-4xl">🧼</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute w-full h-full bg-gradient-to-l from-white from-40% to-70% rounded-r-2xl"></div>
                        <div className="col-span-2 relative p-4">
                            <h3 className="text-4xl">{product.name}</h3>
                            <p className="text-2xl text-cyan-600">{product.description}</p>
                            <div className="flex justify-between absolute right-4 bottom-4 left-4">
                                <p className="text-4xl font-semibold">{product.price} Р</p>
                                <CartButton />
                            </div>
                        </div>
                    </div>
                );

            case 'vertical':
                return (
                    <div className={`bg-white ${product.size} grid grid-rows-3 rounded-2xl relative`}>
                        <div className="row-span-2 rounded-t-2xl overflow-hidden">
                            {getImageUrl() && !imageError ? (
                                <img 
                                    src={getImageUrl()} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                    <span className="text-4xl">🧼</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-b-2xl"></div>
                        <div className="row-span-1 relative p-4">
                            <h3 className="text-4xl">{product.name}</h3>
                            <p className="text-2xl text-cyan-600">{product.description}</p>
                            <div className="flex justify-between absolute right-4 bottom-4 left-4">
                                <p className="text-4xl font-semibold">{product.price} Р</p>
                                <CartButton />
                            </div>
                        </div>
                    </div>
                );

            case 'overlay':
                return (
                    <div className={`bg-white ${product.size} grid grid-rows-5 rounded-2xl relative overflow-hidden`}>
                        <div className="absolute inset-0">
                            {getImageUrl() && !imageError ? (
                                <img 
                                    src={getImageUrl()} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                    <span className="text-4xl">🧼</span>
                                </div>
                            )}
                        </div>
                        <div className="row-span-3"></div>
                        <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-b-2xl"></div>
                        <div className="row-span-2 relative p-4">
                            <h3 className="text-4xl">{product.name}</h3>
                            <p className="text-2xl text-cyan-600">{product.description}</p>
                            <div className="flex justify-between absolute right-4 bottom-4 left-4">
                                <p className="text-4xl font-semibold">{product.price} Р</p>
                                <CartButton />
                            </div>
                        </div>
                    </div>
                );

            case 'featured':
                return (
                    <div className={`bg-white ${product.size} grid grid-rows-4 grid-cols-4 rounded-full relative scale-110 z-10`}>
                        <div className="col-span-4 row-span-4 row-start-1 rounded-full overflow-hidden ring-white ring-[20px]">
                            {getImageUrl() && !imageError ? (
                                <img 
                                    src={getImageUrl()} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                                    <span className="text-4xl">🧼</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute w-full h-full bg-gradient-to-t from-white to-70% rounded-full"></div>
                        <div className="col-start-3 absolute p-4 bg-white rounded-2xl bottom-0">
                            <h3 className="text-4xl">{product.name}</h3>
                            <p className="text-2xl text-cyan-600">{product.description}</p>
                            <div className="flex justify-between">
                                <p className="text-4xl font-semibold">{product.price} Р</p>
                                <CartButton />
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className={`bg-white ${product.size} rounded-2xl relative p-4`}>
                        <h3 className="text-4xl">{product.name}</h3>
                        <p className="text-2xl text-cyan-600">{product.description}</p>
                        <div className="flex justify-between mt-4">
                            <p className="text-4xl font-semibold">{product.price} Р</p>
                            <CartButton />
                        </div>
                    </div>
                );
        }
    };

    return renderLayout();
};

export default SoapProductCard;
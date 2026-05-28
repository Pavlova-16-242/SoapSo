import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user, isAuthChecked } = useAuth();
    
    // Используем ref для отслеживания загрузки
    const isInitialLoad = useRef(true);
    const prevUser = useRef(null);

    const fetchCart = useCallback(async () => {
        if (!user) {
            setCartItems([]);
            setCartCount(0);
            setTotalQuantity(0);
            setTotalPrice(0);
            return;
        }

        setLoading(true);
        try {
            const response = await cartAPI.getCart();
            setCartItems(response.data.items);
            setCartCount(response.data.items.length);
            setTotalQuantity(response.data.total_quantity);
            setTotalPrice(response.data.total_price);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Загружаем корзину только при изменении пользователя
    useEffect(() => {
        // Проверяем, изменился ли пользователь
        const userChanged = prevUser.current !== user;
        prevUser.current = user;

        if (isAuthChecked && user && userChanged) {
            fetchCart();
        } else if (isAuthChecked && !user) {
            setCartItems([]);
            setCartCount(0);
            setTotalQuantity(0);
            setTotalPrice(0);
        }
        
        isInitialLoad.current = false;
    }, [user, isAuthChecked, fetchCart]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) return false;
        
        try {
            const response = await cartAPI.addToCart(productId, quantity);
            setCartItems(response.data.items);
            setCartCount(response.data.items.length);
            setTotalQuantity(response.data.total_quantity);
            setTotalPrice(response.data.total_price);
            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return false;
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            if (quantity <= 0) {
                await cartAPI.removeFromCart(itemId);
            } else {
                await cartAPI.updateCartItem(itemId, quantity);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const getCartItemQuantity = (productId) => {
        const item = cartItems.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
    };

    const getCartItemId = (productId) => {
        const item = cartItems.find(item => item.product.id === productId);
        return item ? item.id : null;
    };

    const clearCart = async () => {
        try {
            await cartAPI.clearCart();
            setCartItems([]);
            setCartCount(0);
            setTotalQuantity(0);
            setTotalPrice(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            totalQuantity,
            totalPrice,
            loading,
            addToCart,
            updateCartItem,
            getCartItemQuantity,
            getCartItemId,
            fetchCart,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
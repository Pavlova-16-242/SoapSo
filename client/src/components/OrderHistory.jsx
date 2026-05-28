import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderAPI.getOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Загрузка заказов...</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    У вас пока нет заказов
                </h3>
                <p className="text-gray-600">
                    Товары, которые вы закажете, будут отображаться здесь
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">История заказов</h2>
            
            {orders.map((order) => (
                <div 
                    key={order.id} 
                    className="bg-white rounded-lg shadow overflow-hidden"
                >
                    {/* Основная информация заказа */}
                    <div 
                        className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleOrder(order.id)}
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold">
                                        Заказ №{order.id}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                        {order.status_display}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {formatDate(order.created_at)}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-4 sm:gap-6">
                                {/* Миниатюры товаров */}
                                <div className="flex -space-x-2">
                                    {order.items.slice(0, 4).map((item) => (
                                        <div 
                                            key={item.id}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden flex-shrink-0"
                                            title={item.product_name}
                                        >
                                            {item.product_image ? (
                                                <img 
                                                    src={item.product_image} 
                                                    alt={item.product_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                                    🧼
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {order.items.length > 4 && (
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                                            +{order.items.length - 4}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                        {order.total_quantity} шт.
                                    </p>
                                    <p className="font-bold text-lg">
                                        {formatPrice(order.total_price)}
                                    </p>
                                </div>
                                
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                    {expandedOrder === order.id ? '▲' : '▼'}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Детали заказа */}
                    {expandedOrder === order.id && (
                        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                            <h4 className="font-semibold mb-4">Состав заказа:</h4>
                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div 
                                        key={item.id}
                                        className="flex items-center justify-between bg-white p-3 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden flex-shrink-0">
                                                {item.product_image ? (
                                                    <img 
                                                        src={item.product_image} 
                                                        alt={item.product_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white">
                                                        🧼
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.product_name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {formatPrice(item.price)} × {item.quantity} шт.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">
                                                {formatPrice(item.total_price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="font-semibold">Итого:</span>
                                <span className="font-bold text-xl text-cyan-600">
                                    {formatPrice(order.total_price)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
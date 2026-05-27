import React, { useState, useEffect } from 'react';
// import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/api';
import SimpleProductCard from '../components/SimpleProductCard';
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
const Catalogue = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productsAPI.getProducts();
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация и сортировка
    useEffect(() => {
        let result = [...products];

        // Поиск
        if (searchTerm) {
            result = result.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Сортировка
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case 'price-desc':
                result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [searchTerm, sortBy, products]);

    // const handleProfileClick = () => {
    //     if (user) {
    //         navigate('/profile');
    //     } else {
    //         navigate('/');
    //     }
    // };

    return (
        <div className="min-h-screen ">
            {/* Навигация */}
            <Header/>
            <UpButton/>

            {/* Контент */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Заголовок и поиск */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Каталог мыла
                    </h1>
                    
                    {/* Поиск и сортировка */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Поиск по названию или описанию..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                                🔍
                            </span>
                        </div>
                        
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg bg-white"
                        >
                            <option value="default">По умолчанию</option>
                            <option value="price-asc">Цена: по возрастанию</option>
                            <option value="price-desc">Цена: по убыванию</option>
                            <option value="name">По названию</option>
                        </select>
                    </div>
                </div>

                {/* Сетка товаров */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Загрузка товаров...</p>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🧼</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">
                            {searchTerm ? 'Ничего не найдено' : 'Товаров пока нет'}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {searchTerm ? 'Попробуйте изменить поисковый запрос' : 'Загляните позже - мы добавим новые товары'}
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-4">
                            Найдено товаров: {filteredProducts.length}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <SimpleProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}
                
            </div>
                  <Footer/>

        </div>
    );
};

export default Catalogue;
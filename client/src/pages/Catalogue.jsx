import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api.js';
import SimpleProductCard from '../components/SimpleProductCard.jsx';
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import SEO from '../components/SEO';

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

	useEffect(() => {
		let result = [...products];

		if (searchTerm) {
			result = result.filter(product => 
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

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

	return (
		<div className="min-h-screen ">
      <SEO 
        title="Каталог"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />
			<Header/>
			<UpButton/>

			<main className="max-w-7xl mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="font-serif text-6xl pb-8">Каталог</h1>
					
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1 relative">
							<input
								type="text"
								placeholder="Поиск по названию или описанию..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="bg-white/70 w-full pl-12 pr-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
							/>
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
								🔍
							</span>
						</div>
						
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="bg-white/70 px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg bg-white"
						>
							<option value="default">По умолчанию</option>
							<option value="price-asc">Цена: по возрастанию</option>
							<option value="price-desc">Цена: по убыванию</option>
							<option value="name">По названию</option>
						</select>
					</div>
				</div>

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
						<p className="text-cyan-900 mb-4 text-2xl">
							Найдено товаров: {filteredProducts.length}
						</p>
						<div className="bg-white/70 border border-white rounded-3xl lg:p-8 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredProducts.map(product => (
								<SimpleProductCard key={product.id} product={product} />
							))}
						</div>
					</>
				)}
			</main>
			<Footer/>
		</div>
	);
};

export default Catalogue;
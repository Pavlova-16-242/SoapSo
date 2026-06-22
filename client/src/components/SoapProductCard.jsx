import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import mix from '../assets/image/catalogue/mix-long.webp'
import bag from "../assets/icon/bag-w.webp"
import { useToast } from './Toast'

const SoapProductCard = ({ product }) => {
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

	const titleClass = "text-2xl lg:text-3xl xl:text-4xl leading-tight";
	const descClass = "text-lg lg:text-xl xl:text-2xl";
	const priceClass = "text-2xl lg:text-3xl xl:text-4xl";

	const CartButton = () => (
		<div className="relative">
			{currentQuantity > 0 ? (
				<div className="flex items-center gap-1 bg-cyan-600 rounded-full p-2">
					<button
						onClick={() => handleQuantityChange(currentQuantity - 1)}
						className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/50 transition-colors text-white font-bold text-base duration-300"
					>
						−
					</button>
					<span className="text-white font-bold min-w-[20px] text-center text-base">
						{currentQuantity}
					</span>
					<button
						onClick={() => handleQuantityChange(currentQuantity + 1)}
						className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/50 transition-colors text-white font-bold text-base duration-300"
					>
						+
					</button>
				</div>
			) : (
				<button 
					onClick={handleAddToCart}
					className="bg-cyan-600 p-3 ml-2 rounded-full group/button hover:bg-cyan-900 duration-300"
				>
					<img src={bag} alt="Корзина" className="w-4" loading="lazy"/>
				</button>
				
			)}
		</div>
	);

	const ImagePlaceholder = () => (
		<div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
			<span className="text-4xl lg:text-6xl">🧼</span>
		</div>
	);

	const ProductImage = ({ className }) => (
		<div className={`${className} overflow-hidden`}>
			{getImageUrl() && !imageError ? (
				<img 
					src={getImageUrl()} 
					alt={product.name} 
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					loading="lazy"
					onError={() => setImageError(true)}
				/>
			) : (
				<ImagePlaceholder />
			)}
		</div>
	);
	const renderLayout = () => {
    switch (product.layout) {
			case '1':
				return (
					<div className={`duration-300 group bg-white col-span-5 row-span-1 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid grid-cols-5 h-full">
							<ProductImage className="col-span-3 rounded-l-2xl" />
							<div className="absolute inset-0 rounded-r-2xl"></div>
							<div className="col-span-2 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
            );
			case '2':
				return (
					<div className={`duration-300 group bg-white col-span-5 row-span-1 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid grid-cols-5 h-full">
							<ProductImage className="col-span-3 rounded-l-2xl" />
							<div className="absolute inset-0 rounded-r-2xl"></div>
							<div className="col-span-2 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
            );
			case '3':
				return (
					<div className={`duration-300 group bg-white lg:col-span-3 col-span-2 row-span-1 rounded-2xl relative overflow-hidden shadow-md`}>
						<div className="grid h-full">
							<ProductImage className="row-span-2" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="row-span-1 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
				);
			case '4':
				return (
					<div className={`duration-300 group bg-white col-span-3 row-span-1 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid grid-rows-3 h-full">
							<ProductImage className="row-span-2 rounded-t-2xl" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="row-span-1 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
				);
			case '5':
				return (
					<div className={`duration-300 group bg-white col-span-4 row-span-1 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid grid-rows-3 h-full">
							<ProductImage className="row-span-2 rounded-t-2xl" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="row-span-1 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
				);
			case '6':
				return (
					<div className={`duration-300 group bg-white col-span-2 row-span-1 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid h-full">
							<ProductImage className=" rounded-t-2xl" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="row-span-1 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
				);
			case '7':
				return (
					<div className={`duration-300 group bg-white lg:col-span-5 col-span-2 row-span-1 rounded-full relative z-10 overflow-visible shadow-md`}>
						<div className="grid grid-rows-4 grid-cols-4 h-full overflow-hidden">
							<div className="col-span-4 row-span-4 rounded-full overflow-hidden">
								<img 
									src={getImageUrl()} 
									alt={product.name} 
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
									onError={() => setImageError(true)}
								/>
							</div>
						</div>
						<div className="col-span-1 col-start-2 absolute bottom-0 right-0 p-3 lg:p-4 bg-white rounded-2xl shadow-md">
							<h3 className={titleClass}>{product.name}</h3>
							<p className={`${descClass} text-cyan-600 mt-1 hidden sm:block`}>{product.description}</p>
							<div className="flex justify-between items-center mt-2">
								<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
								<CartButton />
							</div>
						</div>
					</div>
				);
			case '8':
				return (
					<div className={`duration-300 group bg-white col-span-3 row-span-1 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid h-full">
							<ProductImage className=" rounded-t-2xl" />
							<div className="row-span-1 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
				);
			case '9':
				return (
					<div className={`duration-300 group bg-white col-span-4 row-span-3 rounded-2xl relative overflow-hidden hidden lg:grid lg:grid-cols-5 shadow-md`}>
							<ProductImage className="col-span-3" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="col-span-2 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
						</div>
					</div>
				);
			case '10':
				return (
					<div className={`duration-300 group bg-white col-span-2 row-span-3 rounded-2xl relative overflow-hidden hidden lg:block shadow-md`}>
						<div className="grid h-full">
							<ProductImage className="row-span-1 rounded-t-2xl" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="row-span-1 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>
					</div>
				);
			case '11':
				return (
					<div className={`duration-300 group bg-white lg:col-span-4 col-span-2 row-span-3 rounded-2xl relative overflow-hidden lg:grid lg:grid-cols-5 shadow-md`}>
							<ProductImage className="col-span-3" />
							<div className="absolute inset-0 rounded-b-2xl"></div>
							<div className="col-span-2 relative p-4 flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
					</div>
				);
			case '12':
				return (
					<div className={`duration-300 group bg-white col-span-10  grid-cols-10 rounded-2xl relative overflow-hidden hidden lg:grid shadow-md`}>
							<img src={mix} alt="Набор 'Микс'" className="col-span-7 group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
							<div className="absolute inset-0 "></div>
							<div className="col-span-3 relative p-4 bg-white flex flex-col justify-between">
								<div>
									<h3 className={titleClass}>{product.name}</h3>
									<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
									<CartButton />
								</div>
							</div>
						</div>	
				);
		default:
			return (
				<div className={`bg-white ${product.size} rounded-2xl relative p-4 flex flex-col justify-between shadow-md`}>
					<div>
						<h3 className={titleClass}>{product.name}</h3>
						<p className={`${descClass} text-cyan-600 mt-1`}>{product.description}</p>
					</div>
					<div className="flex justify-between items-center mt-2">
						<p className={`${priceClass} font-semibold`}>{product.price} Р</p>
						<CartButton />
					</div>
				</div>
			);
		}
	};
	return renderLayout();
};

export default SoapProductCard;
// Библиотеки
import React, { useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
//Модули
import AuthModal from "./AuthModal"
//Иконки
import icon_logo from "../assets/icon/logo.webp"
import icon_bag from "../assets/icon/bag.webp"
import icon_bag_hover from "../assets/icon/bag-hover.webp"
import icon_menu from "../assets/icon/menu.webp"
import icon_menu_hover from "../assets/icon/menu-hover.webp"

const Header = () => {
    const { user, checkAuth } = useAuth();
    const { totalQuantity } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const customNavigate = (path) => {
        setIsOpenMenu(false);
        navigate(path);
    };

    const handleHomeClick = () => {
        customNavigate('/');
    };


    const handleProfileClick = async () => {
        if (user) {
            customNavigate('/profile');
        } else {
            const userData = await checkAuth();
            if (userData) {
                customNavigate('/profile');
            } else {
                setIsOpenAuth(true);
            }
        }
    };

    const handleCartClick = () => {
        if (user) {
            customNavigate('/cart');
        } else {
            setIsOpenAuth(true);
        }
    };

    const isProfilePage = location.pathname === '/profile';

    const getNavLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `group relative ${isActive ? 'font-semibold' : ''}`;
    };

	return (
		<>
			<header className="bg-gradient-to-b from-white px-4 min-h-20">
				<div className="max-w-7xl mx-auto">
					{/* Мобильная версия */}
					<div className="flex lg:hidden justify-between items-center text-md">
						<button 
							onClick={() => setIsOpenMenu(!isOpenMenu)} 
							aria-label={isOpenMenu ? "Закрыть меню" : "Открыть меню"}
							className="bg-white p-3 m-4 rounded-full group hover:ring-1 ring-cyan-900 duration-300 shadow-sm"
						>
							<img src={icon_menu} alt="Меню" className="w-4 absolute" loading="lazy"/>
							<img src={icon_menu_hover} alt="Меню" className="w-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100" loading="lazy"/>
						</button>

						<button onClick={handleHomeClick} className="">
							<img src={icon_logo} alt="Логотип" className="w-16 m-4" loading="lazy"/>
						</button>

						{/* Кнопка корзины для мобильных */}
						<div className="relative">
								<button 
									onClick={handleCartClick}
									aria-label={`Корзина${user && totalQuantity > 0 ? `, ${totalQuantity} товаров` : ''}`}
									className="bg-white p-3 m-4 rounded-full group hover:ring-1 ring-cyan-900 duration-300 shadow-sm"
								>
									<img src={icon_bag} alt="Корзина" className="w-4 absolute" loading="lazy"/>
									<img src={icon_bag_hover} alt="Корзина" className="w-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100" loading="lazy"/>
								</button>
								{user && totalQuantity > 0 && (
								<span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
									{totalQuantity}
								</span>
							)}
						</div>
					</div>

					{/* Мобильная навигация */}
					<div className={`overflow-hidden bg-cyan-100/0 transition-all duration-1000 lg:hidden ${
						isOpenMenu ? "max-h-[500px]" : "max-h-0"
					}`}>
						<nav className="flex flex-col gap-4 p-4 justify-center items-center text-nowrap bg-white/80 backdrop-blur-sm rounded-2xl mx-4 mb-4">
							<button className={getNavLinkClass('/')} onClick={handleHomeClick}>
								<span className="hover:font-semibold duration-300">Главная</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
							<button className={getNavLinkClass('/catalogue')} onClick={() => customNavigate('/catalogue')}>
								<span className="hover:font-semibold duration-300">Каталог</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
							<button className={getNavLinkClass('/contacts')} onClick={() => customNavigate('/contacts')}>
								<span className="hover:font-semibold duration-300">Контакты</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
														
							{/* Профиль и выход для мобильных */}
							{user ? (
							<>
								<button className={getNavLinkClass('/profile')} onClick={handleProfileClick}>
									<span className="hover:font-semibold duration-300 flex items-center gap-2">
										Профиль
									</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
								</button>
							</>
							) : (
							<button className={getNavLinkClass('/profile')} onClick={handleProfileClick}>
								<span className="hover:font-semibold duration-300">Войти</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
							)}
						</nav>
					</div>

					{/* Версия для ПК */}
					<div className="hidden lg:flex justify-between items-center text-2xl">
						<div className="">
							<button onClick={handleHomeClick} className="">
								<img src={icon_logo} alt="Логотип" className="w-24 m-4" loading="lazy"/>
							</button>
						</div>

						{/* Навигация ПК */}
						<nav className="flex justify-center items-center text-nowrap">
							<button className={`m-4 ${getNavLinkClass('/')}`} onClick={handleHomeClick}>
								<span className="hover:font-semibold duration-300">Главная</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
							<button className={`m-4 ${getNavLinkClass('/catalogue')}`} onClick={() => customNavigate('/catalogue')}>
								<span className="hover:font-semibold duration-300">Каталог</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
							<button className={`m-4 ${getNavLinkClass('/contacts')}`} onClick={() => customNavigate('/contacts')}>
								<span className="hover:font-semibold duration-300">Контакты</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>
							<button 
								onClick={handleProfileClick}
								className={`m-4 group relative ${isProfilePage ? 'font-semibold' : ''}`}
							>
								{user ? (
									<span className="flex items-center gap-2 hover:font-semibold duration-300">
										<span className="">Профиль</span>
									</span>
								) : (
									<span className="hover:font-semibold duration-300">Войти</span>
								)}
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
							</button>														
						</nav>
						<div className="flex items-center gap-2">
							<div className="relative">
								<button 
									onClick={handleCartClick}
									aria-label={`Корзина${user && totalQuantity > 0 ? `, ${totalQuantity} товаров` : ''}`}
									className="bg-white p-3 m-4 rounded-full group hover:ring-2 ring-cyan-900 duration-300 shadow-sm"
								>
									<img src={icon_bag} alt="Корзина" className="w-6 absolute" loading="lazy"/>
									<img src={icon_bag_hover} alt="Корзина" className="w-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" loading="lazy"/>
								</button>
								{user && totalQuantity > 0 && (
									<span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
										{totalQuantity}
									</span>
									)}
							</div>
						</div>
					</div>        
				</div>
			</header>

			{/* Модальное окно авторизации */}
			{isOpenAuth && <AuthModal onClose={() => setIsOpenAuth(false)} />}
		</>
	);
};

export default Header;
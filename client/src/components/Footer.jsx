// Библиотеки
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from "./AuthModal"
// Изображения:Иконки
import icon_logo from "../assets/icon/logo.webp"
import icon_telegram from "../assets/icon/telegram.webp"
import icon_vkontakte from "../assets/icon/vkontakte.webp"
import icon_tiktok from "../assets/icon/tiktok.webp"
const Footer = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const customNavigate = (path) => {
    navigate(path);
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
  return (
    <div className="static bottom-0">
      <footer className="lg:text-xl text-md flex lg:flex-row flex-col gap-4 justify-around  bg-cyan-100/70 p-16">
        <div className="">
          <button onClick={()=>navigate("/")} 
          className="">
            <img src={icon_logo} alt="Shoping bag" className="w-20" loading="lazy"/>
          </button>
          <p className="w-60">Натуральное мыло ручной работы для вашей кожи и удовольствия каждый день.</p><br/>
          <p className="">&copy; 2026 SoapSo. Мыло ручной работы. Все права защищены.</p>
        </div>
        <div className="lg:text-start text-center">
          <h3 className="font-semibold">Навигация</h3>
          <ul>
            <li><button onClick={()=>navigate("/")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Главная</span>
              <span className="absolute left-0 bottom-0.5 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/catalogue")}
            className="group relative">
              <span className="hover:font-semibold duration-300">Каталог</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/contacts")}
            className="group relative">
              <span className="hover:font-semibold duration-300">Контакты</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={handleCartClick}
            className="group relative">
              <span className="hover:font-semibold duration-300">Корзина</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button 
              onClick={handleProfileClick}
              className='group relative'>
              {user ? (<>
                <span className="hover:font-semibold duration-300">Профиль</span>
                <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span>                
                </>) : (<>
                <span className="hover:font-semibold duration-300">Войти</span>
                <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span>                
                </>)}
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-600 duration-300 group-hover:scale-x-100"></span>
							</button></li>              
          </ul>
        </div>
        <div className="lg:text-start text-center">
          <h3 className="font-semibold">Помощь</h3>
          <ul>
            <li><button onClick={()=>navigate("/how")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Как сделать заказ</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/pay")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Оплата и доставка</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/refund")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Возврат и обмен</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
          </ul>
        </div>
        <div className="text-center">
          <h3 className="font-semibold">Наши соцсети</h3>
          <div className="flex justify-center">
            <button className="w-8"><img src={icon_telegram} alt="Telegram" 
            className="" loading="lazy"/></button>
            <button className="m-4 w-8"><img src={icon_vkontakte} alt="VKontakte" 
            className="rounded-full" loading="lazy"/></button>
            <button className="w-8"><img src={icon_tiktok} alt="TikTok" 
            className="" loading="lazy"/></button>
          </div>
          <h3 className="font-semibold">Контакты</h3>
          <p className="">+7 (800) 504-50-50</p>
          <p className="">soap50@gmail.com</p>            
          <p className="">г. Владивосток, ул. Шепеткова,<br/> дом 14, палата 13</p>            
        </div>
      </footer>

      {isOpenAuth && <AuthModal onClose={() => setIsOpenAuth(false)} />}
    </div>
  )
}
export default Footer
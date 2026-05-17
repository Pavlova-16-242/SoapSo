// Библиотеки
import React from "react"
import { useNavigate } from "react-router-dom"
// Изображения:Иконки
import icon_logo from "../assets/icon/logo.webp"
import icon_telegram from "../assets/icon/telegram.webp"
import icon_vkontakte from "../assets/icon/vkontakte.webp"
import icon_tiktok from "../assets/icon/tiktok.webp"
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div>
      <footer className="text-xl flex justify-around bg-cyan-100/70 p-16">
        <div className="">
          <a onClick={()=>navigate("/")} href="#header" 
          className="">
            <img src={icon_logo} alt="Shoping bag" className="w-20" />
          </a>
          <p className="w-60">Натуральное мыло ручной работы для вашей кожи и удовольствия каждый день.</p><br/>
          <p className="">©2026 SoapSo. Мыло ручной работы. Все права защищены.</p>
        </div>
        <div className="">
          <h3 className="font-semibold">Навигация</h3>
          <ul>
            <li><a onClick={()=>navigate("/")} href="#header" 
            className="group relative">
              <span className="hover:font-semibold duration-300">Главная</span>
              <span className="absolute left-0 bottom-0.5 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></a></li>
            <li><button onClick={()=>navigate("/catalogue")}
            className="group relative">
              <span className="hover:font-semibold duration-300">Каталог</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><a onClick={()=>navigate("/")} href="#about"
            className="group relative">
              <span className="hover:font-semibold duration-300">О нас</span>
              <span className="absolute left-0 bottom-0.5 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></a></li>
            <li><a onClick={()=>navigate("/")} href="#reviews"
            className="group relative">
              <span className="hover:font-semibold duration-300">Отзывы</span>
              <span className="absolute left-0 bottom-0.5 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></a></li>
            <li><button onClick={()=>navigate("/contacts")}
            className="group relative">
              <span className="hover:font-semibold duration-300">Контакты</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
          </ul>
        </div>
        <div className="">
          <h3 className="font-semibold">Помощь</h3>
          <ul>
            <li><button onClick={()=>navigate("/404")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Как сделать заказ</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/404")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Оплата</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/404")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Доставка</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/404")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Возврат и обмен</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
            <li><button onClick={()=>navigate("/404")} 
            className="group relative">
              <span className="hover:font-semibold duration-300">Вопросы и ответы</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
          </ul>
        </div>
        <div className="text-center">
          <h3 className="font-semibold">Наши соцсети</h3>
          <div className="flex justify-center">
            <button className="w-8"><img src={icon_telegram} alt="Telegram" 
            className="" /></button>
            <button className="m-4 w-8"><img src={icon_vkontakte} alt="VKontakte" 
            className="rounded-full" /></button>
            <button className="w-8"><img src={icon_tiktok} alt="TikTok" 
            className="" /></button>
          </div>
          <h3 className="font-semibold">Контакты</h3>
          <p className="">+7 (800) 504-50-50</p>
          <p className="">soap50@gmail.com</p>            
          <p className="">г. Владивосток, ул. Шепеткова,<br/> дом 14, палата 13</p>            
        </div>
      </footer>
    </div>
  )
}
export default Footer
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
//Модули
import AuthModal from "./AuthModal"
//Иконки
import icon_logo from "../assets/icon/logo.webp"
import icon_bag from "../assets/icon/bag.webp"
import icon_bag_hover from "../assets/icon/bag-hover.webp"
import icon_menu from "../assets/icon/menu.webp"
import icon_menu_hover from "../assets/icon/menu-hover.webp"

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenAuth, setIsOpenAuth] = useState(false)
  const navigate = useNavigate()
  const customNavigate = (path)=>{
    const token = localStorage.getItem("token")
    const protectedRoutes = ["/profile"]
    if(protectedRoutes.includes(path) && !token){
      setIsOpenAuth(true)
    }else{
      navigate(path)
    }
  }    
  return (
    <div id="header">
      <header className="bg-gradient-to-b from-white lg:px-32">
{/* Мобильная версия */}
      <div className="flex lg:hidden justify-between place-items-center text-md">
        
        <button  onClick={() => setIsOpenMenu(!isOpenMenu)} 
        className="bg-white p-3 m-4 rounded-full group hover:ring-1 ring-cyan-900 duration-300">
          <img src={icon_menu} alt="" className="w-4 absolute"/>
          <img src={icon_menu_hover} alt="" className="w-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100"/>
        </button>

        <a onClick={()=>customNavigate("/")} href="#header" className=""><img src={icon_logo} alt="" className="w-16 m-4" /></a>

        <button  onClick={()=>customNavigate("/cart")}
        className="bg-white p-3 m-4 rounded-full group hover:ring-1 ring-cyan-900 duration-300
        "
        ><img src={icon_bag} alt="Shoping bag" className="w-4 absolute" />
        <img src={icon_bag_hover} alt="Shoping bag" className="w-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        </button>
      </div>

{/* Навигация  */}
      <div className={`overflow-hidden bg-cyan-100/0 transition-all duration-1000 lg:hidden ${
          isOpenMenu ? "max-h-[500px]" : "max-h-0 "
        }`}>
        <nav className="flex flex-col gap-4 p-4 justify-betwen items-center text-nowrap">
          <a className="group relative" onClick={()=>customNavigate("/")} href="#header">
            <span className="hover:font-semibold duration-300">Главная</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </a>
          <button className="group relative scroll-smooth" onClick={()=>customNavigate("/catalogue")}>
            <span className="hover:font-semibold duration-300">Каталог</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </button>
          <a className="group relative scroll-smooth" onClick={()=>customNavigate("/")} href="#about">
            <span className="hover:font-semibold duration-300">О нас</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </a>
          <a className="group relative"  onClick={()=>customNavigate("/")} href="#reviews">
            <span className="hover:font-semibold duration-300">Отзывы</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </a>
          <button className="group relative" onClick={()=>customNavigate("/contacts")}>
            <span className="hover:font-semibold duration-300">Контакты</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </button>
          <button className="group relative" onClick={()=>customNavigate("/profile")}>
            <span className="hover:font-semibold duration-300">Профиль</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </button>
        </nav>
      </div>

{/* Версия для ПК */}
      <div className="hidden lg:flex justify-between place-items-center text-2xl">
        <div className="">
          <a onClick={()=>customNavigate("/")} href="#header" className="">
            <img src={icon_logo} alt="Shoping bag" className="w-24 m-4" />
          </a>
        </div>

{/* Навигация */}
        <nav className="flex justify-betwen items-center text-nowrap">
          <a className="m-4 group relative" onClick={()=>customNavigate("/")} href="#header">
            <span className="hover:font-semibold duration-300">Главная</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </a>
          <button className="m-4 group relative scroll-smooth" onClick={()=>customNavigate("/catalogue")}>
            <span className="hover:font-semibold duration-300">Каталог</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </button>
          <a className="m-4 group relative scroll-smooth" onClick={()=>customNavigate("/")} href="#about">
            <span className="hover:font-semibold duration-300">О нас</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </a>
          <a className="m-4 group relative"  onClick={()=>customNavigate("/")} href="#reviews">
            <span className="hover:font-semibold duration-300">Отзывы</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </a>
          <button className="m-4 group relative" onClick={()=>customNavigate("/contacts")}>
            <span className="hover:font-semibold duration-300">Контакты</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </button>
          <button className="m-4 group relative" onClick={()=>customNavigate("/profile")}>
            <span className="hover:font-semibold duration-300">Профиль</span>
            <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-current duration-300 group-hover:scale-x-100"></span>
          </button>
        </nav>

        <div className="">
          <button  onClick={()=>customNavigate("/cart")}
          className="
          bg-white p-3 m-4 rounded-full group hover:ring-2 ring-cyan-900 duration-300
          "
          ><img src={icon_bag} alt="Shoping bag" className="w-6 absolute" />
          <img src={icon_bag_hover} alt="Shoping bag" className="w-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </header>
    {/* Рендеринг модуля */}
    {isOpenAuth && <AuthModal onClose={() => setIsOpenAuth(false)} />}
    </div>
  )
}

export default Navbar
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
//Модули
import AuthModal from "./AuthModal"
//Иконки
import icon_logo from "../assets/icon/logo.webp"
import icon_bag from "../assets/icon/bag.webp"
import icon_bag_hover from "../assets/icon/bag-hover.webp"
import icon_user from "../assets/icon/user.webp"
import icon_user_hover from "../assets/icon/user-hover.webp"

const Navbar = () => {
  // const [isAuthOpen, setIsAuthOpen] = useState(false);  
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const customNavigate = (path)=>{
    const token = localStorage.getItem("token")
    const protectedRoutes = ["/profile"]
    if(protectedRoutes.includes(path) && !token){
      setIsOpen(true)
    }else{
      navigate(path)
    }
  }    
  return (
    <div id="header">
      <header className="flex justify-between bg-gradient-to-b from-white py-8 px-32">
        
        <div className="">
          <a onClick={()=>customNavigate("/")} href="#header"
          className="text-cyan-900">
            <img src={icon_logo} alt="Shoping bag" className="w-24" />
          </a>
        </div>

        <div className="text-cyan-900 text-xl flex justify-betwen items-center">
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
        </div>

        <div className="">
          <button  onClick={()=>customNavigate("/cart")}
          className="bg-white p-3 m-2 rounded-full group hover:ring-2 ring-cyan-900 duration-300"
          ><img src={icon_bag} alt="Shoping bag" className="w-6 absolute" />
          <img src={icon_bag_hover} alt="Shoping bag" className="w-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={()=>customNavigate("/profile")}
          className="bg-white p-3 m-2 rounded-full group hover:ring-2 ring-cyan-900 duration-500"
          ><img src={icon_user} alt="Shoping bag" className="w-6 absolute" />
          <img src={icon_user_hover} alt="Shoping bag" className="w-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      
      </header>
      {/* Рендеринг модуля */}
      {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
    
    </div>
  )
}

export default Navbar
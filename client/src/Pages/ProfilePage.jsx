// Библиотеки
import React from "react"
import { useNavigate } from "react-router-dom"
// Модули
import Header from "../Components/Header.jsx"
import UpButton from "../Components/UpButton.jsx"
import Footer from "../Components/Footer.jsx"
// Изображения:Пользователи
import user_anastasia from "../assets/image/users/anastasia.webp"
// Изображения:Карточки
import card_flower from "../assets/image/catalogue/flower.webp"
import card_pink from "../assets/image/catalogue/pink.webp"
import card_coconut from "../assets/image/catalogue/coconut.webp"
import card_milk from "../assets/image/catalogue/milk.webp"
import card_lavender from "../assets/image/catalogue/lavender.webp"

const ProfilePage = () => {
	const navigate = useNavigate()
	
  return (
    <div>
			<Header/>
			<UpButton/>
			<section className="max-w-[1400px] mx-auto py-16">
				<h2 className="font-serif text-6xl">Профиль</h2>
				<div className="flex place-items-center bg-white/70 p-8 rounded-3xl my-4">
					<img src={user_anastasia} alt="" className="rounded-full w-32" />
					<div className="mx-8">
						<h3 className="text-3xl font-semibold">Анастасия</h3>
						<p className="text-xl py-2">chflelilas@gmail.com</p>
						<button className="border rounded-2xl p-2 px-4 text-xl border-cyan-600 hover:font-semibold duration-300 hover:bg-cyan-600/20">Редактировать профиль</button>
					</div>
				</div>
					<div className="grid grid-cols-6 gap-4">
						<h2 className="font-serif text-6xl pb-4 col-start-2 col-span-5">Мои заказы</h2>	
					</div>
					<div className="grid grid-cols-6 grid-rows-2 gap-4">	
						<nav className="bg-white/70 p-8 rounded-3xl text-2xl row-span-1">
							<ul>
								<li><button onClick={()=>navigate("/404")} 
								className="group relative">
									<span className="hover:font-semibold duration-300">Мои заказы</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
								<li><button onClick={()=>navigate("/404")} 
								className="group relative">
									<span className="hover:font-semibold duration-300">Корзина</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
								<li><button onClick={()=>navigate("/404")} 
								className="group relative">
									<span className="hover:font-semibold duration-300">Адреса доставки</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
								<li><button onClick={()=>navigate("/404")} 
								className="group relative">
									<span className="hover:font-semibold duration-300">Способы оплаты</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
								<li><button onClick={()=>navigate("/404")} 
								className="group relative">
									<span className="hover:font-semibold duration-300">Настройки</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
								<li><button className="group relative" onClick={()=>{
										localStorage.removeItem("token")
										window.location.reload()
										navigate("/")
									}}>
									<span className="hover:font-semibold duration-300">Выйти</span>
									<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span></button></li>
							</ul>
						</nav>			
						<div className="col-span-5 row-span-2">
							<div className="grid grid-cols-6 grid-rows-3 bg-white/70 p-8 rounded-3xl mb-4">
								<div className="">
									<h3 className="text-xl">Заказ №1234</h3>
									<p className="text-xl text-cyan-600">12 мая 2026</p>
								</div>
								<div className="col-start-6 relative">
									<span className="border rounded-full px-4 text-xl border-green-600 text-green-600 absolute right-0">Доставлен</span>
								</div>
								<div className="col-span-3 row-span-2 flex">
									<img src={card_flower} alt="" className="w-32 mr-4 rounded-xl" />
									<img src={card_pink} alt="" className="w-32 mr-4 rounded-xl" />
								</div>
								<div className="col-start-5 row-start-3">
									<p className="text-xl text-cyan-600 ">Сумма</p>
									<p className="text-3xl font-semibold">900 Р</p>
								</div>
								<div className="col-start-6 row-start-3 relative">
									<button className="hover:underline hover:text-cyan-600 absolute bottom-0 right-0">Подробнее →</button>
								</div>
							</div>

							<div className="grid grid-cols-6 grid-rows-3 bg-white/70 p-8 rounded-3xl">
								<div className="">
									<h3 className="text-xl">Заказ №5678</h3>
									<p className="text-xl text-cyan-600">12 мая 2026</p>
								</div>
								<div className="col-start-6 relative">
									<span className="border rounded-full px-4 text-xl border-cyan-600 text-cyan-600 absolute right-0">Отправлен</span>
								</div>
								<div className="col-span-3 row-span-2 flex">
									<img src={card_coconut} alt="" className="w-32 mr-4 rounded-xl" />
									<img src={card_lavender} alt="" className="w-32 mr-4 rounded-xl" />
									<img src={card_milk} alt="" className="w-32 mr-4 rounded-xl" />
								</div>
								<div className="col-start-5 row-start-3">
									<p className="text-xl text-cyan-600 ">Сумма</p>
									<p className="text-3xl font-semibold">1300 Р</p>
								</div>
								<div className="col-start-6 row-start-3 relative">
									<button className="hover:underline hover:text-cyan-600 absolute bottom-0 right-0">Подробнее →</button>
								</div>
							</div>
						</div>
					</div>
			</section>
			<Footer/>
    </div>
  )
}

export default ProfilePage
// Хуки
import React from "react"
// Модули
import Header from "../Components/Header.jsx"
import UpButton from "../Components/UpButton.jsx"
import Footer from "../Components/Footer.jsx"
// Изображения:Карточки
import card_mint from "../assets/image/catalogue/mint.webp"
import card_pine from "../assets/image/catalogue/pine.webp"
// Изображения:Иконки
import icon_trash from "../assets/icon/trash.webp"

const CartPage = () => {
  return (
    <div>
			<Header/>
			<UpButton/>
			<section className="max-w-[1400px] mx-auto py-16">
				<h2 className="font-serif text-6xl pb-4">Корзина</h2>
        <p className="text-xl">2 товара</p>
				<div className="relative flex place-items-center bg-white/70 p-8 rounded-3xl my-4">
					<img src={card_mint} alt="" className="rounded-2xl w-48" />
					<div className="mx-8">
						<h3 className="text-3xl font-semibold pb-2">Мятный бриз</h3>
						<p className="text-xl pb-16">~90г</p>
						<p className="text-3xl font-semibold">450 P</p>
					</div>
          <div className="absolute right-8 flex">
            <div className="flex border border-cyan-600 text-cyan-600 rounded-2xl p-2 mx-4">
              <button className="pr-2">-</button>
              <button className="border-x border-cyan-600 text-cyan-600 px-4">1</button>
              <button className="pl-2">+</button>
            </div>
            <button className="border border-cyan-600 bg-cyan-600/20 rounded-2xl p-2">
              <img src={icon_trash} alt="" className="w-6" />
            </button>
          </div>
				</div>

				<div className="relative flex place-items-center bg-white/70 p-8 rounded-3xl my-4">
					<img src={card_pine} alt="" className="rounded-2xl w-48" />
					<div className="mx-8">
						<h3 className="text-3xl font-semibold pb-2">Хвойный лес</h3>
						<p className="text-xl pb-16">~80г</p>
						<p className="text-3xl font-semibold">400 P</p>
					</div>
          <div className="absolute right-8 flex">
            <div className="flex border border-cyan-600 text-cyan-600 rounded-2xl p-2 mx-4">
              <button className="pr-2">-</button>
              <button className="border-x border-cyan-600 text-cyan-600 px-4">1</button>
              <button className="pl-2">+</button>
            </div>
            <button className="border border-cyan-600 bg-cyan-600/20 rounded-2xl p-2">
              <img src={icon_trash} alt="" className="w-6" />
            </button>
          </div>
				</div>

        <div className="grid grid-cols-6 bg-white/70 p-8 rounded-3xl my-4">
            <p className="text-3xl font-semibold col-span-5 pb-2">Итого</p>
            <p className="text-3xl font-semibold by-2">950 Р</p>
            <p className="text-3xl font-semibold col-span-5 py-2">Доставка</p>
            <p className="text-3xl font-semibold text-cyan-600 py-2">500 P</p>
            <p className="col-span-5 text-cyan-600 text-xl py-2">При заказе от 1500 Р доставка бесплатно</p>
          <hr className="col-span-6 border-cyan-600/50 py-2" />
            <p className="text-3xl font-semibold col-span-5 py-2">Итого к оплате</p>
            <p className="text-3xl font-semibold py-2">1450 P</p>
            <button className="col-span-6 bg-cyan-600 rounded-2xl mt-2 p-4 text-white text-3xl">Оформить заказ</button>            
         
        </div>
			</section>
			<Footer/>
    </div>
  )
}

export default CartPage
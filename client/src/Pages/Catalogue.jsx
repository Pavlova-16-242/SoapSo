import React from "react"
import Header from "../Components/Header.jsx"
import UpButton from "../Components/UpButton.jsx"
import Footer from "../Components/Footer.jsx"
// Изображения:Иконки
import icon_bag_w from "../assets/icon/bag-w.webp"
import icon_bag_w_hover from "../assets/icon/bag-w-hover.webp"
// Изображения:Карточки
import card_sea from "../assets/image/catalogue/sea.webp"
import card_milk from "../assets/image/catalogue/milk.webp"
import card_lavender from "../assets/image/catalogue/lavender.webp"
import card_mint from "../assets/image/catalogue/mint.webp"
import card_coal from "../assets/image/catalogue/coal.webp"
import card_citrus from "../assets/image/catalogue/citrus.webp"
import card_pink from "../assets/image/catalogue/pink.webp"
import card_coconut from "../assets/image/catalogue/coconut.webp"
import card_pine from "../assets/image/catalogue/pine.webp"
import card_honey from "../assets/image/catalogue/honey.webp"
import card_flower from "../assets/image/catalogue/flower.webp"
import card_mix from "../assets/image/catalogue/mix.webp"

const Catalogue = () => {
  return (
    <div>
      <Header/>
      <UpButton/>
			<section className="max-w-[1280px] mx-auto py-16">
				<h2 className="font-serif text-6xl pb-4">Каталог</h2>
        <p className="text-xl">Найдено 12 товара</p>
        <div className="flex flex-wrap bg-white/70 rounded-3xl p-5 mt-8 gap-4 justify-around">
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_sea} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Морская свежесть</h3>
              <p className="text-2xl text-cyan-600"> морской солью и водорослями</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">450 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_milk} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Овсяное молочко</h3>
              <p className="text-2xl text-cyan-600">с овсяными хлопьями и медом</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">410 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_lavender} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Лавандовое облако</h3>
              <p className="text-2xl text-cyan-600">с лавандой и маслом ши</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">420 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_mint} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Мятный бриз</h3>
              <p className="text-2xl text-cyan-600">с мятой и эфирным маслом эвкалипта</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">430 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_coal} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Спа-уголь</h3>
              <p className="text-2xl text-cyan-600">с активированным углем и маслом чайного дерева</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">430 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_citrus} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Цитрусовый рассвет</h3>
              <p className="text-2xl text-cyan-600">с апельсином и маслом миндаля</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">440 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_pink} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Розовая глина</h3>
              <p className="text-2xl text-cyan-600">с розовой глиной и маслом жожоба</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">410 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_coconut} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Кокосовый рай</h3>
              <p className="text-2xl text-cyan-600">с кокосовым маслом и стружкой кокоса</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">440 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_pine} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Хвойный лес</h3>
              <p className="text-2xl text-cyan-600">с эфирным маслом хвои и зеленой глиной</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">430 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_honey} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Мед и прополис</h3>
              <p className="text-2xl text-cyan-600">с медом и экстрактом прополиса</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">420 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_flower} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Цветочный букет</h3>
              <p className="text-2xl text-cyan-600">с лепестками роз и маслом ши</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">450 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
          <div className="bg-white grid grid-rows-2 rounded-2xl relative max-w-64">
            <img src={card_mix} alt="" className="row-span-1 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-1 relative p-4">
              <h3 className="text-4xl">Набор "Микс"</h3>
              <p className="text-2xl text-cyan-600">3 случайных виды мыла в подарочной упаковке</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">1100 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>
        </div>
    
			
      </section>
      <Footer/>
    </div>
  )
}

export default Catalogue
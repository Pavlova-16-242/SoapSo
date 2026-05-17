// Библиотеки
import React from "react"
// Модули
import Header from "../Components/Header.jsx"
import UpButton from "../Components/UpButton.jsx"
import Footer from "../Components/Footer.jsx"
// Изображения:Иконки
import icon_bag_w from "../assets/icon/bag-w.webp"
import icon_bag_w_hover from "../assets/icon/bag-w-hover.webp"
import icon_delivery from "../assets/icon/delivery.webp"
import icon_eco from "../assets/icon/eco.webp"
import icon_check from "../assets/icon/check.webp"
import icon_gift from "../assets/icon/gift.webp"
import icon_support from "../assets/icon/support.webp"
import icon_quote from "../assets/icon/quote.webp"
import icon_star from "../assets/icon/star.webp"
// Изображения:Картинки
import hero from "../assets/image/hero.webp"
import bubble from "../assets/image/bubble.webp"
import shell from "../assets/image/shell.webp"
// Изображения:Карточки
import card_sea from "../assets/image/hits/sea.webp"
import card_milk from "../assets/image/hits/milk.webp"
import card_lavender from "../assets/image/hits/lavender.webp"
import card_mint from "../assets/image/hits/mint.webp"
import card_coal from "../assets/image/hits/coal.webp"
import card_citrus from "../assets/image/hits/citrus.webp"
import card_pink from "../assets/image/hits/pink.webp"
import card_coconut from "../assets/image/hits/coconut.webp"
import card_pine from "../assets/image/hits/pine.webp"
import card_honey from "../assets/image/hits/honey.webp"
import card_flower from "../assets/image/hits/flower.webp"
import card_mix from "../assets/image/hits/mix.webp"
// Изображения:Пользователи
import user_anastasia from "../assets/image/users/anastasia.webp"
import user_natalia from "../assets/image/users/natalia.webp"
import user_kristina from "../assets/image/users/kristina.webp"
import { useNavigate } from "react-router-dom"
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div>
{/* Шапка */}
      <Header/>
      <UpButton/>
{/* Главная */}
      <section id="home" className="h-screen overflow-hidden pt-32 -mb-16">
        <div className="absolute z-10 mx-64">
          <h1 className="font-serif text-8xl">Красота.<br/>Чистота.<br/>
            <span className="font-myfont text-cyan-600">Ручная работа.</span>
          </h1>
          <p className="my-16 w-96 text-4xl">Натуральное мыло ручной работы для вашей кожи и удовольствия каждый день.</p>
          <a href="#hits" className="rounded-full text-3xl py-4 px-12 bg-cyan-600 text-white hover:bg-cyan-900 duration-300">Выбрать мыло<span className="pl-8">→</span></a>        
        </div>
        <div className="float-right">
          <img src={hero} alt="Хит продаж" className="" />
        </div>
      </section>
{/* Хиты */}
      <section id="hits" className="max-w-[1400px] mx-auto py-16 xl:block" >
        <div className="flex justify-between">
  {/* Заголовок секции */}
          <h2 className="font-serif text-6xl">Наши хиты</h2>
          <button onClick={()=>navigate("/")} className="text-6xl">Полный каталог →</button>          
        </div>
  {/* Сетка каталога */}
        <div className="bg-white/70 rounded-3xl p-5 mt-8 grid grid-cols-5 grid-rows-7 gap-5">
    {/* Карточка товара 1*/}
          <div className="duration-300 relative rounded-2xl grid grid-cols-2 col-span-2 row-span-1">
            <img src={card_sea} alt="Мыло `Морская свежесть`" 
            className="absolute rounded-2xl w-full h-full object-cover" />
            <div className="rounded-r-2xl absolute p-8 place-content-between z-5 col-start-2 w-full h-full">
              <h3 className="text-4xl">Морская свежесть</h3>
              <p className="text-2xl text-cyan-600">с морской солью и водорослями</p>
              <p className="text-4xl font-semibold">450 Р</p>
              <div className="flex justify-between absolute right-8 bottom-8 left-8">
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 2*/}
          <div className="duration-300 relative rounded-2xlgrid grid-cols-2 col-span-3 row-span-1 ">
            <img src={card_milk} alt="Мыло `Овсяное молоко`" className="absolute rounded-2xl w-full h-full object-cover" />
            <div className="rounded-r-2xl absolute p-8 place-content-between z-5 col-start-2 w-full h-full">
              <h3 className="text-4xl">Овсяное молочко</h3>
              <p className="text-2xl text-cyan-600">с овсяными хлопьями и медом</p>
              <p className="text-4xl font-semibold">450 Р</p>
              <div className="flex justify-between absolute right-8 bottom-8 left-8">
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
      {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" 
                  className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" 
                  className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 3*/}
          <div className="duration-300 relative rounded-2xl grid grid-rows-2 col-span-1 row-span-2">
            <img src={card_lavender} alt="Мыло `Лавандовое облако`" className="absolute rounded-2xl w-full h-full object-cover" />
            <div className="rounded-b-2xl absolute p-8 place-content-between z-5 row-start-2 w-full h-full">
              <h3 className="text-4xl">Лавандовое облако</h3>
              <p className="text-2xl text-cyan-600">с лавандой и маслом ши</p>
              <p className="text-4xl font-semibold">420 Р</p>              
              <div className="flex justify-between absolute right-8 bottom-8 left-8">
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 4*/}
          <div className="duration-300 relative rounded-2xl grid grid-rows-2 col-span-2 row-span-2 ">
            <img src={card_mint} alt="Мыло `Мятный бриз`" className="absolute rounded-2xl w-full h-full object-cover" />
            <div className="rounded-b-2xl absolute p-8 place-content-between z-5 row-start-2 w-full h-full">
              <h3 className="text-4xl">Мятный бриз</h3>
              <p className="text-2xl text-cyan-600">с мятой и эфирным маслом эвкалипта</p>.
              <p className="text-4xl font-semibold">430 Р</p>
              <div className="flex justify-between absolute right-8 bottom-8 left-8">
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 5*/}
          <div className="duration-300 relative rounded-2xl grid grid-rows-3 col-span-2 row-span-3">
            <img src={card_coal} alt="Мыло `Спа-уголь`" className="absolute rounded-2xl w-full h-full object-cover" />
            <div className="rounded-b-2xl absolute p-8 place-content-between z-5 row-start-3 w-full h-full">
              <h3 className="text-4xl">Спа-уголь</h3>
              <p className="text-2xl text-cyan-600">с активированным углем и маслом чайного дерева</p>
              <p className="text-4xl font-semibold">430 Р</p>              
              <div className="flex justify-between absolute right-8 bottom-8 left-8">
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 6*/}
          <div className="duration-300 row-span-2  rounded-2xl relative">
            <img src={card_citrus} alt="Мыло `Цитрусовый рассвет`" className="rounded-2xl h-full object-cover relative " />
            <div className="w-full z-5 p-8 rounded-b-2xl h-[380px] absolute bottom-0 pt-[150px] ">
              <h3 className="text-4xl">Цитрусовый рассвет</h3>
              <p className="text-2xl text-cyan-600">с апельсином и маслом миндаля</p>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-semibold">440 Р</p>
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 7*/}
          <div className="duration-300 col-span-2 row-span-2 scale-110 rounded-full text-center  relative z-10">
            <img src={card_pink} alt="Мыло `Розовая глина`" className="rounded-full h-full w-full object-cover" />
            <div className="w-full z-5  p-16 rounded-b-full h-[300px] absolute bottom-0 pt-[140px]">
              <h3 className="text-4xl">Розовая глина</h3>
              <p className="text-2xl text-cyan-600">с розовой глиной и маслом жожоба</p>
              <div className="flex justify-between px-24 items-center">
                <p className="text-4xl font-semibold">410 Р</p>
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 8*/}
          <div className=" duration-300 col-span-2 relative  rounded-2xl">
            <img src={card_coconut} alt="Мыло `Кокосовый рай`" className="rounded-2xl h-full object-cover" />
          </div>
    {/* Карточка товара 9*/}
          <div className=" duration-300 col-span-2 row-span-2 relative  rounded-2xl">
            <img src={card_pine} alt="Мыло `Хвойный лес`" 
            className="rounded-2xl h-full object-cover" />
            <div className="w-full z-5  p-8 rounded-b-2xl h-[300px] absolute bottom-0 pt-[150px] ">
              <h3 className="text-4xl">Хвойный лес</h3>
              <p className="text-2xl text-cyan-600">с эфирным маслом хвои и зеленой глиной</p>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-semibold">430 Р</p>
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 10*/}
          <div className=" duration-300 col-span-1 row-span-2 relative  rounded-2xl">
            <img src={card_honey} alt="Мыло `Мед и прополис`" className="rounded-2xl h-full object-cover" />
            <div className="w-full z-5  p-8 rounded-b-2xl h-[340px] absolute bottom-0 pt-[150px] ">
              <h3 className="text-4xl">Мед и прополис</h3>
              <p className="text-2xl text-cyan-600">с медом и экстрактом прополиса</p>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-semibold">420 Р</p>
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" 
                  className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" 
                  className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 11*/}
          <div className=" duration-300 col-span-2 row-span-2 relative  rounded-2xl">
            <img src={card_flower} alt="Мыло `Цветочный букет`" className="rounded-2xl h-full object-cover" />
            <div className="w-full z-5  p-8 rounded-b-2xl h-[300px] absolute bottom-0 pt-[150px] ">
              <h3 className="text-4xl">Цветочный букет</h3>
              <p className="text-2xl text-cyan-600">с лепестками роз и маслом ши</p>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-semibold">450 Р</p>
                <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
              {/* Кнопка "Добавить в корзину" */}
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>  
          </div>
    {/* Карточка товара 12*/}
          <div className=" duration-300 col-span-5 relative  rounded-2xl">
            <img src={card_mix} alt="Набор мыла `Морское наслаждение`" className="rounded-2xl h-full object-cover" />
              <button className="text-xl hover:underline hover:text-cyan-600">Перейти к товару →</button>
            {/* Кнопка "Добавить в корзину" */}
              <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
              </button>   
          </div>
        </div>  
      </section>
{/* Факты о компании */}
      <section className="max-w-[1400px] mx-auto py-16" id="about">
        <h2 className="text-center font-serif text-6xl">Почему выбирают нас</h2>
        <div className="text-center bg-white/50 rounded-3xl p-12 mt-8 grid grid-cols-5 gap-5">
          <div className="place-items-center grid grid-rows-2">
            <div className="bg-white p-4 rounded-full row-span-1">
              <img src={icon_delivery} alt="" className="m-2 w-24" />              
            </div>
            <h3 className="text-4xl font-semibold p-4">Доставка</h3>
            <p className="text-cyan-600 text-xl">Мы гарантируем быструю и бережную доставку по всей стране и за ее пределами.</p>
          </div>
          <div className="place-items-center grid grid-rows-2">
            <div className="bg-white p-4 rounded-full row-span-1">
              <img src={icon_check} alt="" className="m-2 w-24" />              
            </div>
            <h3 className="text-4xl font-semibold p-4">Сертификат качества</h3>
            <p className="text-cyan-600 text-xl">Наша продукция регулярно проходит проверки качества и получает номинации в конкурсах.</p>
          </div>
          <div className="place-items-center grid grid-rows-2">
            <div className="bg-white p-4 rounded-full row-span-1">
              <img src={icon_eco} alt="" className="m-2 w-24" />              
            </div>
            <h3 className="text-4xl font-semibold p-4">Состав</h3>
            <p className="text-cyan-600 text-xl">Мы используем только натуральные материалы и экологичный сотав, не наносящий вреда природе.</p>
          </div>
          <div className="place-items-center grid grid-rows-2">
            <div className="bg-white p-4 rounded-full row-span-1">
              <img src={icon_gift} alt="" className="m-2 w-24" />              
            </div>
            <h3 className="text-4xl font-semibold p-4">Идеальный подарок</h3>
            <p className="text-cyan-600 text-xl">Фигурное мыло ручной работы понравится и будет полезно всем, независимо от пола и возраста.</p>
          </div>
          <div className="place-items-center grid grid-rows-2">
            <div className="bg-white p-4 rounded-full row-span-1">
              <img src={icon_support} alt="" className="m-2 w-24" />              
            </div>
            <h3 className="text-4xl font-semibold p-4">На связи 24/7</h3>
            <p className="text-cyan-600 text-xl">Сотрудники нашего сервисного центра всегда готовы помочь вам и ответить на любые вопросы.  </p>
          </div>
        </div>
      </section>
{/* Отзывы */}
      <section className="max-w-[1400px] mx-auto py-16" id="reviews">
        <h2 className="text-center font-serif text-6xl">Отзывы наших заказчиков</h2>
        <div className="grid grid-cols-3 gap-5 mt-8">
          <div className="bg-white/70 p-8 rounded-3xl grid grid-rows-3">
            <div className=" row-span-2 ">
              <img src={icon_quote} alt="" className="w-8 mb-4" />
              <p className="text-xl text-cyan-600">Я вообще не думала, что мыло может так радовать! “Розовая глина” — это как маленький спа-день дома, кожа после него очень мягкая и нежная. А “Цветочный букет” пахнет так, будто тебе подарили охапку свежих цветов. Теперь из ванной вообще выходить не хочется!</p>              
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <div className="flex py-4">
                  <img src={icon_star} alt="" className="w-4" />
                  <img src={icon_star} alt="" className="w-4 mx-1" />
                  <img src={icon_star} alt="" className="w-4" />
                  <img src={icon_star} alt="" className="w-4 mx-1" />
                  <img src={icon_star} alt="" className="w-4" />
                </div>
                <p className="text-xl font-semibold">Анастасия</p>
              </div>
              <img src={user_anastasia} alt="" className="rounded-full w-20" />
            </div>
          </div>
          <div className="bg-white/70 p-8 rounded-3xl grid grid-rows-3">
            <div className="row-span-2">
              <img src={icon_quote} alt="" className="w-8 mb-4 " />
              <p className="text-xl text-cyan-600">Гайс, это не мыло, это моя новая персоналити. “Лавандовое облако” смывает не только грязь, но и эмоциональный урон после неудачных каток в валик. “Овсяное молочко” — литерали объятья в формате мыла. Кожа после него такая довольная, будто апнула имортала. За “Кокосовый рай” отдельный респект — очень вкусно, жаль что так мало *пускает пузыри изо рта*.</p>              
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <div className="flex py-4">
                  <img src={icon_star} alt="" className="w-4" />
                  <img src={icon_star} alt="" className="w-4 mx-1" />
                  <img src={icon_star} alt="" className="w-4" />
                  <img src={icon_star} alt="" className="w-4 mx-1" />
                  <img src={icon_star} alt="" className="w-4" />
                </div>
                <p className="text-xl font-semibold">Кристина</p>
              </div>
              <img src={user_kristina} alt="" className="rounded-full w-20" />
            </div>
          </div>
          <div className="bg-white/70 p-8 rounded-3xl grid grid-rows-3">
            <div className=" row-span-2">
              <img src={icon_quote} alt="" className="w-8 mb-4" />
              <p className="text-xl text-cyan-600">Попробовала “Хвойный лес” и “Мятный бриз” — оба варианта приятно удивили качеством. У мыла хороший натуральный аромат без резкости, пена мягкая, кожу не сушит даже при ежедневном использовании. Особенно понравился “Мятный бриз” за ощущение свежести после душа. Видно, что продукт сделан аккуратно и с вниманием к деталям.</p>              
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <div className="flex py-4">
                  <img src={icon_star} alt="" className="w-4" />
                  <img src={icon_star} alt="" className="w-4 mx-1" />
                  <img src={icon_star} alt="" className="w-4" />
                  <img src={icon_star} alt="" className="w-4 mx-1" />
                  <img src={icon_star} alt="" className="w-4" />
                </div>
                <p className="text-xl font-semibold">Наталья</p>
              </div>
              <img src={user_natalia} alt="" className="rounded-full w-20" />
            </div>
          </div>
        </div>
      </section>
{/* Форма подписки */}
      <section className="max-w-[1400px] mx-auto py-32 ">
        <div className="relative">
          <img src={bubble} alt="" className="absolute w-52 opacity-70 top-4 left-8" />
          <img src={bubble} alt="" className="absolute w-24 right-24 opacity-70 -top-4" />
          <img src={shell} alt="" className="absolute w-48 drop-shadow-lg right-2 top-36" />
        </div>        
        <div className="bg-cyan-100/70 rounded-3xl p-12 flex justify-center items-center gap-16">
          <div className="">
            <h3 className="text-3xl font-serif pb-4">Будьте в курсе новинок<br/> и специальных предложений</h3>
            <p className="text-2xl text-cyan-600">Подпишитесь на нашу рассылку и получите<br/> скидку 10% на первый заказ.</p>
          </div>
          <div className="text-2xl bg-white rounded-full flex">
            <input type="text" className="rounded-l-full p-4 px-8 max-w-[400px] " placeholder="Ваш e-mail"/>
            <button className="p-4 px-8 bg-cyan-600 rounded-full text-white">Подписаться</button>
          </div>
        </div>
      </section>
{/* Подвал */}
      <Footer/>
    </div>
  )
}
export default HomePage
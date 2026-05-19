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
import card_mix from "../assets/image/catalogue/mix-long.webp"
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
      <section id="home" className="h-screen overflow-hidden lg:pt-32 pt-8 lg:-mb-16 ">
        <div className="absolute z-10 lg:mx-64 px-4">
          <h1 className="font-serif lg:text-8xl text-3xl">Красота.<br/>Чистота.<br/>
            <span className="font-myfont text-cyan-600">Ручная работа.</span>
          </h1>
          <p className="lg:my-16 my-8 max-w-96 lg:text-4xl text-lg">Натуральное мыло ручной работы для вашей кожи и удовольствия каждый день.</p>
          <div className="justify-self-center lg:justify-self-start">
          <a href="#hits" className="rounded-full lg:text-3xl py-4 px-12 bg-cyan-600 text-white hover:bg-cyan-900 duration-300">Выбрать мыло<span className="pl-8">→</span></a>        
          </div>
        </div>
        <div className="float-right lg:translate-x-24 translate-x-8 -translate-y-10 lg:max-w-full max-w-96">
          <img src={hero} alt="Декор" className="" />
        </div>
      </section>
{/* Хиты */}
      <section id="hits" className="max-w-[1400px] mx-auto py-16 xl:block" >
        <div className="flex justify-between">
  {/* Заголовок секции */}
          <h2 className="font-serif text-6xl">Наши хиты</h2>
          <button onClick={()=>navigate("/catalogue")} className="text-6xl">Полный каталог →</button>          
        </div>
  {/* Сетка каталога */}
        <div className="bg-white/70 rounded-3xl p-5 mt-8 grid grid-cols-10 gap-5">

          <div className="bg-white col-span-5 row-span-1 grid grid-cols-5 rounded-2xl relative">
            <img src={card_sea} alt="" className="col-span-3 rounded-l-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-l from-white from-40% to-70% rounded-r-2xl"></div>
            <div className="col-span-2 relative p-4">
              <h3 className="text-4xl">Морская свежесть</h3>
              <p className="text-2xl text-cyan-600">с морской солью и водорослями</p>
              <div className="flex justify-between absolute right-4 bottom-4 left-4">
              <p className="text-4xl font-semibold">450 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>

          <div className="bg-white col-span-5 row-span-1 grid grid-cols-5 rounded-2xl relative">
            <img src={card_milk} alt="" className="col-span-3 rounded-l-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-l from-white from-40% to-70% rounded-r-2xl"></div>
            <div className="col-span-2 relative p-4">
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

          <div className="bg-white col-span-3 row-span-1 grid grid-rows-3 rounded-2xl relative">
            <img src={card_lavender} alt="" className="row-span-2 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-b-2xl"></div>
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

          <div className="bg-white col-span-3 row-span-1 grid grid-rows-3 rounded-2xl relative">
            <img src={card_mint} alt="" className="row-span-2 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-b-2xl"></div>
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
          
          <div className="bg-white col-span-4 row-span-3 grid grid-rows-3 rounded-2xl relative">
            <img src={card_coal} alt="" className="row-span-2 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-b-2xl"></div>
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

          <div className="bg-white col-span-2 row-span-4 grid grid-rows-4 rounded-2xl relative">
            <img src={card_citrus} alt="" className="row-span-2 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-2 relative p-4">
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

          <div className="bg-white col-span-4 row-span-4 grid grid-rows-4 grid-cols-4 rounded-full relative scale-110 z-10 ">
            <img src={card_pink} alt="" className="col-span-4 row-span-4 row-start-1 rounded-full ring-white ring-[20px]" />
            <div className="absolute w-full h-full bg-gradient-to-t from-white to-70% rounded-full"></div>
            <div className="col-start-3 absolute p-4 bg-white rounded-2xl bottom-0">
              <h3 className="text-4xl">Розовая глина</h3>
              <p className="text-2xl text-cyan-600">с розовой глиной и маслом жожоба</p>
              <div className="flex justify-between">
              <p className="text-4xl font-semibold">410 Р</p>
                <button className="bg-cyan-600 p-3 rounded-full group hover:scale-125 duration-300">
                  <img src={icon_bag_w} alt="Shoping bag" className="w-6 absolute" />
                  <img src={icon_bag_w_hover} alt="Shoping bag" className="w-6 opacity-0 group-hover:opacity-100 duration-300" />
                </button>   
              </div>
            </div>
          </div>

          <div className="bg-white col-span-4 row-span-2 grid grid-cols-5 rounded-2xl relative">
            <img src={card_coconut} alt="" className="col-span-3 rounded-l-2xl" />
            <div className="absolute w-full h-full bg-gradient-to-l from-white from-40% to-70% rounded-r-2xl"></div>
            <div className="col-span-2 relative p-4">
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

          <div className="bg-white col-span-4 row-span-3 grid grid-rows-5 rounded-2xl relative overflow-hidden">
            <img src={card_pine} alt="" className="absolute" />
            <div className="row-span-3"></div>
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-r-2xl"></div>
            <div className="row-span-2 relative p-4">
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

          <div className="bg-white col-span-2 row-span-3 grid grid-rows-4 rounded-2xl relative">
            <img src={card_honey} alt="" className="row-span-2 rounded-t-2xl " />
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-50% to-70% rounded-b-2xl"></div>
            <div className="row-span-2 relative p-4">
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

          <div className="bg-white col-span-4 row-span-3 grid grid-rows-5 rounded-2xl relative overflow-hidden">
            <img src={card_flower} alt="" className="absolute" />
            <div className="row-span-3"></div>
            <div className="absolute w-full h-full bg-gradient-to-t from-white from-40% to-70% rounded-r-2xl"></div>
            <div className="row-span-2 relative p-4">
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

          <div className="bg-white col-span-10 grid grid-cols-10 rounded-2xl relative">
            <img src={card_mix} alt="" className="col-span-7 rounded-l-2xl" />
            <div className="absolute w-full h-full bg-gradient-to-l from-white from-30% to-70% rounded-r-2xl"></div>
            <div className="col-span-3 relative p-4">
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
{/* Факты о компании */}
      <section className="max-w-[1400px] mx-auto py-16 " id="about">
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
      <section className="max-w-[1400px] mx-auto py-16 " id="reviews">
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
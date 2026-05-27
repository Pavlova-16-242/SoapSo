// Библиотеки
import React, { useState, useEffect } from "react"
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { productsAPI } from '../services/api'


// Модули
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import AuthModal from '../components/AuthModal'
import SoapProductCard from '../components/SoapProductCard';
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


const HomePage = () => {
    
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        // Делаем функцию показа модального окна доступной глобально для навигации
        window.showAuthModal = () => setShowAuthModal(true);
        
        return () => {
            delete window.showAuthModal;
        };
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productsAPI.getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">

{/* Шапка */}
      <Header/>
      <UpButton/>
{/* Главная */}
      <section id="home" className=" overflow-hidden lg:pt-32 pt-8 lg:-mb-16 ">
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
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Наши товары
                    </h1>
                    {!user && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <p className="text-blue-800">
                                👋 Войдите в аккаунт, чтобы добавлять товары в корзину
                            </p>
                        </div>
                    )}
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Загрузка товаров...</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/70 rounded-3xl p-5 mt-8 grid grid-cols-10 gap-5">
                        {products.map(product => (
                            <SoapProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
      </section>
{/* Отзывы */}
      <section className="max-w-[1280px] mx-auto py-16 " id="reviews">
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
      <section className="max-w-[1280x] mx-auto py-32 ">
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

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
    );
};

export default HomePage;
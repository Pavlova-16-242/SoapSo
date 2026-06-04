// Библиотеки
import React, { useState, useEffect } from "react"
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { productsAPI } from '../services/api.js'
// Модули
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import AuthModal from '../components/AuthModal.jsx'
import SoapProductCard from '../components/SoapProductCard.jsx';
import SEO from '../components/SEO';
// Изображения:Иконки
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
    <div className="">
      <SEO 
        title="Главная"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />
      {/* Шапка */}
      <Header/>
      <UpButton/>
      <main className="">
      {/* Главная */}
        <section className="overflow-hidden lg:pt-32 pt-8 lg:-mb-16 max-w-7xl mx-auto px-4">
          <div className="absolute z-10 lg:mx-0 mx-4">
            <h1 className="font-serif lg:text-8xl text-3xl">Красота.<br/>Чистота.<br/>
              <span className="font-myfont text-cyan-600">Ручная работа.</span>
            </h1>
            <p className="lg:my-16 my-8 max-w-96 lg:text-4xl text-lg">Натуральное мыло ручной работы для вашей кожи и удовольствия каждый день.</p>
            <a href='#hits' className="rounded-full lg:text-3xl py-4 px-12 bg-cyan-600 text-white hover:bg-cyan-900 duration-300">Выбрать мыло<span className="pl-8">→</span></a>        
          </div>
          <div className="float-right lg:translate-x-32 translate-x-20 -translate-y-8 lg:max-w-full max-w-96">
            <img src={hero} alt="Декор" className="" loading="lazy"/>
          </div>
        </section>
        {/* Хиты */}
          <section id="hits" className="py-8 lg:pt-0 pt-16 xl:block max-w-7xl mx-auto px-4" >
            <div className="flex flex-wrap lg:justify-between">
              <h2 className="font-serif lg:text-6xl text-4xl">Наши хиты</h2>
                <button onClick={()=>navigate('/catalogue')} className="group relative m-4">
                  <span className="hover:font-semibold duration-300 text-4xl lg:block hidden ">Полный каталог →</span>
                  <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
                </button>
            </div>
              <div className="mb-8">
                {!user && (
                  <div className="bg-cyan-50 rounded-3xl p-4 mt-4">
                    <p className="text-cyan-900">
                      Войдите в аккаунт, чтобы добавлять товары в корзину
                    </p>
                  </div>
                )}
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64" style={{ minHeight: '400px' }}>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Загрузка товаров...</p>
                </div>
              </div>
            ) : (
              <div className="bg-white/70 rounded-3xl lg:p-8 p-4 grid lg:grid-cols-10 grid-cols-2 gap-5">
                {products.map(product => (
                  <SoapProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <button onClick={()=>navigate('/catalogue')} className="group relative m-4">
              <span className="hover:font-semibold duration-300 text-4xl block lg:hidden">Полный каталог →</span>
              <span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-center bg-cyan-900 duration-300 group-hover:scale-x-100"></span>
            </button>
          </section>
          {/* Факты о компании */}
          <section className="py-8 max-w-7xl mx-auto px-4">
            <h2 className="text-center font-serif lg:text-6xl text-4xl">Почему выбирают нас</h2>
            <div className="text-center bg-white/70 rounded-3xl lg:p-12 p-4 mt-8 grid lg:grid-cols-5 gap-5">
              <div className="place-items-center lg:grid flex">
                <div className="bg-white p-4 rounded-full ">
                  <img src={icon_delivery} alt="Доставка" className="lg:m-2 w-24" loading="lazy"/>              
                </div>
                <div className="lg:text-center text-left ml-4">
                  <h3 className="lg:text-4xl text-2xl font-semibold lg:p-4">Доставка</h3>
                  <p className="text-cyan-600 lg:text-xl">Мы гарантируем быструю и бережную доставку по всей стране и за ее пределами.</p>
                </div>
              </div>
              <div className="place-items-center lg:grid flex">
                <div className="bg-white p-4 rounded-full">
                  <img src={icon_check} alt="Сертификат" className="lg:m-2 w-24" loading="lazy"/>              
                </div>
                <div className="lg:text-center text-left ml-4">
                  <h3 className="lg:text-4xl text-2xl font-semibold lg:p-4">Сертификат качества</h3>
                  <p className="text-cyan-600 lg:text-xl">Наша продукция регулярно проходит проверки качества и получает номинации в конкурсах.</p>
                </div>
              </div>
              <div className="place-items-center lg:grid flex">
                <div className="bg-white p-4 rounded-full">
                  <img src={icon_eco} alt="Эко-продукт" className="lg:m-2 w-24" loading="lazy"/>              
                </div>
                <div className="lg:text-center text-left ml-4">
                  <h3 className="lg:text-4xl text-2xl font-semibold lg:p-4">Натуральный состав</h3>
                  <p className="text-cyan-600 lg:text-xl">Мы используем только натуральные материалы и экологичный сотав, не наносящий вреда природе.</p>
                </div>
              </div>
              <div className="place-items-center lg:grid flex">
                <div className="bg-white p-4 rounded-full">
                  <img src={icon_gift} alt="Подарок" className="lg:m-2 w-24" loading="lazy"/>              
                </div>
                <div className="lg:text-center text-left ml-4">
                  <h3 className="lg:text-4xl text-2xl font-semibold lg:p-4">Идеальный подарок</h3>
                  <p className="text-cyan-600 lg:text-xl">Фигурное мыло ручной работы понравится и будет полезно всем, независимо от пола и возраста.</p>
                </div>
              </div>
              <div className="place-items-center lg:grid flex">
                <div className="bg-white p-4 rounded-full">
                  <img src={icon_support} alt="Поддержка" className="lg:m-2 w-24" loading="lazy"/>              
                </div>
                <div className="lg:text-center text-left ml-4">
                  <h3 className="lg:text-4xl text-2xl font-semibold lg:p-4">На связи 24/7</h3>
                  <p className="text-cyan-600 lg:text-xl">Сотрудники нашего сервисного центра всегда готовы помочь вам и ответить на любые вопросы.  </p>
                </div>
              </div>
            </div>
          </section>      
          {/* Отзывы */}
          <section className="py-16 max-w-7xl mx-auto px-4">
            <h2 className="text-center font-serif lg:text-6xl text-4xl">Отзывы наших заказчиков</h2>
            <div className="grid lg:grid-cols-3 gap-5 mt-8">
              <div className="bg-white/70 p-8 rounded-3xl grid grid-rows-3">
                <div className=" row-span-2 ">
                  <img src={icon_quote} alt="Ковычки" className="w-8 mb-4" loading="lazy"/>
                  <p className="text-xl text-cyan-600">Я вообще не думала, что мыло может так радовать! “Розовая глина” — это как маленький спа-день дома, кожа после него очень мягкая и нежная. А “Цветочный букет” пахнет так, будто тебе подарили охапку свежих цветов. Теперь из ванной вообще выходить не хочется!</p>              
                </div>
                <div className="flex items-center justify-between">
                  <div className="">
                    <div className="flex py-4">
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4 mx-1" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4 mx-1" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                    </div>
                    <p className="text-xl font-semibold">Анастасия</p>
                  </div>
                  <img src={user_anastasia} alt="Анастасия" className="rounded-full w-20" loading="lazy"/>
                </div>
              </div>
              <div className="bg-white/70 p-8 rounded-3xl grid grid-rows-3">
                <div className="row-span-2">
                  <img src={icon_quote} alt="Ковычки" className="w-8 mb-4 " loading="lazy"/>
                  <p className="text-xl text-cyan-600">Гайс, это не мыло, это моя новая персоналити. “Лавандовое облако” смывает не только грязь, но и эмоциональный урон после неудачных каток в валик. “Овсяное молочко” — литерали объятья в формате мыла. Кожа после него такая довольная, будто апнула имортала. За “Кокосовый рай” отдельный респект — очень вкусно, жаль что так мало *пускает пузыри изо рта*.</p>              
                </div>
                <div className="flex items-center justify-between">
                  <div className="">
                    <div className="flex py-4">
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4 mx-1" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4 mx-1" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                    </div>
                    <p className="text-xl font-semibold">Кристина</p>
                  </div>
                  <img src={user_kristina} alt="Кристина" className="rounded-full w-20" loading="lazy"/>
                </div>
              </div>
              <div className="bg-white/70 p-8 rounded-3xl grid grid-rows-3">
                <div className=" row-span-2">
                  <img src={icon_quote} alt="Ковычки" className="w-8 mb-4" loading="lazy"/>
                  <p className="text-xl text-cyan-600">Попробовала “Хвойный лес” и “Мятный бриз” — оба варианта приятно удивили качеством. У мыла хороший натуральный аромат без резкости, пена мягкая, кожу не сушит даже при ежедневном использовании. Особенно понравился “Мятный бриз” за ощущение свежести после душа. Видно, что продукт сделан аккуратно и с вниманием к деталям.</p>              
                </div>
                <div className="flex items-center justify-between">
                  <div className="">
                    <div className="flex py-4">
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4 mx-1" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4 mx-1" loading="lazy"/>
                      <img src={icon_star} alt="Звезда" className="w-4" loading="lazy"/>
                    </div>
                    <p className="text-xl font-semibold">Наталья</p>
                  </div>
                  <img src={user_natalia} alt="Наталья" className="rounded-full w-20" loading="lazy"/>
                </div>
              </div>
            </div>
          </section>
          {/* Форма подписки */}
          <section className="py-16 max-w-7xl mx-auto px-4">
            <div className="relative">
              <img src={bubble} alt="Пузырь" className="absolute lg:w-40 w-24 opacity-70 lg:top-12 -top-12 left-6" loading="lazy"/>
              <img src={bubble} alt="Пузырь" className="absolute lg:w-24 w-16 lg:right-24 -right-4 opacity-70 lg:-top-4 top-24" loading="lazy"/>
              <img src={shell} alt="Ракушка" className="absolute lg:w-48 w-20 drop-shadow-lg right-2 lg:top-36 top-60" loading="lazy"/>
            </div>        
            <div className="bg-cyan-100/70 rounded-3xl lg:p-12 px-4 py-12 lg:flex justify-center items-center lg:gap-16">
              <div className="">
                <h3 className="lg:text-3xl font-serif pb-4">Будьте в курсе новинок<br/> и специальных предложений</h3>
                <p className="lg:text-2xl text-cyan-600">Подпишитесь на нашу рассылку и получите<br/> скидку 10% на первый заказ.</p>
              </div>
              <div className="">
                <div className="lg:text-2xl bg-white rounded-full flex m-2 justify-between">
                  <input type="text" className="rounded-l-full lg:py-4 lg:px-8 py-2 px-4 w-full" placeholder="Ваш e-mail"/>
                  <button className="lg:py-4 lg:px-8 py-2 px-4 bg-cyan-600 rounded-full text-white">Подписаться</button>
                </div>
                <div className="flex lg:justify-start lg:ml-6 justify-center">
                  <input type="checkbox" className="mx-2" />
                  <p className="">Я принимаю условия рассылки</p>
                </div>              
              </div>
            </div>
          </section>  
      </main>
    {/* Подвал */}
    <Footer/>
    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default HomePage;
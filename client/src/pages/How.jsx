import React from "react"
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import SEO from '../components/SEO';

const How = () => {
  return (
    <div>
      <SEO 
        title="Как сделать заказ"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />	
      <Header />
      <UpButton />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="font-serif text-6xl">Как сделать заказ</h1>
        <section className="bg-white/70 p-8 my-4 rounded-3xl">
          <div className="lg:flex lg:text-left text-center place-items-center">
            <div className="bg-white w-24 h-24 text-center place-content-center rounded-full text-7xl font-semibold m-8">1</div>
            <div className="place-content-center">
              <h3 className="text-3xl font-semibold">Регистрация</h3>
              <p className="text-2xl text-cyan-600">Создайте аккаунт или войдите в уже существующий.</p>
            </div>
          </div>
          <hr className="border-cyan-900/30" />
          <div className="lg:flex lg:text-left text-center place-items-center">
            <div className="bg-white w-24 h-24 text-center place-content-center rounded-full text-7xl font-semibold m-8">2</div>
            <div className="place-content-center">
              <h3 className="text-3xl font-semibold">Выбор</h3>
              <p className="text-2xl text-cyan-600">Перейдите в каталог, выберите понравившиеся товары и добавьте их в корзину.</p>
            </div>
          </div>
          <hr className="border-cyan-900/30" />
          <div className="lg:flex lg:text-left text-center place-items-center">
            <div className="bg-white w-24 h-24 text-center place-content-center rounded-full text-7xl font-semibold m-8">3</div>
            <div className="place-content-center">
              <h3 className="text-3xl font-semibold">Покупка</h3>
              <p className="text-2xl text-cyan-600">Перейдите в корзину, проверьте количество и сумму покупки. Заполните данные доставки, выберите способ оплаты и подтвердите заказ.</p>
            </div>
          </div>
          <hr className="border-cyan-900/30" />
          <div className="lg:flex lg:text-left text-center place-items-center">
            <div className="bg-white w-24 h-24 text-center place-content-center rounded-full text-7xl font-semibold m-8">4</div>
            <div className="place-content-center">
              <h3 className="text-3xl font-semibold">Готово!</h3>
              <p className="text-2xl text-cyan-600">Поздравляем! Ваш заказ оформлен и находится на стадии обработки.</p>
            </div>
          </div>
          <hr className="border-cyan-900/30" />
          <div className="lg:flex lg:text-left text-center place-items-center">
            <div className="bg-white w-24 h-24 text-center place-content-center rounded-full text-7xl font-semibold m-8">?</div>
            <div className="place-content-center">
              <h3 className="text-3xl font-semibold">История заказов</h3>
              <p className="text-2xl text-cyan-600">Историю заказов и детали вы можете посмотреть в профиле.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />   
    </div>
  )
}

export default How
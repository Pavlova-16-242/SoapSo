import React from "react"
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import SEO from '../components/SEO';

const Pay = () => {
  return (
    <div>
      <SEO 
        title="Оплата и доставка"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />	
      <Header />
      <UpButton />
      <main className="max-w-7xl mx-auto px-4 py-16 ">
        <h1 className="font-serif text-6xl">Доставка и оплата</h1>
        <section className="bg-white/70 p-8 my-4 rounded-3xl">
          <h3 className="text-3xl font-semibold">Упаковка</h3>
          <p className="border-l-2 border-cyan-900 p-4 text-2xl text-cyan-600">Мы знаем, как важно, чтобы хрупкое мыло ручной работы дошло в целости. Поэтому мы используем только бережную упаковку (пупырчатая пленка + крафтовая коробка).</p>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Способы доставки</h3>
          <ul className="text-2xl text-cyan-600">
            <li className="pt-4">● Курьер по городу (Владивосток) — 300 Р.</li>
            <p className="px-5">Доставляем в течение 1-2 дней после оформления заказа. Курьер предварительно позвонит.</p>
            <li className="pt-4">● Пункты выдачи (Wildberries / Sdek) — 200 Р.</li>
            <p className="px-5">Более 100 точек по городу. Уведомление о приходе придет в SMS.</p>
            <li className="pt-4">● Почта России — от 250 Р.</li>
            <p className="px-5">Отправляем во все города РФ. Срок — от 3 до 7 дней. Трек-номер пришлем сразу после отправки.</p>
            <li className="pt-4">● Самовывоз — бесплатно.</li>
            <p className="px-5">Наша мастерская находится по адресу: ул. Цветочная, д. 10 (предварительно согласуйте время).</p>
          </ul>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Сроки обработки заказа</h3>
          <p className="text-2xl text-cyan-600 pt-4">Так как мыло готовится вручную, на формирование заказа уходит 1–2 рабочих дня.</p>
          <p className="text-2xl text-cyan-600 pt-4">Если мыло есть в наличии на складе — отгружаем в день заказа (до 15:00).</p>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Способы оплаты</h3>
          <p className="text-2xl text-cyan-600">Мы принимаем несколько видов оплаты для вашего удобства:</p>
          <ul className="text-2xl text-cyan-600">
            <li className="pt-4">● По QR-коду СБП (Система быстрых платежей) — без комиссии.</li>
            <li className="pt-4">● Наличными курьеру (с точной сдачей).</li>
          </ul>
        </section>
      </main>
      <Footer />   
    </div>
  )
}

export default Pay
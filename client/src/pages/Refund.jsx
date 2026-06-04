import React from "react"
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import SEO from '../components/SEO';

const Refund = () => {
  return (
    <div>
      <SEO 
        title="Возврат и обмен"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />	
      <Header />
      <UpButton />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="font-serif text-6xl">Возврат и обмен</h1>
        <section className="bg-white/70 p-8 my-4 rounded-3xl">
          <h2 className="text-3xl font-semibold">Забота о вас</h2>
          <p className="border-l-2 border-cyan-900 p-4 text-2xl text-cyan-600">По закону «О защите прав потребителей», мыло ручной работы относится к косметическим средствам и товарам ненадлежащего качества (Постановление Правительства №2463, перечень непродовольственных товаров надлежащего качества, не подлежащих возврату). В связи с этим, при возникновении необходимости возврата или обмена, каждый случай рассматривается индивидуально!</p>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Когда вернуть деньги или обменять мыло МОЖНО:</h3>
          <ul className="text-2xl text-cyan-600">
            <li className="pt-4">● Брак: у мыла явный дефект (скол, трещина, чужой волос, следы плесени).</li>
            <li className="pt-4">● Несоответствие: вместо «Лаванды» вы получили «Мятное» или не тот вес (например, заказали 100 г, а получили 80 г).</li>
            <li className="pt-4">● Проблемы с доставкой: мыло растаяло (случается в жару), разбилось при пересылке — обязательно снимите видео распаковки!</li>
          </ul>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Сроки и условия:</h3>
          <ul className="text-2xl text-cyan-600">
            <li className="pt-4">● Вы должны сообщить о проблеме в течение 7 календарных дней с момента получения заказа.</li>
            <li className="pt-4">● Напишите нам на почту: soap50@gmail.com (тема: «Возврат — Заказ №123») и приложите фото брака.</li>
            <li className="pt-4">● Мы вернем деньги или отправим новое мыло бесплатно в течение 10 дней после получения бракованного образца (если нужно его изучить).</li>
          </ul>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Когда вернуть деньги НЕЛЬЗЯ (обмен также не производится):</h3>
          <ul className="text-2xl text-cyan-600">
            <li className="pt-4">● Мыло просто не понравилось по запаху (запах — субъективная штука).</li>
            <li className="pt-4">● Вы хранили его в луже или уронили в ванной сами (механические повреждения от использования).</li>
            <li className="pt-4">● Прошло больше 14 дней.</li>
            <li className="pt-4">● Мыло на 100% качественное, но вам кажется, что кусочек маловат (вес мыла ручной работы всегда может отличаться на ±5 г).</li>
          </ul>
          <hr className="border-cyan-900/30 my-4" />
          <h3 className="text-3xl font-semibold">Алгоритм возврата</h3>
          <ul className="text-2xl text-cyan-600">
            <li className="pt-4">1. Отправляете фото брака на почту.</li>
            <li className="pt-4">2. Мы согласовываем возврат.</li>
            <li className="pt-4">3. Вы отправляете мыло обратно (если дефект очевиден — мы можем оплатить обратную доставку, запросите промокод).</li>
            <li className="pt-4">4. Получаете деньги на ту же карту, с которой платили.</li>
          </ul>
          <hr className="border-cyan-900/30 my-4" />
          <p className="border-l-2 border-cyan-900 p-4 text-2xl text-cyan-600">P.S. Мы не хотим, чтобы у вас осталось плохое впечатление. Если вы все же очень расстроены, даже из-за аромата — напишите нам. В более чем 50% случаев мы идем навстречу.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Refund
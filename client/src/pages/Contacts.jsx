import React from "react"
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import hero from "../assets/image/hero.webp"
import location from "../assets/image/location.webp"
import SEO from '../components/SEO';

const Contacts = () => {


  return (
    <div>
      <SEO 
        title="Контакты"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />      
      <Header/>
      <UpButton/>
      <main className="">
        <div className="lg:flex justify-center m-8">
          <div className="gap-4">
            <h1 className="font-serif lg:text-6xl text-4xl">Контакты</h1>
            <p className="text-cyan-600 lg:text-4xl text-2xl py-4">Мы всегда на связи и готовы<br/> ответить на ваши вопросы</p>
            <img src={hero} alt="" className="" loading="lazy"/>
          </div>
          <div className="bg-white/70 rounded-3xl lg:p-12 p-4 mt-8 gap-5">
            <div className="place-items-center flex">
              <div className="bg-white p-4 rounded-full ">
                <img src='' alt="" className="lg:m-2 w-24" loading="lazy"/>              
              </div>
              <div className="ml-4">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">Адрес</h3>
                <p className="text-cyan-600 lg:text-xl">г. Владивосток, ул. Шепеткова,<br/> дом 14, палата 13</p>
              </div>
            </div>
            <div className="place-items-center flex">
              <div className="bg-white p-4 rounded-full">
                <img src='' alt="" className="lg:m-2 w-24" loading="lazy"/>              
              </div>
              <div className="ml-4">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">Телефон</h3>
                <p className="text-cyan-600 lg:text-xl">+7 (800) 504-50-50</p>
                <p className="text-cyan-600 lg:text-xl">Пн-Пт с 9:00 до 18:00</p>
              </div>
            </div>
            <div className="place-items-center flex">
              <div className="bg-white p-4 rounded-full">
                <img src='' alt="" className="lg:m-2 w-24" loading="lazy"/>              
              </div>
              <div className="ml-4">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">E-mail</h3>
                <p className="text-cyan-600 lg:text-xl">soap50@gmail.com</p>
                <p className="text-cyan-600 lg:text-xl">Ответим в течении 24 часов</p>
              </div>
            </div>
            <div className="place-items-center flex">
              <div className="bg-white p-4 rounded-full">
                <img src='' alt="" className="lg:m-2 w-24" loading="lazy"/>              
              </div>
              <div className="ml-4">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">Telegram</h3>
                <p className="text-cyan-600 lg:text-xl">@SoapSo</p>
                <p className="text-cyan-600 lg:text-xl">Быстрые ответы и помощь</p>
              </div>
            </div>
            <div className="place-items-center flex">
              <div className="bg-white p-4 rounded-full">
                <img src='' alt="" className="lg:m-2 w-24" loading="lazy"/>              
              </div>
              <div className="ml-4">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">VKontakte</h3>
                <p className="text-cyan-600 lg:text-xl">@SoapSo</p>
                <p className="text-cyan-600 lg:text-xl">Новинки, акции, новости</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 bg-white/70 rounded-3xl lg:p-8 p-4 mx-8 items-center gap-4 mb-8">
          <div className="grid">
            <h3 className="text-3xl font-semibold font-serif mx-2">Напишите нам</h3>
            <p className="m-2 text-2xl text-cyan-600">Заполните форму и мы свяжемся с вами</p>
            <input type="text" className="m-2 rounded-full p-4" placeholder="Ваше имя"/>
            <input type="text" className="m-2 rounded-full p-4" placeholder="E-mail"/>
            <input type="text" className="m-2 rounded-2xl h-20  p-4" placeholder="Cooбщение"/>
            <button className="m-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-900 p-4">Отправить сообщение</button>
          </div>
          <div className=""><img src={location} alt="" className="rounded-2xl" loading="lazy"/></div>
        </div>
      </main>
      <Footer/>      
    </div>
  )
}

export default Contacts
import React, { useState } from "react"
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"
import hero from "../assets/image/hero.webp"
import location from "../assets/image/location.webp"
import mail from "../assets/icon/mail.webp"
import geo from "../assets/icon/geo.webp"
import phone from "../assets/icon/phone.webp"
import telegram from "../assets/icon/telegram.webp"
import vkontakte from "../assets/icon/vkontakte.webp"
import SEO from '../components/SEO'
import { useToast } from '../components/Toast';
import { contactAPI } from '../services/api';

const Contacts = () => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
          await contactAPI.sendMessage(formData.name, formData.email, formData.message);
          addToast('Сообщение отправлено. Служба поддержки свяжется с вами в течение 24 часов.');
          setFormData({ name: '', email: '', message: '' });
      }
  };

  return (
    <div>
      <SEO 
        title="Контакты"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />      
      <Header/>
      <UpButton/>
      <main className="max-w-7xl mx-auto">
        <div className="lg:flex justify-center m-8">
          <div className="">
            <h1 className="font-serif lg:text-6xl text-4xl">Контакты</h1>
            <p className="text-cyan-600 lg:text-4xl text-2xl py-4">Мы всегда на связи и готовы<br/> ответить на ваши вопросы</p>
            <img src={hero} alt="Декор" className="" loading="lazy"/>
          </div>
          <div className="border border-white bg-white/70 rounded-3xl lg:p-6 p-4 mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white lg:p-6 p-4 rounded-full lg:w-32 lg:h-32 place-self-center shadow-md">
                <img src={geo} alt="Адрем" className="lg:m-2 lg:w-16 w-8 place-self-center" loading="lazy"/>              
              </div>
              <div className="ml-4 col-span-2">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">Адрес</h3>
                <p className="text-cyan-600 lg:text-xl">г. Владивосток, ул. Шепеткова, дом 14, палата 13</p>
              </div>

              <div className="bg-white lg:p-6 p-4 rounded-full lg:w-32 lg:h-32 place-self-center shadow-md">
                <img src={phone} alt="Телефон" className="lg:m-2 place-self-center w-16" loading="lazy"/>              
              </div>
              <div className="ml-4 col-span-2">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">Телефон</h3>
                <p className="text-cyan-600 lg:text-xl">+7 (800) 504-50-50</p>
                <p className="text-cyan-600 lg:text-xl">Пн-Пт с 9:00 до 18:00</p>

            </div>
              <div className="bg-white lg:p-6 p-4 rounded-full lg:w-32 lg:h-32 place-self-center shadow-md">
                <img src={mail} alt="Почта" className="lg:m-2 w-16 place-self-center" loading="lazy"/>              
              </div>
              <div className="ml-4 col-span-2">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">E-mail</h3>
                <p className="text-cyan-600 lg:text-xl">soap50@gmail.com</p>
                <p className="text-cyan-600 lg:text-xl">Ответим в течении 24 часов</p>
            </div>
              <div className="bg-white lg:p-6 p-4 rounded-full lg:w-32 lg:h-32 place-self-center shadow-md">
                <img src={telegram} alt="Telegram" className="lg:m-2 w-16 place-self-center" loading="lazy"/>              
              </div>
              <div className="ml-4 col-span-2">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">Telegram</h3>
                <p className="text-cyan-600 lg:text-xl">@SoapSo</p>
                <p className="text-cyan-600 lg:text-xl">Быстрые ответы и помощь</p>
              </div>
              <div className="bg-white lg:p-6 p-4 rounded-full lg:w-32 lg:h-32 place-self-center shadow-md">
                <img src={vkontakte} alt="VKontakte" className="lg:m-2 w-16 place-self-center" loading="lazy"/>              
              </div>
              <div className="ml-4 col-span-2">
                <h3 className="lg:text-4xl text-2xl font-semibold py-4">VKontakte</h3>
                <p className="text-cyan-600 lg:text-xl">@SoapSo</p>
                <p className="text-cyan-600 lg:text-xl">Новинки, акции, новости</p>
            </div>
          </div>
        </div>
        <div className="border border-white grid lg:grid-cols-2 bg-white/70 rounded-3xl lg:p-8 p-4 mx-8 items-center gap-4 mb-8">
          <form onSubmit={handleSubmit} className="grid">
            <h3 className="text-3xl font-semibold font-serif mx-2">Напишите нам</h3>
            <p className="m-2 text-2xl text-cyan-600">Заполните форму и мы свяжемся с вами</p>
            <input
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required            
            className="m-2 rounded-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" 
            placeholder="Ваше имя"/>
            <input 
            type="email" 
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
            className="m-2 rounded-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" 
            placeholder="your@email.com"/>
            <input 
            type="text" 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="m-2 rounded-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" 
            placeholder="Ваше сообщение..."/>
            <button  type="submit" className="m-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-900 p-4 duration-300">Отправить сообщение</button>
          </form>
          <div className=""><img src={location} alt="Карта" className="rounded-2xl shadow-md" loading="lazy"/></div>
        </div>
      </main>
      <Footer/>      
    </div>
  )
}

export default Contacts
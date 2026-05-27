import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

import sorry from "../assets/icon/sorry.webp"


const NotFoundPage = () => {
    return (
      <div>
        <Header/>
        <section className=" text-center place-content-center">
          <img src={sorry} alt="" className="place-self-center w-2/5" />
          <h2 className="text-8xl">Страница не найдена</h2>
          <p className="text-2xl text-cyan-600 pb-32">Извините, такой страницы не существует или она еще не готова к посещению.</p>
          <button className="">← Вернуться на главную</button>
        </section>
        <Footer/>
      </div>
    );
};

export default NotFoundPage;
import React from 'react';
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useNavigate } from 'react-router-dom';
import sorry from "../assets/icon/sorry.webp"
import SEO from '../components/SEO';

const NotFoundPage = () => {
  const navigate = useNavigate()
    return (
      <div>
      <SEO 
        title="404"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />        
        <Header/>
        <main className=" text-center place-content-center">
          <img src={sorry} alt="" className="place-self-center w-2/5" loading="lazy"/>
          <h1 className="text-8xl">Страница не найдена</h1>
          <p className="text-2xl text-cyan-600 p-4">Извините, такой страницы не существует или она еще не готова к посещению.</p>
          <button onClick={()=>navigate('/')} className="text-2xl text-white rounded-full bg-cyan-600 hover:bg-cyan-900 px-8 py-4 mb-16">← Вернуться на главную</button>
        </main>
        <Footer/>
      </div>
    );
};

export default NotFoundPage;
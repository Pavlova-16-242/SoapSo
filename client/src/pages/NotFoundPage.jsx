import React from 'react';
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  const navigate = useNavigate()
    return (
      <div>
      <SEO 
        title="Страница не найдена"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />        
        <Header/>
        <main className="text-center place-content-center">
          <h1 className="text-9xl font-black pt-32">404</h1>
          <h2 className="text-5xl">Страница не найдена</h2>
          <button onClick={()=>navigate('/')} className="text-2xl text-white rounded-full bg-cyan-600 hover:bg-cyan-900 px-8 py-4 m-32">← Вернуться на главную</button>
        </main>
        <Footer/>
      </div>
    );
};

export default NotFoundPage;
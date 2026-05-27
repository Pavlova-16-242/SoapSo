import React from "react"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

import sorry from "../assets/icon/sorry.webp"
const Page404 = () => {
  return (
    <div>
      <Header/>
      <section className=" text-center place-content-center">
        <img src={sorry} alt="" className="place-self-center w-[400px]" />
        <h2 className="text-8xl">Страница не найдена</h2>
        <p className="text-2xl text-cyan-600 pb-32">Извините, такой страницы не существует или она еще не готова к посещению.</p>
      </section>
      <Footer/>
    </div>
  )
}

export default Page404
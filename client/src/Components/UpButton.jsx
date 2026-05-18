import React from "react"
import { useEffect, useState } from "react"

const UpButton = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0})
  };
  return (
    <div>
      <button onClick={scrollToTop}
        className={`z-10 text-3xl fixed bottom-8 right-8 rounded-full lg:w-16 lg:h-16 w-12 h-12 bg-cyan-900 text-white duration-300
          ${visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}>↑</button>
    </div>
  )
}

export default UpButton
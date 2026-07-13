import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import cookieImg from './assets/cookie.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [autoclickers, setAutoclickers] = useState(0);
  const autoCost = (autoclickers + 1) ** 2 * 25;
  
  const purchaseMultiplier = () => {
  if (count >=  multiplier ** 2) {
    setCount(count - (multiplier ** 2));
    setMultiplier(multiplier + 1);
  }
  };
  const purchaseAuto = () => {
  if (count >= autoCost) {
    setCount(c => c - autoCost);
    setAutoclickers(a => a + 1);
  }
};

  useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + autoclickers*multiplier);
  }, 1000);

  return () => clearInterval(interval);
}, [autoclickers]);



  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={cookieImg} width="380" height = "380"  alt="Cookie" />
        </div>
        <div>
          <h1>Cookie Clicker</h1>
          <p>
          Multiplier: {multiplier}
          </p>
          <p>
          Autoclickers: {autoclickers}
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + multiplier)}
        >
          Cookies: {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        
        <div id="social">

          <h2>Shop</h2>
          <button
          type="button"
          onClick={() => purchaseMultiplier()}          

        >
          Increase Multiplier ({multiplier**2} Cookies)
        </button>

        <button
          type="button"
          onClick={() => purchaseAuto()}          

        >
          Autoclicker ({autoCost} Cookies)
        </button>
          
        </div>
        
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

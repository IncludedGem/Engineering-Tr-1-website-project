import { useState, useEffect } from 'react'
import cookieImg from './assets/cookie.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [autoclickers, setAutoclickers] = useState(0)
  const [maxActiveCookies, setMaxActiveCookies] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isGameOver, setIsGameOver] = useState(false)

  const [cookies, setCookies] = useState([])

  const autoCost = (autoclickers + 1) ** 2 * 25
  const extraCookieCost = maxActiveCookies * 50

  const getRandomPosition = () => {
    return {
      top: `${Math.floor(Math.random() * 75) + 10}%`,
      left: `${Math.floor(Math.random() * 80) + 10}%`,
    }
  }

  useEffect(() => {
    if (isGameOver) return

    setCookies((prevCookies) => {
      if (prevCookies.length < maxActiveCookies) {
        const needed = maxActiveCookies - prevCookies.length
        const newCookies = Array.from({ length: needed }, () => ({
          id: Math.random() + Date.now(),
          pos: getRandomPosition(),
        }))
        return [...prevCookies, ...newCookies]
      }
      return prevCookies
    })
  }, [maxActiveCookies, cookies.length, isGameOver])

  useEffect(() => {
    if (isGameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameOver])

  useEffect(() => {
    if (isGameOver || autoclickers === 0) return

    const interval = setInterval(() => {
      setCount((c) => c + autoclickers * multiplier)
    }, 1000)

    return () => clearInterval(interval)
  }, [autoclickers, multiplier, isGameOver])

  const handleCookieClick = (id) => {
    if (isGameOver) return

    setCount((prev) => prev + multiplier)

    setCookies((prevCookies) =>
      prevCookies.map((cookie) =>
        cookie.id === id ? { ...cookie, pos: getRandomPosition() } : cookie
      )
    )
  }

  const purchaseMultiplier = () => {
    const cost = multiplier ** 2
    if (count >= cost) {
      setCount((c) => c - cost)
      setMultiplier((m) => m + 1)
    }
  }

  const purchaseAuto = () => {
    if (count >= autoCost) {
      setCount((c) => c - autoCost)
      setAutoclickers((a) => a + 1)
    }
  }

  const purchaseExtraCookie = () => {
    if (count >= extraCookieCost) {
      setCount((c) => c - extraCookieCost)
      setMaxActiveCookies((m) => m + 1)
    }
  }

  const cancelGame = () => {
    setIsGameOver(true)
  }

  const restartGame = () => {
    setCount(0)
    setMultiplier(1)
    setAutoclickers(0)
    setMaxActiveCookies(1)
    setTimeLeft(60)
    setIsGameOver(false)
    setCookies([])
  }

  return (
    <>
      <section id="center">
        <div className="header-stats">
          <h1>Cookie Clicker</h1>
          
          <div className="timer-container">
            <div className="timer-badge">
              ⏱️ Time Remaining: <strong>{timeLeft}s</strong>
            </div>
            
            {!isGameOver && (
              <button className="cancel-btn" onClick={cancelGame}>
                Cancel Game
              </button>
            )}
          </div>

          <p>Multiplier: {multiplier}x</p>
          <p>Autoclickers: {autoclickers}</p>
          <p>Active Cookies: {maxActiveCookies}</p>
        </div>

        <div className="counter">
          Cookies Collected: {count}
        </div>

        <div className="game-arena">
          {isGameOver ? (
            <div className="game-over-overlay">
              <h2> Time's Up!</h2>
              <p>You collected <strong>{count}</strong> cookies!</p>
              <button className="restart-btn" onClick={restartGame}>
                Play Again
              </button>
            </div>
          ) : (
            cookies.map((cookie) => (
              <button
                key={cookie.id}
                className="cookie-btn"
                style={{ top: cookie.pos.top, left: cookie.pos.left }}
                onClick={() => handleCookieClick(cookie.id)}
              >
                <img src={cookieImg} alt="Cookie" className="cookie-img" />
              </button>
            ))
          )}
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="social">
          <h2>Shop</h2>
          <div className="shop-buttons">
            <button
              type="button"
              disabled={count < multiplier ** 2 || isGameOver}
              onClick={purchaseMultiplier}
            >
              Increase Multiplier ({multiplier ** 2} Cookies)
            </button>

            <button
              type="button"
              disabled={count < autoCost || isGameOver}
              onClick={purchaseAuto}
            >
              Autoclicker ({autoCost} Cookies)
            </button>

            <button
              type="button"
              disabled={count < extraCookieCost || isGameOver}
              onClick={purchaseExtraCookie}
            >
              Extra Cookie on Screen ({extraCookieCost} Cookies)
            </button>
          </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="radha-container">
      <div className="radha-content">
        <h1 className="radha-title">🙏 Radhe Radhe 🙏</h1>
        <div className="counter-card">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="counter-button"
          >
            Count: {count}
          </button>
          <button 
            onClick={() => setCount(0)}
            className="reset-button"
          >
            Reset
          </button>
        </div>
        <p className="devotion-text">
          ✨ Radha Krishna Counter ✨
        </p>
      </div>
    </div>
  )
}

export default App

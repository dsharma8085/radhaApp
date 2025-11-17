import { useState, useRef, useEffect } from 'react'
import './App.css'
import RADHA_MUSIC_URL from './audio/radhe.mp3'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Wallpaper from './components/Wallpaper';
import Quotes from './components/Quotes';
import Festivals from './components/Festivals';
import Aarti from './components/Aarti';
import Mantra from './components/Mantra';
import Tools from './components/Tools';
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';

function getRandomColor() {
  const colors = [
    '#FF69B4', '#FFD700', '#00BFFF', '#32CD32', '#FF4500', '#8A2BE2', '#FF6347', '#40E0D0', '#FF1493', '#00FF7F', '#FFA500', '#1E90FF', '#DC143C', '#00CED1', '#FFB6C1', '#7FFF00', '#FF00FF', '#00FA9A', '#FF8C00', '#9932CC'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function DummyPage({ title, children }) {
  return (
    <div style={{maxWidth:600,margin:'2rem auto',background:'rgba(255,255,255,0.07)',borderRadius:16,padding:'2rem',boxShadow:'0 2px 8px rgba(102,126,234,0.08)'}}>
      <h2 style={{color:'#764ba2',fontWeight:'bold',marginBottom:'1rem'}}>{title}</h2>
      <div style={{fontSize:'1.1em',color:'#333'}}>{children}</div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(() => {
    const saved = sessionStorage.getItem('radhaCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [floatingTexts, setFloatingTexts] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [circleAnim, setCircleAnim] = useState(false);
  const [counterColor, setCounterColor] = useState('white');

  useEffect(() => {
    sessionStorage.setItem('radhaCount', count);
  }, [count]);

  // Remove floating text after animation
  useEffect(() => {
    if (floatingTexts.length === 0) return;
    const timer = setTimeout(() => {
      setFloatingTexts((texts) => texts.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [floatingTexts]);

  const handleCount = () => {
    setCount((c) => c + 1);
    setFloatingTexts((texts) => [
      ...texts,
      {
        id: Date.now(),
        color: getRandomColor(),
        left: Math.random() * 80 + 10, // 10% to 90% width
        top: Math.random() * 60 + 20, // 20% to 80% height
      }
    ]);
    // Do NOT play audio here
  };

  const handleReset = () => {
    setCount(0);
    sessionStorage.setItem('radhaCount', 0);
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    // Remove auto play on load
  }, []);

  // Make the whole app clickable except reset button
  const handleContainerClick = (e) => {
    // Prevent count if reset, play/pause button, or counter circle is clicked
    if (
      e.target.classList.contains('reset-button') ||
      e.target.classList.contains('counter-circle') ||
      (e.target.classList.contains('counter-button') && e.target.textContent.includes('भजन'))
    ) return;
    handleCount();
  };

  const handleCircleClick = () => {
    setCircleAnim(true);
    setCounterColor(getRandomColor());
    handleCount();
    setTimeout(() => setCircleAnim(false), 400);
  };

  return (
    <div>
      <Navbar />
      {/* Mobile top-right counter display */}
      <div className="mobile-count-display">{count}</div>
      <Routes>
        <Route path="/" element={
          <div className="radha-container" onClick={handleContainerClick}>
            <audio ref={audioRef} src={RADHA_MUSIC_URL} preload="auto" onEnded={() => setIsPlaying(false)} />
            {floatingTexts.map((text) => (
              <span
                key={text.id}
                className="floating-radha"
                style={{
                  color: text.color,
                  left: `${text.left}%`,
                  top: `${text.top}%`,
                }}
              >
                राधा राधा
              </span>
            ))}
            <div className="radha-content">
              <h1 className="radha-title">🙏 राधे राधे 🙏</h1>
              <button onClick={handlePlayAudio} className="counter-button" style={{marginBottom: '1rem'}}>
                {isPlaying ? '🔇 भजन बंद करें' : '🎵 राधा भजन सुनें'}
              </button>
              <div className="counter-card">
                <div
                  className={`counter-circle${circleAnim ? ' animate' : ''}`}
                  onClick={handleCircleClick}
                  style={{
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 30px rgba(102,126,234,0.4)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.4s cubic-bezier(.68,-0.55,.27,1.55), color 0.3s',
                    fontSize: '4em',
                    color: counterColor,
                    fontWeight: 'bold',
                    userSelect: 'none',
                  }}
                >
                  {count}
                </div>

              </div>
                              <button 
                  onClick={handleReset}
                  className="reset-button"
                  style={{marginTop: '1rem'}}
                >
                  पुनः शुरुआत
                </button>
            </div>
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/wallpaper" element={<Wallpaper />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/aarti" element={<Aarti />} />
        <Route path="/mantra" element={<Mantra />} />
      </Routes>
    </div>
  )
}

export default App

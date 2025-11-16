import { useState, useRef, useEffect } from 'react'
import './App.css'

// Radha music audio (royalty free, short sample)
const RADHA_MUSIC_URL = 'https://www.jiosaavn.com/album/radhe-radhe/-AUYWeZEoG0_';

function getRandomColor() {
  const colors = [
    '#FF69B4', '#FFD700', '#00BFFF', '#32CD32', '#FF4500', '#8A2BE2', '#FF6347', '#40E0D0', '#FF1493', '#00FF7F', '#FFA500', '#1E90FF', '#DC143C', '#00CED1', '#FFB6C1', '#7FFF00', '#FF00FF', '#00FA9A', '#FF8C00', '#9932CC'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function App() {
  const [count, setCount] = useState(() => {
    const saved = sessionStorage.getItem('radhaCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [floatingTexts, setFloatingTexts] = useState([]);
  const audioRef = useRef(null);

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
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleReset = () => {
    setCount(0);
    sessionStorage.setItem('radhaCount', 0);
  };

  useEffect(() => {
    // Play audio when app loads
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="radha-container">
      <audio ref={audioRef} src={RADHA_MUSIC_URL} preload="auto" />
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
        <p className='radha-title1'>राधा नाम जाप से भगवान कृष्ण की कृपा मिलती है, मन को शांति मिलती है और आर्थिक समृद्धि आती है। ब्रह्म मुहूर्त में जाप करना शुभ माना जाता है, और मंत्रों के अलावा राधा रानी के 28 नामों का जाप करना भी लाभदायक होता है।</p>
        <div className="counter-card">
          <button 
            onClick={handleCount}
            className="counter-button"
          >
            Count: {count}
          </button>
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            पुनः शुरुआत
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

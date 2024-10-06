import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import coinImage from '../images/coin.png'; // Ensure your coin image path is correct

const MAX_DOLLARS = 2000;
const REGENERATION_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const DollarAirdrop = () => {
  const [dollars, setDollars] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [totalDollars, setTotalDollars] = useState(0);
  const [tankLevel, setTankLevel] = useState(MAX_DOLLARS);
  const [username, setUsername] = useState('Loading...');
  const [userId, setUserId] = useState('');

  const handleMouseDown = (e) => {
    setIsPressed(true);
  };

  const handleMouseUp = (e) => {
    setIsPressed(false);
    if (tankLevel > 0) {
      const coinX = e.clientX;
      const coinY = e.clientY;

      const newDollar = {
        id: Date.now(),
        left: coinX - 15,
        top: coinY,
        animate: true,
      };

      setDollars((prevDollars) => {
        const updatedDollars = [...prevDollars, newDollar];
        localStorage.setItem('dollars', JSON.stringify(updatedDollars));
        return updatedDollars;
      });

      setTotalDollars((prevTotal) => {
        const newTotal = prevTotal + 10;
        localStorage.setItem('totalDollars', newTotal);
        return newTotal;
      });

      setTankLevel((prevLevel) => {
        const newLevel = Math.max(prevLevel - 10, 0);
        localStorage.setItem('tankLevel', newLevel);
        return newLevel;
      });
    }
  };

  useEffect(() => {
    const loadTelegramUserData = () => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
          const user = window.Telegram.WebApp.initDataUnsafe.user;
          if (user) {
            setUsername(user.username || 'N/A');
            setUserId(user.id);
          }
        }
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    loadTelegramUserData();

    const storedTotalDollars = parseInt(localStorage.getItem('totalDollars')) || 0;
    const storedTankLevel = parseInt(localStorage.getItem('tankLevel')) || MAX_DOLLARS;

    setTotalDollars(storedTotalDollars);
    setTankLevel(storedTankLevel);

    const interval = setInterval(() => {
      setTankLevel((prevLevel) => {
        const newLevel = Math.min(prevLevel + 10, MAX_DOLLARS);
        localStorage.setItem('tankLevel', newLevel);
        return newLevel;
      });
    }, REGENERATION_TIME / MAX_DOLLARS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const tankLevelPercentage = (tankLevel / MAX_DOLLARS) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.counter}>Dollars Collected: {totalDollars}</div>
      <img 
        src={coinImage} 
        alt="Coin" 
        style={isPressed ? styles.coinPressed : styles.coin} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
      />
      {dollars.map((dollar) => (
        <div 
          key={dollar.id} 
          style={{
            ...styles.dollar, 
            left: dollar.left, 
            top: dollar.top,
            animation: dollar.animate ? 'floatUp 2s ease forwards' : 'none',
            display: dollar.animate ? 'block' : 'none',
          }} 
        >
          {dollar.animate ? '+10' : null}
        </div>
      ))}
      <div style={styles.tank}>
        <div style={{ ...styles.loader, width: `${tankLevelPercentage}%` }} />
      </div>
      <Link
        to={{
          pathname: '/friends',
          state: { username, userId },
        }}
      >
       
      </Link>
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100vh); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  counter: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: '20px 0',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  tank: {
    position: 'absolute',
    bottom: '20px',
    width: '150px',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '20px 0',
  },
  loader: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#76c7c0',
    transition: 'width 0.5s ease',
  },
  coin: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.1s',
  },
  coinPressed: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) scale(0.95)',
    transition: 'transform 0.1s',
  },
  dollar: {
    position: 'absolute',
    fontSize: '30px',
    userSelect: 'none',
    pointerEvents: 'none',
  },
};

export default DollarAirdrop;
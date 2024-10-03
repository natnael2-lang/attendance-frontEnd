import React, { useState, useEffect } from 'react';
import coinImage from '../images/coin.png'; // Ensure your coin image path is correct

const MAX_DOLLARS = 2000;
const REGENERATION_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const DollarAirdrop = () => {
  const [dollars, setDollars] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [totalDollars, setTotalDollars] = useState(0); // Start with 0 dollars collected
  const [tankLevel, setTankLevel] = useState(MAX_DOLLARS); // Start tank full

  const handleMouseDown = (e) => {
    setIsPressed(true); // Set pressed state when mouse is down
  };

  const handleMouseUp = (e) => {
    setIsPressed(false); // Reset pressed state when mouse is released

    if (tankLevel > 0) {
      const coinX = e.clientX; // X coordinate of the click
      const coinY = e.clientY; // Y coordinate of the click

      const newDollar = {
        id: Date.now(), // Unique ID for each dollar sign
        left: coinX - 15, // Center the dollar sign
        top: coinY, // Start from the clicked position
      };

      setDollars((prevDollars) => [...prevDollars, newDollar]);
      setTotalDollars((prevTotal) => prevTotal + 10); // Increase dollar count
      setTankLevel((prevLevel) => Math.max(prevLevel - 10, 0)); // Decrease tank level
    }
  };

  useEffect(() => {
    // Set up regeneration timer to refill the tank over 2 hours
    const interval = setInterval(() => {
      setTankLevel((prevLevel) => Math.min(prevLevel + 10, MAX_DOLLARS)); // Refill tank level
    }, REGENERATION_TIME / MAX_DOLLARS); // Increment every (2 hours / MAX_DOLLARS) milliseconds

    return () => {
      clearInterval(interval); // Cleanup interval on unmount
    };
  }, []);

  // Calculate the percentage of the tank filled
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
            animation: 'floatUp 2s ease forwards', // Upward animation
          }} 
        >
          +10
        </div>
      ))}
      <div style={styles.tank}>
        <div style={{ ...styles.loader, width: `${tankLevelPercentage}%` }} />
      </div>
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100vh); } /* Move out of the viewport */
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
    bottom: '20px', // Position the tank at the bottom with some margin
    width: '150px', // Width of the tank (narrower)
    height: '30px', // Height of the tank
    backgroundColor: '#e0e0e0', // Tank background color
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '20px 0'
  },
  loader: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#76c7c0', // Loader color
    transition: 'width 0.5s ease', // Smooth transition for sliding effect
  },
  coin: {
    position: 'absolute',
    width: '100px', // Adjust the size as necessary
    height: '100px', // Adjust the size as necessary
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)', // Center the coin
    transition: 'transform 0.1s', // Smooth transition for press effect
  },
  coinPressed: {
    position: 'absolute',
    width: '100px', // Adjust the size as necessary
    height: '100px', // Adjust the size as necessary
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) scale(0.95)', // Scale down for pressed effect
    transition: 'transform 0.1s', // Smooth transition for press effect
  },
  dollar: {
    position: 'absolute',
    fontSize: '30px', // Adjust the dollar sign size
    userSelect: 'none',
    pointerEvents: 'none', // Prevent mouse events on dollar signs
  },
};

export default DollarAirdrop;
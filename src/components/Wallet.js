import React, { useEffect, useState } from 'react';

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    
    // Simulate a network request with a timeout
    setTimeout(() => {
      localStorage.setItem('walletConnected', 'true');
      setIsConnected(true);
      setIsLoading(false);
    }, 1000); // Simulate a 1-second loading time
  };

  const handleDisconnect = () => {
    setIsLoading(true);

    // Simulate a disconnect process
    setTimeout(() => {
      localStorage.removeItem('walletConnected');
      setIsConnected(false);
      setIsLoading(false);
    }, 1000); // Simulate a 1-second loading time before disconnecting
  };

  useEffect(() => {
    // Check if the wallet is connected on component mount
    const connected = localStorage.getItem('walletConnected') === 'true';
    setIsConnected(connected);
  }, []);

  return (
    <div style={styles.container}>
      <h1>
        {isLoading 
          ? (isConnected ? 'Disconnecting...' : 'Connecting...') 
          : (isConnected ? 'Wallet Connected!' : 'Connect to Your Telegram Wallet')}
      </h1>
      {!isLoading && !isConnected ? (
        <button onClick={handleConnect} style={styles.button}>Connect to Telegram Wallet</button>
      ) : isConnected ? (
        <button onClick={handleDisconnect} style={styles.button}>Disconnect</button>
      ) : null}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default Wallet;
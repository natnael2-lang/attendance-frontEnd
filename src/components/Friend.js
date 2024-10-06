import React, { useEffect, useState } from 'react';

const Friends = () => {
    const [username, setUsername] = useState('Loading...');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Create and append the Telegram Web App script
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        document.body.appendChild(script);

        // Check if Telegram WebApp is available after the script has loaded
        script.onload = () => {
            if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
                console.log('Init Data Unsafe:', window.Telegram.WebApp.initDataUnsafe); // Log data for debugging
                const user = window.Telegram.WebApp.initDataUnsafe.user;

                if (user) {
                    setUsername(user.username || 'N/A');
                    setUserId(user.id);
                } else {
                    setUsername('User data not available.');
                    setUserId('User data not available.');
                }
            } else {
                setUsername('Telegram WebApp is not available.');
                setUserId('');
            }
        };

        // Cleanup function to remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f2f2f2',
            margin: 0,
        },
        userInfo: {
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.userInfo}>
                <h2>User Information</h2>
                <p>{username}</p>
                <p>{userId}</p>
            </div>
        </div>
    );
};

export default Friends;
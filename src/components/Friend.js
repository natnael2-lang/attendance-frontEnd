import React, { useEffect, useState } from 'react';

const Friends = () => {
    const [username, setUsername] = useState('Loading...');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        console.log('Telegram:', Telegram); // Log the Telegram object

        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
            console.log('Init Data Unsafe:', Telegram.WebApp.initDataUnsafe); // Log data for debugging
            const user = Telegram.WebApp.initDataUnsafe.user;

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
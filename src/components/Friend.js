import React, { useEffect, useState } from 'react';

const Friends = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setUserData(user);
            } else {
                setError("User data not available.");
            }
        } else {
            setError("Telegram Web App is not available.");
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Telegram User Information</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : userData ? (
                <div>
                    <h2>User Information</h2>
                    <p><strong>ID:</strong> {userData.id}</p>
                    <p><strong>First Name:</strong> {userData.first_name}</p>
                    <p><strong>Last Name:</strong> {userData.last_name}</p>
                    <p><strong>Username:</strong> {userData.username}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Friends;
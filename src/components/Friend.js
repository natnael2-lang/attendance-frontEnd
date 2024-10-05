import React, { useEffect, useState } from 'react';

const Friends = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check if the Telegram WebApp is available
        if (window.Telegram && window.Telegram.WebApp) {
            // Fetch user data from Telegram's Web Apps API
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            setUserData(user);
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Telegram User Information</h1>
            {userData ? (
                <div>
                    <h2>User Information</h2>
                    <p><strong>ID:</strong> {userData.id}</p>
                    <p><strong>First Name:</strong> {userData.first_name}</p>
                    <p><strong>Last Name:</strong> {userData.last_name}</p>
                    <p><strong>Username:</strong> {userData.username}</p>
                    {userData.photo_url && (
                        <img src={userData.photo_url} alt="User" style={{ borderRadius: '50%', width: '100px' }} />
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Friends;
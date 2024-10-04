import React, { useState } from 'react';
import "../CSS/Friend.css";

const Friends = () => {
    const [inviteLink, setInviteLink] = useState('');

    const handleInviteClick = async () => {
        try {
            const response = await fetch('/generate-invite-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.link) {
                setInviteLink(data.link); // Set the invite link
            } else {
                console.error('No link returned from the server');
            }
        } catch (error) {
            console.error('Error generating invite link:', error);
        }
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(inviteLink) // Copy the invite link to clipboard
            .then(() => {
                alert('Invite link copied to clipboard!'); // Alert to confirm copy
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="friend-container">
            <button onClick={handleInviteClick}>Generate Invite Link</button>
            {inviteLink && (
                <div className="invite-link-container">
                    <p>{inviteLink}</p>
                    <button onClick={handleCopyClick}>Copy</button>
                </div>
            )}
        </div>
    );
};

export default Friends;
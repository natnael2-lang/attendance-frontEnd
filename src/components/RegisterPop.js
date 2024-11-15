import "../CSS/RegisterPop.css";
import React from 'react';

const RegisterPop = ({ somethingWentWrong, networkError, loading }) => {
    return (
        <>
            {somethingWentWrong || networkError || loading ? (
                <div className="registerPopOverlay">
                    {loading && <p>Loading...</p>}
                    {somethingWentWrong && <p style={{ color: 'red' }}>{somethingWentWrong}</p>}
                    {networkError && <p style={{ color: 'red' }}>{networkError}</p>}
                </div>
            ) : null}
        </>
    );
};

export default RegisterPop;
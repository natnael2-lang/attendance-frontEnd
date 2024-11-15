import "../CSS/RegisterPop.css";
import React from 'react';

const RegisterPop = ({ somethingWentWrong, networkError, loading,success }) => {
    return (
        <>
            {somethingWentWrong || networkError || loading ||success ? (
                <div className="registerPopOverlay">
                    {loading && <p>Loading...</p>}
                    {somethingWentWrong && <p style={{ color: 'red' }}>{somethingWentWrong}</p>}
                    {networkError && <p style={{ color: 'red' }}>{networkError}</p>}
                    {success && <p style={{ color: 'green',fontSize:"20px" }}>"success"</p>}
                </div>
            ) : null}
        </>
    );
};

export default RegisterPop;
import React, { useState } from 'react';

const Signup = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    }

    const closePopup = () => {
        setPopupOpen(false);
    }

    return (
        <div className='popup-container'>
            <button type='button' className="popup-btn" onClick={openPopup}>Submit</button>
            {isPopupOpen && (
                <div className="popup open-popup">
                    <img src='404-tick.png' alt='Success' />
                    <h2>Thank You!</h2>
                    <p>Your details have been successfully submitted. Thanks</p>
                    <button type='button' className="popup-btn" onClick={closePopup}>OK</button>
                </div>
            )}
        </div>
    )
}

export default Signup;

// mongodb+srv://katrothanil:Anil123@@eventmanagementcluster.g8lo3a0.mongodb.net/
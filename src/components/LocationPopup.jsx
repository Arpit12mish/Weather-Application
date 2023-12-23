import React from 'react';
import './LocationPopup.css';
function LocationPopup({ onAllow, onDeny }) {
  return (
    <div className="location-popup">
      <p>Allow this app to access your location?</p>
      <button className='b1' onClick={onAllow}>Allow</button>
      <button className='b2' onClick={onDeny}>Deny</button>
    </div>
  );
}

export default LocationPopup;

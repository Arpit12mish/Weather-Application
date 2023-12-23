import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import './DeniedLocationPage.css';

const DeniedLocationPage = () => {
  return (
    <div className="denied-location-page">
      <FaExclamationCircle className="icon" />
      <p>We couldn't get your location. Please allow location access and try again.</p>
    </div>
  );
};

export default DeniedLocationPage;

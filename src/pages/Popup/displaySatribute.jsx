import React from 'react'
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import SatributeModal  from './satributeModal';


const DisplaySatribute = () => {

  const [showModal, setShowModal] = useState(false);

  const handleModalDisplay = () => {
    setShowModal(true);
  };

  const handleModalClear = () => {
    setShowModal(false);
  }

  return (
    <div className="satribute-options">
      <h1 className="options-heading">Display Satributes</h1>
      <FaInfoCircle className="info-icon" onClick={handleModalDisplay} />
      {showModal && <SatributeModal onClear={handleModalClear} />}
    </div>
  );
}

export default DisplaySatribute;
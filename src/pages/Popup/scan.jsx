import React, { useState, useEffect, useRef } from 'react';
import RarityDetails from './rarityDetails';
import Button from './button';

const Scan = () => {
  const [userAddress, setUserAddress] = useState("");
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [rarityData, setRarityData] = useState(null);
  const [showEnterAddress, setShowEnterAddress] = useState(true);

  const imageRef = useRef();

  useEffect(() => {
    if (rarityData) {
      setUserDataLoading(false);
      setShowEnterAddress(false);
    }
  }, [rarityData]);

  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  }

  const handleAddressSubmit = async (event) => {
    event.preventDefault();
    setUserDataLoading(true);
    try {
      const apiUrl = `https://gw.sating.io/api/account/stats/${userAddress}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRarityData(data);
      if(data) {
        imageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="address-container">
      {showEnterAddress && <h1 className="enter-address">Rare Satoshi Scanner</h1>}
      <form onSubmit={handleAddressSubmit} className="form-group">
        <div className="form-control">
          <input
            type="text"
            onChange={handleAddressChange}
            name="userAddress"
            className="input-container"
            placeholder="Enter Bitcoin Address"
          />
        </div>
        <Button
          type="submit"
          className="btn scan-button"
          disabled={userAddress.trim().length === 0}
        >
          Scan
        </Button>
      </form>
      {userDataLoading ? <h5 className="loading-text">scanning...</h5> : null}
      {rarityData && <RarityDetails ref={imageRef} data={rarityData} userAddress={userAddress} />}
    </div>
  );
};

export default Scan;

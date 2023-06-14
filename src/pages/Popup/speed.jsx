import React, { useEffect, useState } from 'react'
import logoLG from '../../assets/img/logo-lg.png';
import './css/style.css';

const Speed = () => {

  const [speedData, setSpeedData] = useState(null);
  const [blockData, setBlockData] = useState(null);
  const [mempoolData, setMempoolData] = useState(null);

  useEffect(() => {
      getData();
  }, [])

  const getData = () => {
    getSpeedData();
    getBlockData();
    getMempoolData()
  };

  const getSpeedData = async () => {
    try {
      const url = "https://mempool.space/api/v1/fees/recommended";
      const response = await fetch(url);
      const data = await response.json();
      setSpeedData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getBlockData = async () => {
    try {
      const url = "https://blockchain.info/q/eta";
      const response = await fetch(url);
      const data = await response.json();
      setBlockData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMempoolData = async () => {
    try {
      const url = "https://mempool.space/api/mempool";
      const response = await fetch(url);
      const data = await response.json();
      setMempoolData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(Math.round(seconds) / 60);
    const remainingSeconds = Math.round(Math.abs(seconds)) % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };


  return (
    <div className="speed-main-container inner-body-container">
      <div className="section-inner-container">
        <div className='top-header'>
          <div className='logo'>
            <img src={logoLG} alt='logo' />
          </div>
          <h1 className="options-heading">Mempool Quick Look</h1>
        </div>
        <div className='body-content'>
          <div className="speed-container">
            <div className="slow">
              <div className="slow-info info-box">
                {speedData ? <h4>{speedData.hourFee}</h4> : <h4>-- --</h4>}
                <p>sats/vB</p>
              </div>
              <p className="speed-title">Slow</p>
            </div>

            <div className="normal">
              <div className="normal-info info-box">
                {speedData ? <h4>{speedData.halfHourFee}</h4> : <h4>-- --</h4>}
                <p>sats/vB</p>
              </div>
              <p className="speed-title">Normal</p>
            </div>

            <div className="fast">
              <div className="fast-info info-box">
                {speedData ? <h4>{speedData.fastestFee}</h4> : <h4>-- --</h4>}
                <p>sats/vB</p>
              </div>
              <p className="speed-title">Fast</p>
            </div>
          </div>
          <div className="block-info-container">
            <div className="eta info-box">
              {blockData ? <h4>{formatTime(blockData)}</h4> : <h4>-- --</h4>}
              <p>{blockData < 0 ? "Block Overdue Time" : "ETA to Next Block"}</p>
            </div>

            <div className="mempool info-box">
              {mempoolData ? <h4>{mempoolData.count}</h4> : <h4>-- --</h4>}
              <p>Pending Tx in Mempool</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speed;
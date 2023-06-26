import React, { useState } from 'react'
import Button from './button';
import logoLG from '../../assets/img/logo-lg.png';
import './css/style.css';


const Settings = () => {

  const [statusChecked, setStatusChecked] = useState(false)
  const [versionOutdated, setVersionOutdated] = useState(false);

  const handleVersionCheck = async() => {
    const response = await fetch(
      "https://ocm9425.tools/satStats/app-version.json"
    );
    const data = await response.json();
    const latestVersion = String(data.version)
    const userVersion = chrome.runtime.getManifest().version;
    if(userVersion < latestVersion) {
        setVersionOutdated(true);
    }
    setStatusChecked(true);
  }  
  
  return (
    <div className="settings-container inner-body-container">
      <div className='top-header'>
        <div className="logo">
          <img src={logoLG} alt="logo" />
        </div>
      </div>
      <div className='body-content'>
        <div className="updates-container">
          <div className="updates-check">
            <h1>Check For Updates</h1>
            <Button
              className="prices-button check-button"
              onClick={handleVersionCheck}
            >
              Check
            </Button>
          </div>
          <div
            className={`update-btn-container ${
              statusChecked ? "visible" : "hidden"
            }`}
          >
            {versionOutdated ? (
              <h3>
                A new update has been released. Download the newest version from <a href="https://github.com/RabbiGains-eth/satStats" target="_blank">GitHub</a> or <a href="https://chrome.google.com/webstore/detail/satstats/onbiefmmngdpknejohhcpaeidieakejl" target="_blank">Chrome Store</a>
              </h3>
            ) : (
              <h3>Your version of satStats is up to date.</h3>
            )}
          </div>
        </div>
        <div className="status-cta">
          <p className="settings-version-label">satStats v1.2</p>
          <a href="https://twitter.com/satstatspro" target="_blank">@satStatsPro</a>
          <a href="https://satstats.pro" target="_blank">
            www.satstats.pro
          </a>
          <a href="mailto:hello@satstats.pro">hello@satstats.pro</a>
        </div>
      </div>
    </div>
  );
}

export default Settings
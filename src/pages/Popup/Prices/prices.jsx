import React, { useEffect, useState } from 'react';
import Brc20 from './Brc20/brc20';
import Collections from './Collections/collections';
import logoLG from '../../../assets/img/logo-lg.png';


const Prices = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("lastTab") || "BRC20"
  );
  const handleTabClicked = (tab) => {
    if(tab === "BRC20") {
        localStorage.setItem("lastTab", tab);
        const lastTab = localStorage.getItem("lastTab");
        setActiveTab(lastTab);
    } else if (tab === "Collections") {
        localStorage.setItem("lastTab", tab);
        const lastTab = localStorage.getItem("lastTab");
        setActiveTab(lastTab);
    }
  }
  return (
    <div className="inner-body-container price-body-container">
      <div className="section-inner-container">
        <div className='top-header'>
          <div className="logo">
            <img src={logoLG} alt="logo" />
          </div>
          {activeTab === "BRC20" && <Brc20 />}
          {activeTab === "Collections" && <Collections />}
        </div>
        <div className="tab-container">
          <div
            className={`tab-btn ${activeTab === "BRC20" ? "active" : ""}`}
            onClick={() => handleTabClicked("BRC20")}
          >
            BRC-20
          </div>
          <div
            className={`tab-btn ${activeTab === "Collections" ? "active" : ""}`}
            onClick={() => handleTabClicked("Collections")}
          >
            Collections
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prices;
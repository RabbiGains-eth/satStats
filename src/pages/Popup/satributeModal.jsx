import React from 'react';
import { RxCross1 } from 'react-icons/rx';

import Card from './card';
import first from "../../assets/icons/first.png"
import nakamoto from "../../assets/icons/nakamoto.png"
import palindrome from "../../assets/icons/palindrome.png"
import pizza from "../../assets/icons/pizza.png"
import vintage from "../../assets/icons/vintage.png"

const Backdrop = (props) => {
  return (
    <div className= "backdrop" onClick={props.onClear}>
      {' '}
    </div>
  );
};

const Overlay = (props) => {
  return (
    <Card className="modal">
      <div className="modal-header">
        <RxCross1 className="x-icon" onClick={props.onClear} />
      </div>

      <div className="modal-content-one">
        <h5 className="">Rodarmor Rarity Index</h5>
        <div className="radamor-rarity-scale">
          <div className="rrs-item uncommon-rarity">
            <div className="uncommon-heading">Uncommon</div>
            <p className="uncommon-text">
              1st sat of every new block <br />
              <span className="rarity-text-bold">(every 10 min)</span>
            </p>
          </div>

          <div className="rrs-item rare-rarity">
            <div className="rare-heading">Rare</div>
            <p className="rare-text">
              1st sat of difficulty adjustment<br />{' '}
              <span className="rarity-text-bold">(every 10 days)</span>
            </p>
          </div>

          <div className="rrs-item epic-rarity">
            <div className="epic-heading">Epic</div>
            <p className="epic-text">
              1st sat of every halving period <br />
              <span className="rarity-text-bold">(every 4 years)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="modal-content-two">
        <h5>Historical & Notable Sats</h5>
        <div class="satribute-icon-container">
          <div className="first-icon-container">
            <img src={first} alt="" className=" first-icon" />
            <div className="first-icon-info icon-info hide-icon-info">
              <div>First Transaction</div>
              <p>Sats from the first ever transaction of 10 BTC</p>
            </div>
          </div>

          <div className="nakamoto-icon-container">
            <img src={nakamoto} alt="" className="nakamoto-icon" />
            <div className="nakamoto-icon-info icon-info">
              <div>Nakamoto</div>
              <p>Sats mined by Satoshi Nakamoto himself</p>
            </div>
          </div>

          <div className="palindrome-icon-container">
            <img src={palindrome} alt="" className="palindrome-icon" />
            <div className="palindrome-icon-info icon-info hide-icon-info">
              <div>Palindrome</div>
              <p>Sats whose number is the same forwards and backwards</p>
            </div>
          </div>

          <div className="pizza-icon-container">
            <img src={pizza} alt="" className="pizza-icon" />
            <div className="pizza-icon-info icon-info hide-icon-info">
              <div>Pizza</div>
              <p>Sats used in the 10k BTC Pizza sale in 2010</p>
            </div>
          </div>

          <div className="vintage-icon-container">
            <img src={vintage} alt="" className="vintage-icon" />
            <div className="vintage-icon-info icon-info hide-icon-info">
              <div>Vintage</div>
              <p>Sats that were mined in the first 1,000 blocks</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};


const SatributeModal = (props) => {
  return (
    <>
      <Backdrop onClear={props.onClear} />
      <Overlay onClear={props.onClear} />
    </>
  );
};

export default SatributeModal;


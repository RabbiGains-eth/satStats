import React, { forwardRef } from 'react';
import SatingLogo from '../../assets/img/sating-logo.png';

const RarityDetails = (props, ref) => {
  const rarityData = props.data;

  return (
    <div className="result-container">
      <ul>
        <li>
          <span className="bold">Uncommon: </span>
          <span className="rarityAmt">
            {rarityData && rarityData.Rarity && rarityData.Rarity.uncommon
              ? rarityData.Rarity.uncommon
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Pizza: </span>
          <span className="rarityAmt">
            {rarityData &&
            rarityData.Interesting &&
            rarityData.Interesting.pizza
              ? rarityData.Interesting.pizza
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Rare: </span>
          <span className="rarityAmt">
            {rarityData && rarityData.Rarity && rarityData.Rarity.rare
              ? rarityData.Rarity.rare
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Vintage: </span>
          <span className="rarityAmt">
            {rarityData &&
            rarityData.Interesting &&
            rarityData.Interesting.vintage
              ? rarityData.Interesting.vintage
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Epic: </span>
          <span className="rarityAmt">
            {rarityData && rarityData.Rarity && rarityData.Rarity.epic
              ? rarityData.Rarity.epic
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">First Transaction: </span>
          <span className="rarityAmt">
            {rarityData &&
            rarityData.Interesting &&
            rarityData.Interesting['1st_transaction']
              ? rarityData.Interesting['1st_transaction']
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Legendary: </span>
          <span className="rarityAmt">
            {rarityData && rarityData.Rarity && rarityData.Rarity.legendary
              ? rarityData.Rarity.legendary
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Palin. Names: </span>
          <span className="rarityAmt">
            {rarityData &&
            rarityData.Interesting &&
            rarityData.Interesting.palindrome_name
              ? rarityData.Interesting.palindrome_name
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Mythic: </span>
          <span className="rarityAmt">
            {rarityData && rarityData.Rarity && rarityData.Rarity.mythic
              ? rarityData.Rarity.mythic
              : 0}
          </span>
        </li>
        <li>
          <span className="bold">Palin. Numbers: </span>
          <span className="rarityAmt">
            {rarityData &&
            rarityData.Interesting &&
            rarityData.Interesting.palindrome_integer
              ? rarityData.Interesting.palindrome_integer
              : 0}
          </span>
        </li>
      </ul>

      {props.data && (
        <div className="sating">
          Transfer and inscribe on your sats with one click at{' '}
          <a
            href={`https://sating.io/?addr=${props.userAddress}&ref=satStats`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sating.io
          </a>
          <a
            href={`https://sating.io/?addr=${props.userAddress}&ref=satStats`}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
          >
            <img src={SatingLogo} alt="Sating Logo" />
          </a>
        </div>
      )}
    </div>
  );
};

export default forwardRef(RarityDetails);

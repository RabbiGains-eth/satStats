import React, { forwardRef } from 'react';
import SatingLogo from '../../assets/img/sating-logo.png';

const RarityDetails = (props, ref) => {
  const rarityData = props.data.sats;

  return (
    <div className="result-container">
      <ul>
        <li>
          <span className="bold">Uncommon: </span>
          <span className="rarityAmt">
          {rarityData && rarityData.rarity && rarityData.rarity.uncommon
            ? rarityData.rarity.uncommon.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Pizza: </span>
          <span className="rarityAmt">
          {rarityData &&
          rarityData.interesting &&
          rarityData.interesting.ord_pizza &&
          rarityData.interesting.ord_pizza[0] &&
          rarityData.interesting.ord_pizza[0].list
            ? rarityData.interesting.ord_pizza[0].list.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Rare: </span>
          <span className="rarityAmt">
            {rarityData && rarityData.rarity && rarityData.rarity.rare
            ? rarityData.rarity.rare.length
            : 0}
          </span>
        </li>
        <li>
          <span className="bold">Vintage: </span>
          <span className="rarityAmt">
          {rarityData &&
          rarityData.interesting &&
          rarityData.interesting.ord_vintage &&
          rarityData.interesting.ord_vintage[0] &&
          rarityData.interesting.ord_vintage[0].list
            ? rarityData.interesting.ord_vintage[0].list.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Epic: </span>
          <span className="rarityAmt">
          {rarityData && rarityData.rarity && rarityData.rarity.epic
            ? rarityData.rarity.epic.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">First Transaction: </span>
          <span className="rarityAmt">
          {rarityData &&
          rarityData.interesting &&
          rarityData.interesting.ord_first_transaction &&
          rarityData.interesting.ord_first_transaction[0] &&
          rarityData.interesting.ord_first_transaction[0].list
            ? rarityData.interesting.ord_first_transaction[0].list.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Legendary: </span>
          <span className="rarityAmt">
          {rarityData && rarityData.rarity && rarityData.rarity.legendary
            ? rarityData.rarity.legendary.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Palin. Names: </span>
          <span className="rarityAmt">
          {rarityData &&
          rarityData.interesting &&
          rarityData.interesting.ord_palindromes_name &&
          rarityData.interesting.ord_palindromes_name[0] &&
          rarityData.interesting.ord_palindromes_name[0].list
            ? rarityData.interesting.ord_palindromes_name[0].list.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Mythic: </span>
          <span className="rarityAmt">
          {rarityData && rarityData.rarity && rarityData.rarity.mythic
            ? rarityData.rarity.mythic.length
            : 0}
            </span>
        </li>
        <li>
          <span className="bold">Palin. Numbers: </span>
          <span className="rarityAmt">
          {rarityData &&
          rarityData.interesting &&
          rarityData.interesting.ord_palindromes_integer &&
          rarityData.interesting.ord_palindromes_integer[0] &&
          rarityData.interesting.ord_palindromes_integer[0].list
          ? rarityData.interesting.ord_palindromes_integer[0].list.length
          : 0}
          </span>
          </li>
        </ul>

        {props.data && (
        <div className="sating">
          Transfer and inscribe on your sats with one click at{" "}
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

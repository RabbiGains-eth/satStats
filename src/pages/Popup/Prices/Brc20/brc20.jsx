import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import Brc20Table from "./brc20Table";
import Button from "../../button";
import LoadingSpinner from "../../spinner";

let allTickers = JSON.parse(localStorage.getItem("tickers")) || [];

const Brc20 = () => {
  const [currentTicker, setCurrentTicker] = useState("");
  const [tickerEntered, setTickerEntered] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [allFetchedData, setAllFetchedData] = useState([]);

  useEffect(() => {
    if (allTickers.length > 0) {
      const functionInvervalId = setInterval(getData, 120000);
      getData();
      return () => {
        clearInterval(functionInvervalId);
      };
    }
  }, []);

  useEffect(() => {
    if (tickerEntered) {
      if (allTickers.includes(currentTicker)) {
        return;
      } else {
        allTickers.push(currentTicker);
        localStorage.setItem("tickers", JSON.stringify(allTickers));
        getData();
      }
      setTickerEntered(false);
      setCurrentTicker("");
    }
  }, [currentTicker, tickerEntered]);

  const handleTickerChange = (event) => {
    const inputVal = event.target.value;
    const tickerRegex = /^[a-zA-Z0-9]{0,4}$/;
    if (tickerRegex.test(inputVal)) {
      setCurrentTicker(event.target.value);
    }
  };

  const handleTickerSumbit = (event) => {
    event.preventDefault();
    setTickerEntered(true);
  };

  const getData = async () => {
    setDataIsLoading(true);
    const mergedDataArray = [];
    for (let i = 0; i < allTickers.length; i++) {
      const ticker = allTickers[i];
      const priceUrl = `https://brc20api.bestinslot.xyz/v1/get_brc20_activity/${ticker}/4/1/ts_desc`;
      const volumeUrl = `https://brc20api.bestinslot.xyz/v1/get_brc20_ticker/${ticker}`;
      try {
        const priceResponse = await fetch(priceUrl);
        const priceData = await priceResponse.json();
        const price = priceData[0].unit_price;
        const slicedPrice = price.slice(0, price.indexOf("."));

        const volumeResponse = await fetch(volumeUrl);
        const volumeData = await volumeResponse.json();
        const volume = Number(volumeData.sales[0].sale_24h / 100000000)
          .toString()
          .slice(0, 4);

        const mergedData = {
          id: i,
          ticker: ticker,
          price: slicedPrice,
          volume: volume,
        };
        mergedDataArray.push(mergedData);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error);
        setDataIsLoading(false);
      }
    }
    setAllFetchedData(mergedDataArray);
  };

  const handleItemDelete = (ticker) => {
    const filteredTickers = allTickers.filter((tickers) => tickers !== ticker);
    allTickers = filteredTickers;
    localStorage.setItem("tickers", JSON.stringify(allTickers));
  };

  const handlePageRefresh = () => {
    getData();
  };

  return (
    <div>
      <h1 className="options-heading">BRC-20 Prices & Volume</h1>
      <form onSubmit={handleTickerSumbit} className="select-group">
        <input
          type="text"
          value={currentTicker}
          className="input-container"
          maxLength={4}
          onChange={handleTickerChange}
          placeholder="Enter Ticker"
        />
        <Button
          type="submit"
          className="prices-button add-button"
          disabled={currentTicker.trim().length < 4}
        >
          Add
        </Button>
        <BiRefresh className="refresh-icon" onClick={handlePageRefresh} />
      </form>
      {allFetchedData.length > 0 ? (
        dataIsLoading ? (
          <LoadingSpinner />
        ) : (
          <Brc20Table
            data={allFetchedData}
            setData={setAllFetchedData}
            onItemDelete={handleItemDelete}
          />
        )
      ) : (
        <div>
          {allTickers.length > 0 ? (
            <LoadingSpinner />
          ) : (
            <div className="price-instruction">
              <h4>Add a ticker to see some data.</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Brc20;

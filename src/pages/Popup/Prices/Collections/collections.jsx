import React, { useState, useEffect } from 'react'
import AsyncSelect from "react-select/async";
import { BiRefresh } from "react-icons/bi";

import Button from '../../button';
import CollectionTable from './collectionTable';
import LoadingSpinner from '../../spinner';

let storedCollectionTickers = JSON.parse(localStorage.getItem("collectionTickers")) || [];

const Collections = () => {
  const [returnedData, setReturnedData] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [dataRefreshed, setDataRefreshed] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);

  useEffect(() => {
    if (storedCollectionTickers.length > 0) {
      const collectionInvervalId = setInterval(() => {
        getCollectionData("localStorage");
      }, 120000);
      getCollectionData("localStorage");
      return () => {
        clearInterval(collectionInvervalId);
      };
    }
  }, []);

  let isBothCollectionStatesHavingValues = storedCollectionTickers.length > 0 || selectedCollections.length > 0;

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      width: "200px",
    }),
    option: (styles, state) => ({
      ...styles,
      maxWidth: "200px",
      color: state.isFocused ? "white" : "",
      fontSize: "12px",
      backgroundColor: state.isFocused ? "#ff8d00" : "",
      borderBottom: "1px solid grey",
      transition: "all ease-in-out 0.3s",
      cursor: "pointer"
    }),
  };

  const formatCollection = (data) => {
    const {
      floorPrice,
      name,
    } = data;

    if (storedCollectionTickers.length === 0 || !storedCollectionTickers.includes(name)) {
      storedCollectionTickers.push(name);
      localStorage.setItem(
        "collectionTickers",
        JSON.stringify(storedCollectionTickers)
      );
    }

    let parsedFloorPrice = Number(floorPrice)/ 100000000;
    let collection; 
    if(floorPrice !== null) {
      let slicedFloorPrice = parsedFloorPrice.toString().slice(0, 5);
      collection = {
        name: name,
        floorPrice: slicedFloorPrice,
      };
    } else {
      collection = {
        name: name, floorPrice: "N/A"
      }
    }

    if (currentCollection) {
      if(selectedCollections.some(collection => collection.name === currentCollection.name)) {
        return;
      } else {
        setSelectedCollections((prevCollections) => [
          ...prevCollections,
          collection,
        ]);
      }
    } else {
      return collection;
    }

  }
  const handleDataChange = option => {
    setCurrentCollection(option);
  }
  
  const searchOptionsLoad = async(queryValue, callback) => {
    try {
      const response = await fetch(
        "https://api-mainnet.magiceden.io/v2/ord/btc/popular_collections?limit=1000&window=7d"
      );
      const returnedData = await response.json();
      
      const filteredData = returnedData.filter((data) =>
        data.name.toLowerCase().includes(queryValue.toLowerCase())
      );
      setReturnedData(filteredData)
      callback(filteredData);
    } catch (error) {
        console.log(error)
    }
  }

  const handleAddCollection = () =>{
      formatCollection(currentCollection);
      setCurrentCollection(null);
      setDataRefreshed(false);
  }

  const handleDataRefresh = () => {
    getCollectionData("refresh");
  }

  const getCollectionData = async (eventType) => {
    setDataRefreshed(true);
    let mergedCollection = [];
    if(eventType === "refresh") {
      for (let i = 0; i < selectedCollections.length; i++) {
        const collectionName = selectedCollections[i].name;
        try {
          const response = await fetch(
            "https://api-mainnet.magiceden.io/v2/ord/btc/popular_collections?limit=1000&window=7d"
          );
          const returnedData = await response.json();

          const filteredData = returnedData.filter((data) =>
            data.name.toLowerCase().includes(collectionName.toLowerCase())
          );
          const collection = formatCollection(...filteredData);
          mergedCollection.push(collection);
          setDataRefreshed(false);
        } catch (error) {
          console.log(error);
          setDataRefreshed(false);
        }
      }
    } else if (eventType === "localStorage") {
        for (let i = 0; i < storedCollectionTickers.length; i++) {
          const collectionName = storedCollectionTickers[i];
          try {
            const response = await fetch(
              "https://api-mainnet.magiceden.io/v2/ord/btc/popular_collections?limit=1000&window=7d"
            );
            const returnedData = await response.json();

            const filteredData = returnedData.filter((data) =>
              data.name.toLowerCase().includes(collectionName.toLowerCase())
            );
            const collection = formatCollection(...filteredData);
            mergedCollection.push(collection);
            setDataRefreshed(false);
          } catch (error) {
            console.log(error);
            setDataRefreshed(false);
          }
        }  
    }
    setSelectedCollections(mergedCollection);
  };

  const handleItemDelete = (name) => {
    const filteredCollectionTickers = storedCollectionTickers.filter(
      (tickers) => tickers !== name
    );
    storedCollectionTickers = filteredCollectionTickers;
    localStorage.setItem(
      "collectionTickers",
      JSON.stringify(storedCollectionTickers)
    );
  };

  return (
    <div className="collections-container">
      <h1 className="options-heading">Collection Floor Prices</h1>
      <div className="select-group">
        <AsyncSelect
          loadOptions={searchOptionsLoad}
          getOptionLabel={(returnedData) => returnedData["name"]}
          getOptionValue={(returnedData) => returnedData["slug"]}
          onChange={handleDataChange}
          styles={selectStyles}
          noOptionsMessage={({ inputValue }) =>
            !inputValue
              ? "Start typing a collection name"
              : "No Sats collection found"
          }
          placeholder="Collection Name"
          // noOptionsMessage={() => "Start typing a collection name"}
          isClearable={true}
        />
        <Button
          type="submit"
          className="prices-button add-button"
          onClick={handleAddCollection}
          disabled={currentCollection === null}
        >
          Add
        </Button>
        <BiRefresh
          className="refresh-icon collections-refresh"
          onClick={handleDataRefresh}
        />
      </div>
      {isBothCollectionStatesHavingValues && (
        <div>
          {dataRefreshed ? (
            <LoadingSpinner />
          ) : (
            <CollectionTable
              data={selectedCollections}
              setData={setSelectedCollections}
              onItemDelete={handleItemDelete}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Collections;
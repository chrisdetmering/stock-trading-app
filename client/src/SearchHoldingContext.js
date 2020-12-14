import React, { useState, createContext } from 'react';
import axios from 'axios'

export const SearchHoldingContext = createContext();

export const SearchHoldingProvider = (props) => {
  const [selectedHolding, setSelectedHolding] = useState(null);


  const searchForHolding = async (symbol) => {
    try {
      const response = await axios.get(`api/stocks/search/?symbol=${symbol}`);
      setSelectedHolding(response.data);
    } catch (err) {
      console.error(err.message)
    }
  };

  return (
    <SearchHoldingContext.Provider
      value={searchForHolding, [selectedHolding, setSelectedHolding]}>
      {props.children}
    </SearchHoldingContext.Provider>
  )
}






import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import './Trade.css'
import { HoldingContext } from '../../HoldingContext'
import { createHolding, getHoldings, updateHolding } from '../../dbFunctions.js'
import Recommendations from './Recommendations'
import RenderSelectedHolding from './RenderSelectedHolding'
import Header from './Header'
import Form from './Form'

export default function Trade() {
  const [recommendedHoldings, setRecommendedHoldings] = useState([]);
  const [holdings, setHoldings] = useContext(HoldingContext);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const searchForHolding = async (symbol) => {
    try {
      const response = await axios.get(`api/stocks/search/?symbol=${symbol}`);
      setSelectedHolding(response.data);
    } catch (err) {
      console.error(err.message)
    }
  }

  function buyNewHolding(shares) {
    setHoldings(prevHoldings => {
      const matchingHolding = prevHoldings.find(
        (holding) => holding.symbol === selectedHolding.symbol
      );
      if (matchingHolding) {
        const matchIndex = prevHoldings.indexOf(matchingHolding);
        prevHoldings[matchIndex].shares = parseInt(prevHoldings[matchIndex].shares) + parseInt(shares);
        updateHolding(matchingHolding.holding_id, matchingHolding.shares);
      } else {
        const newShare = {
          symbol: selectedHolding.symbol,
          companyName: selectedHolding.companyName,
          shares: shares,
          price: selectedHolding.latestPrice,
          change: selectedHolding.change,
          changePercent: selectedHolding.changePercent,
        };
        prevHoldings.push(newShare);
        createHolding(newShare);
      }
      return prevHoldings
    })
    // setUserWallet(stockPrice);
    // setUserSharesAmount();
    // console.log(holdings)
  };

  const getRecommendations = async () => {
    await axios.get('/api/stocks/recommendation')
      .then((res) => {
        setRecommendedHoldings(res.data)
      })
      .catch((err) => {
        console.log("error username response client side", err);
      });
  }

  useEffect(() => {
    getRecommendations();
    getHoldings(setHoldings);
  }, [])

  console.log(holdings)
  return (
    <div className="container">
      <div className="trade-container">
        <Header />
        <Form searchForHolding={searchForHolding} />
        {/* <SelectedHolding /> */}

        {selectedHolding ?
          <RenderSelectedHolding
            holding={selectedHolding}
            buyNewHolding={buyNewHolding}
          />
          : null}

        <Recommendations
          recommendedHoldings={recommendedHoldings}
          searchForHolding={searchForHolding}
        />
      </div>
    </div>
  )
}

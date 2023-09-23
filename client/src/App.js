import React, { useState, useEffect } from 'react';
import axios from "axios";
import CountryStat from "./components/CountryStat";
import "./App.css";

function App() {

  const [userOrder, setUserOrder] = useState([]);
  const [statSet, setStatSet] = useState({});

  useEffect(() => {
    setStatSet({
      name: "Highest average temperature",
      rankings: [
        {
          rank: "38",
          cid: "AND",
          datum: "25.85"
        },
        {
          rank: "95",
          cid: "HUN",
          datum: "22.35"
        },
        {
          rank: "152",
          cid: "SVN",
          datum: "9.75"
        }
      ]
    })
  }, []);

  useEffect(() => {
    console.log(userOrder)
    if (userOrder.length === 3) {
      makeRequest();
      setUserOrder([]);
    }

  }, [userOrder]);


  const makeRequest = () => {
    const data = {};
    axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws/').then((response) => {
      console.log(response.data[0]);
      setStatSet(response.data[0]);
    });
  }

  const onCountrySelect = (cid) => {
    const addToOrder = userOrder.length < 3 && !userOrder.includes(cid);
    if (addToOrder) {
      setUserOrder([...userOrder, cid]);
    }
    const removeFromOrder = userOrder.length < 3 && userOrder[userOrder.length-1] === cid; 
    if (removeFromOrder) {
      setUserOrder(userOrder.slice(0, userOrder.length-1));
    }
  }

  return (
    <div className="App" >
      <div className="Question">{!!statSet.name ? statSet.name.toUpperCase() : ""}</div>
        {!!statSet.rankings && 
          <div className="CountryStatsContainer">
            <CountryStat 
              countryCode={statSet.rankings[0].cid} 
              key={statSet.rankings[0].cid} 
              userRanking={userOrder.indexOf(statSet.rankings[0].cid)+1} 
              onClick={() => onCountrySelect(statSet.rankings[0].cid)}
            />
            <div className="LeafContainer">
              <img src={require("./images/LeafUp.png")}/>
            </div>
            <CountryStat 
              countryCode={statSet.rankings[1].cid} 
              key={statSet.rankings[1].cid} 
              userRanking={userOrder.indexOf(statSet.rankings[1].cid)+1} 
              onClick={() => onCountrySelect(statSet.rankings[1].cid)}
            />
            <div className="LeafContainer">
              <img src={require("./images/LeafDown.png")}/>
            </div>
            <CountryStat 
              countryCode={statSet.rankings[2].cid} 
              key={statSet.rankings[2].cid} 
              userRanking={userOrder.indexOf(statSet.rankings[2].cid)+1} 
              onClick={() => onCountrySelect(statSet.rankings[2].cid)}
            />
          </div>
        }
    </div>
  );
}

export default App;

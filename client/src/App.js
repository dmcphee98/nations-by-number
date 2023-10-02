import React, { useState, useEffect } from 'react';
import axios from "axios";
import CountryStat from "./components/CountryStat";
import "./App.css";

function App() {

  const [userOrder, setUserOrder] = useState([]);
  const [topFaceActive, setTopFaceActive] = useState(true);
  const [games, setGames] = useState([{
    name: "Most IKEA stores",
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
  },
  {
    name: "Most IKEA stores",
    rankings: [
      {
        rank: "38",
        cid: "ALB",
        datum: "25.85"
      },
      {
        rank: "95",
        cid: "AZE",
        datum: "22.35"
      },
      {
        rank: "152",
        cid: "BEL",
        datum: "9.75"
      }
    ]
  }]);

  useEffect(() => {
    console.log(userOrder)
    if (userOrder.length === 3) {
      newGame();
      setUserOrder([]);
    }

  }, [userOrder]);

  const sortName = (nameA, nameB) => {
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
      return 0;  
  }
  
  const newGame = async () => {
    if (!!!games || games.length <= 1) {
      axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
        let fetchedGames = response.data;
        console.log(fetchedGames);
        setGames((games) => {return fetchedGames});
        setTopFaceActive(topFaceActive => !topFaceActive);
      }); 
    } else {
      setGames(games => games.slice(1));
      setTopFaceActive(topFaceActive => !topFaceActive);
      if (games.length <= 5) {
        axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
          let fetchedGames = response.data;
          setGames(games => [...games, ...fetchedGames]);
        });
      }
    }
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

  const getCountryStat = (n) => {
    const cid = games[0]?.rankings?.[n]?.cid;
    const nextCid = games[1]?.rankings?.[n]?.cid;
    return (
      <CountryStat 
        key={n} 
        topFaceActive={topFaceActive}
        cid={cid} 
        nextCid={nextCid}
        userRanking={userOrder.indexOf(cid)+1} 
        onClick={() => onCountrySelect(cid)}
      />
    )
  }

  return (
    <div className="App" >
      <img className="Compass" src={require("./images/Compass.png")}/>
      <div className="Title">{"\u2022"} WHICH COUNTRY HAS THE {"\u2022"}</div>
      <div className="QuestionContainer">
        <div className={`Question Top ${topFaceActive ? "" : "Hidden"}`}>{!!games[0] ? games[0].name.toUpperCase() : ""}</div>
        <div className={`Question Bottom ${topFaceActive ? "Hidden" : ""}`}>{!!games[1] ? games[1].name.toUpperCase() : ""}</div>
      </div>
        {!!games[0].rankings && 

          <div className="CountryStatsContainer">
            {getCountryStat(0)}
            <div className="LeafContainer">
              <img src={require("./images/LeafUp.png")}/>
            </div>
            {getCountryStat(1)}
            <div className="LeafContainer">
              <img src={require("./images/LeafDown.png")}/>
            </div>
            {getCountryStat(2)}
          </div>
        }
    </div>
  );
}

export default App;

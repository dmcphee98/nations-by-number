import React, { useState, useEffect } from 'react';
import axios from "axios";
import CountryStat from "./components/CountryStat";
import "./App.css";

function App() {

  const [userOrder, setUserOrder] = useState([]);
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({});

  useEffect(() => {
    setGame({
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
    })
  }, []);

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
    if (games.length === 0) {
      await axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
        let fetchedGames = response.data;
        console.log(fetchedGames);
        fetchedGames[0].rankings.sort((a, b) => sortName(a.cid, b.cid));
        setGame(fetchedGames[0]);
        setGames(fetchedGames.slice(1));
      }); 
    } else {
      games[0].rankings.sort((a, b) => sortName(a.cid, b.cid));
      setGame(games[0]);
      if (games.length < 5) {
        axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
          let fetchedGames = response.data;
          setGames(games => [...(games.slice(1)), ...fetchedGames]);
        });
      } else {
        setGames(games.slice(1));
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

  return (
    <div className="App" >
      <img className="Compass" src={require("./images/Compass.png")}/>
      <div className="Title">{"\u2022"} WHICH COUNTRY HAS THE {"\u2022"}</div>
      <div className="Question">{!!game.name ? game.name.toUpperCase() : ""}</div>
        {!!game.rankings && 
          <div className="CountryStatsContainer">
            <CountryStat 
              countryCode={game.rankings[0].cid} 
              key={game.rankings[0].cid} 
              userRanking={userOrder.indexOf(game.rankings[0].cid)+1} 
              onClick={() => onCountrySelect(game.rankings[0].cid)}
            />
            <div className="LeafContainer">
              <img src={require("./images/LeafUp.png")}/>
            </div>
            <CountryStat 
              countryCode={game.rankings[1].cid} 
              key={game.rankings[1].cid} 
              userRanking={userOrder.indexOf(game.rankings[1].cid)+1} 
              onClick={() => onCountrySelect(game.rankings[1].cid)}
            />
            <div className="LeafContainer">
              <img src={require("./images/LeafDown.png")}/>
            </div>
            <CountryStat 
              countryCode={game.rankings[2].cid} 
              key={game.rankings[2].cid} 
              userRanking={userOrder.indexOf(game.rankings[2].cid)+1} 
              onClick={() => onCountrySelect(game.rankings[2].cid)}
            />
          </div>
        }
    </div>
  );
}

export default App;

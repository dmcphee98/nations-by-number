import React, { useState, useEffect } from 'react';
import axios from "axios";
import CountryStat from "./components/CountryStat";
import Ellipsis from './components/Ellipsis';
import "./App.css";

function App() {

  const [userOrder, setUserOrder] = useState([]);
  const [isPlayingGameA, setIsPlayingGameA] = useState(true);
  const [games, setGames] = useState([]);
  const [gameA, setGameA] = useState(undefined);
  const [gameB, setGameB] = useState(undefined);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    console.log(userOrder)
    if (userOrder.length === 3) {
      newGame();
      setUserOrder([]);
    }
  }, [userOrder]);
  
  const newGame = async () => {
    if (!!!games || games.length == 0) {
      axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
        let fetchedGames = response.data;
        setGames(games => [...games, ...fetchedGames]);
        setIsPlayingGameA((isPlayingGameA, games) => !isPlayingGameA);
      });
    } else {
      setGames(games => games.slice(1));
      setIsPlayingGameA((isPlayingGameA, games) => !isPlayingGameA);
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
    const isLoading = !!!games[0];
    let cidA, cidB;
    cidA = isLoading ? "NIL" : gameA?.rankings?.[n]?.cid;
    cidB = isLoading ? "NIL" : gameB?.rankings?.[n]?.cid;

    const currentCid = isPlayingGameA ? cidA : cidB;

    return (
      <CountryStat 
        key={n} 
        isPlayingGameA={isPlayingGameA}
        cidA={cidA} 
        cidB={cidB}
        userRanking={userOrder.indexOf(currentCid)+1} 
        index={n}
        onClick={() => onCountrySelect(currentCid)}
      />
    )
  }

  useEffect(() => {
    preloadNextGame();
  }, [isPlayingGameA]);

  const preloadNextGame = async () => {
    if (!!!gameA && !!!gameB) {
      // Edge-case for the very first game
      setGameB(games[0]);
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    if (isPlayingGameA) {
      setGameB(games[1]);
    } else {
      setGameA(games[1]);
    }
  }

  return (
    <div className="App" >
      <img className="Compass" src={require("./images/Compass.png")}/>
      <div className="Title">{"\u2022"} WHICH COUNTRY HAS THE {"\u2022"}</div>
      <div className="QuestionContainer">
        { !!games[0] &&
        <>
          <div className={`Question Top ${isPlayingGameA ? "" : "Hidden"}`}>{!!gameA ? gameA.name.toUpperCase() : ""}</div>
          <div className={`Question Bottom ${isPlayingGameA ? "Hidden" : ""}`}>{!!gameB ? gameB.name.toUpperCase() : ""}</div>
        </>
        }
        { !!!games[0] &&
          <Ellipsis />
        }
      </div>
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
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from "axios";
import CountryStat from "./components/CountryStat";
import Ellipsis from './components/Ellipsis';
import "./App.css";

function App() {

  const [userOrder, setUserOrder] = useState([]);
  const [onResultsPage, setOnResultsPage] = useState(false);
  const [isPlayingGameA, setIsPlayingGameA] = useState(true);
  const [games, setGames] = useState([]);
  const [gameA, setGameA] = useState(undefined);
  const [gameB, setGameB] = useState(undefined);
  const [answer, setAnswer] = useState(undefined);


  useEffect(() => {
    newGame();
  }, []);
  
  const newGame = async () => {
    if (!!!games || games.length == 0) {
      axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
        let fetchedGames = response.data;
        setGames(games => [...fetchedGames]);
        setAnswer(getAnswer(fetchedGames[0]));
        setIsPlayingGameA((isPlayingGameA, games) => !isPlayingGameA);
      });
    } else {
      const newGame = games[1];
      setGames(games => games.slice(1));
      setAnswer(getAnswer(newGame));
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
    if (onResultsPage) return;
    const addToOrder = userOrder.length < 3 && !userOrder.includes(cid);
    if (addToOrder) {
      setUserOrder([...userOrder, cid]);
    }
    const removeFromOrder = userOrder[userOrder.length-1] === cid; 
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
    console.log(currentCid);
    console.log(answer);

    return (
      <CountryStat 
        key={n} 
        index={n}
        cidA={cidA} 
        cidB={cidB}
        userRanking={userOrder.indexOf(currentCid)+1} 
        answer={answer?.indexOf(currentCid)+1}
        isPlayingGameA={isPlayingGameA}
        onResultsPage={onResultsPage}
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

  const getAnswer = (game) => {
    if (!!!game) return [];
    const rankingsCopy = [...game.rankings];
    rankingsCopy.sort((a, b) => standardSort(a.rank, b.rank));
    const answer = [rankingsCopy[0].cid, rankingsCopy[1].cid, rankingsCopy[2].cid];
    return(answer);
  }

  const standardSort = (nameA, nameB) => {
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
      return 0;  
  }

  const onSubmit = async () => {
    console.log("Submitted");
    if (userOrder.length === 3) {
      if (onResultsPage) {
        newGame();
        setUserOrder([]);  
      }
      setOnResultsPage(!onResultsPage);
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
        <div className="SubmitButtonContainer">
          <div 
            className={`SubmitButton ${games.length > 0 && userOrder.length === 3 ? "Active" : "Inactive"} NoTextHighlight`}
            onClick={onSubmit}
          >
            {onResultsPage ? 'NEXT' : 'SUBMIT'}
          </div>
        </div>
    </div>
  );
}

export default App;

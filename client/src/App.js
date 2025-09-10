import React, { useState, useEffect } from 'react';
import axios from "axios";
import CountryStat from "./components/CountryStat";
import decodeAlpha03 from "./components/Alpha03Decoder";
import Ellipsis from "./components/Ellipsis";
import { Tooltip } from "react-tooltip";
import "./App.scss";

function App() {

  const [userOrder, setUserOrder] = useState([]);
  const [onResultsPage, setOnResultsPage] = useState(false);
  const [isPlayingGameA, setIsPlayingGameA] = useState(true);
  const [games, setGames] = useState([]);
  const [gameA, setGameA] = useState(undefined);
  const [gameB, setGameB] = useState(undefined);
  const [currentGame, setCurrentGame] = useState(undefined);
  const [answer, setAnswer] = useState(undefined);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Track whether window is portrait or landscape
  const [isPortraitMode, setPortraitMode] = useState(getIsPortraitMode());

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getIsPortraitMode() {
    const {innerWidth, innerHeight} = window;
    return innerHeight > innerWidth;
  }  

  function handleWindowResize() {
    setPortraitMode(getIsPortraitMode());
    console.log(getIsPortraitMode());
  }

  useEffect(() => {
    setHighScore(localStorage.getItem("highScore") ?? 0);
    newGame();
  }, []);  
  
  const newGame = async () => {
    if (!games || games.length === 0) {
      setImagesLoaded(0);
      axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
        let fetchedGames = response.data;
        setGames([...fetchedGames]);
        setAnswer(getAnswer(fetchedGames[0]));
        setCurrentGame(fetchedGames[0]);
        preloadNextGame(fetchedGames[0]);
        /* When we have 0 games left and we fetch more games from the lambda function, we must wait until 
         * the images for each of the 3 countries have loaded in before flipping, to avoid visual flickering.
         * So we preload the next game (i.e. render the flags on the underside of each card), and the actual
         * flipping is performed by the useEffect below, after each of the images has loaded.
         */
      });
    } else {
      const newGame = games[1];
      setGames(games => games.slice(1));
      setAnswer(getAnswer(newGame));
      setIsPlayingGameA(isPlayingGameA => !isPlayingGameA);
      if (games.length <= 5) {
        axios.get('https://g3w6hkwjmzejlbwk2p6dlnzz7y0kgpco.lambda-url.us-east-1.on.aws?n=5').then((response) => {
          let fetchedGames = response.data;
          if (games[games.length-1].name === fetchedGames[0].name) fetchedGames.reverse();
          setGames(games => [...games, ...fetchedGames]);
        });
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentGame(newGame);
    }
  }

  // This is what causes the cards to flip after all 3 flags have loaded.
  useEffect(() => {
    if (imagesLoaded === 3) {
        setIsPlayingGameA(isPlayingGameA => !isPlayingGameA);
    }
  }, [imagesLoaded]);  


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
        setImagesLoaded={setImagesLoaded}
      />
    )
  }

  useEffect(() => {
    preloadNextGame();
  }, [isPlayingGameA]);

  const preloadNextGame = async (game) => {
    if (!gameA && !gameB) {
      // Edge-case for the very first game
      setGameB(game ?? games[0]);
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    if (isPlayingGameA) {
      setGameB(game ?? games[1]);
    } else {
      setGameA(game ?? games[1]);
    }
  }

  const getAnswer = (game) => {
    if (!game || !game.rankings) return [];
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
      const cachedOnResultsPage = onResultsPage;
      setOnResultsPage(!onResultsPage);
      if (cachedOnResultsPage) {
        newGame();
        setUserOrder([]);  
      } else {
        // Update streak & high score
        if (answer.toString() === userOrder.toString()) {
          if (streak + 1 > highScore) {
            localStorage.setItem("highScore", streak + 1);
            setHighScore(streak + 1); 
          }
          setStreak(streak + 1);
        } else {
          setStreak(0);
        }
      }
    }
  }

  const getOrdinal = (num) => {
    const finalNum = num % 10;
    switch (finalNum) {
      case 1:
        return 'st';
      case 2: 
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    } 
  }

  const renderTable = () => {
    if (!currentGame) return;

    const rankings = [...currentGame.rankings];
    rankings.sort((a, b) => standardSort(a.rank, b.rank));

    return (
      <table className={`AnswerTable ${onResultsPage ? "Visible" : "Hidden"} ${isPortraitMode ? "Mobile" : ""}`}>
      <tbody>
      <tr>
        <th>RANK</th>
        <th>NATION</th>
        <th>SCORE<span style={{fontSize: "1.4vh", verticalAlign: "top"}}>{currentGame?.units? "*" : ""}</span></th>
      </tr>
      {rankings.map((ranking, index) => {
        return (
          <tr key={index}>
            <td>
              {ranking.rank}
              <span style={{fontSize: '1.3vh'}}>
                {getOrdinal(ranking.rank)}
              </span>
            </td>
            <td>{decodeAlpha03(ranking.cid)}</td>
            <td>{ranking.datum}</td>
          </tr>
        );
      })}
      <tr>
      <td/><td/><td/>
      </tr>
      <tr>
        <td colSpan="3">{currentGame?.units? "* " + currentGame?.units : ""}</td>
      </tr>
      </tbody>
    </table>
    );
  }

  return (
    <div className="App" >
      <img className="Compass NoDrag" src={`${process.env.PUBLIC_URL}/images/Compass.png`} alt=""/>
      <div className="Title NoTextHighlight">{"\u2022"} RANK THE NATIONS BY {"\u2022"}</div>
      <div className="QuestionContainer">
        { !!games[0] && imagesLoaded >= 3 &&
        <>
          <div className={`Question Top ${isPlayingGameA ? "Visible" : "Hidden"} NoTextHighlight`}>
            <p style={{display: "inline", position: "relative"}}>{!!gameA ? gameA.name.toUpperCase() : ""}
              <img className={`InfoIcon ${!!currentGame?.units && !onResultsPage && isPlayingGameA ? "Visible" : "Hidden"}`} src={require("./images/InfoIcon.png")} alt="Info icon"/>
            </p>
          </div>
          <div className={`Question Bottom ${isPlayingGameA ? "Hidden" : "Visible"} NoTextHighlight`}>
            <p style={{display: "inline", position: "relative"}}>{!!gameB ? gameB.name.toUpperCase() : ""}
              <img className={`InfoIcon ${!!currentGame?.units && !onResultsPage && !isPlayingGameA ? "Visible" : "Hidden"}`} src={require("./images/InfoIcon.png")} alt="Info icon"/>
            </p>
          </div>
          <Tooltip 
            className='InfoTooltip' 
            anchorSelect={isPortraitMode ? ".Question" : ".InfoIcon"} 
            place={isPortraitMode ? "bottom" : "right"}
            offset={isPortraitMode ? 5 : 8}>
              {currentGame?.units}
          </Tooltip>
        </>
        }
        { (!!!games[0] || imagesLoaded < 3) &&
          <Ellipsis />
        }
      </div>
        <div className={`CountryStatsContainer ${onResultsPage ? "Results" : ""}`}>
          {getCountryStat(0)}
          <div className="LeafContainer">
            <img className="NoDrag" src={`${process.env.PUBLIC_URL}/images/LeafUp.png`} alt=""/>
          </div>
          {getCountryStat(isPortraitMode ? 2 : 1)}
          <div className="LeafContainer">
            <img className="NoDrag" src={`${process.env.PUBLIC_URL}/images/LeafDown.png`} alt=""/>
          </div>
          {getCountryStat(isPortraitMode ? 1 : 2)}
        </div>
        <div className="PageBottom">
          {renderTable()}
          <div className={`SubmitButtonContainer ${onResultsPage ? 'Next' : 'Submit'}`}>
          <div className={`StreakIcon ${onResultsPage ? "Visible" : "Hidden"}`}>
            <img className={`StreakIcon NoDrag ${streak < 3 ? "Visible" : ""}`} src={require(`./images/StreakIcon.png`)} alt="Streak icon"/>
            <img className={`StreakIcon NoDrag ${streak >=3 ? "Visible" : ""}`} src={require(`./images/StreakIcon1.png`)} alt="Streak icon"/>
            <p style={{ fontSize: streak > 9 ? "1.5vh" : "1.8vh"}}>{streak}</p>
          </div>
          {!isPortraitMode && 
            <Tooltip 
              className='StreakTooltip' 
              anchorSelect={".StreakIcon"} 
              place="bottom"
              offset="7">
                Current streak
            </Tooltip>
          }
          <div className={`HighScoreIcon ${onResultsPage ? "Visible" : "Hidden"}`}>
            <img className={`HighScoreIcon NoDrag ${streak < highScore || streak === 0 ? "Visible" : ""}`} src={require(`./images/HighScoreIcon.png`)} alt="High score icon"/>
            <img className={`HighScoreIcon NoDrag ${streak === highScore && streak > 0 ? "Visible" : ""}`} src={require(`./images/HighScoreIcon1.png`)} alt="High score icon"/>
            <p style={{ fontSize: streak > 9 ? "1.5vh" : "1.8vh"}}>{highScore}</p>
          </div>
          {!isPortraitMode && 
            <Tooltip 
              className='HighScoreTooltip' 
              anchorSelect={".HighScoreIcon"} 
              place="bottom"
              offset="7">
                High Score
            </Tooltip>
          }
          <div 
              className={`SubmitButton ${games.length > 0 && userOrder.length === 3 ? "Active" : "Inactive"} NoTextHighlight`}
              onClick={onSubmit}
            >
              {onResultsPage ? 'NEXT' : 'SUBMIT'}
          </div>
          <a 
            className="SourceIcon" 
            href={onResultsPage ? currentGame.source : "#"}
            target="_blank"
            rel="noreferrer"
          >
            <img className={`SourceIcon NoDrag ${onResultsPage ? "Visible" : "Hidden"}`} src={require("./images/SourceIcon.png")} alt="Source icon"/>
          </a>
          <a 
            className="GithubIcon" 
            href={onResultsPage ? "https://github.com/dmcphee98/nations-by-number" : "#"}
            target="_blank"
            rel="noreferrer"
          >
            <img className={`GithubIcon NoDrag ${onResultsPage ? "Visible" : "Hidden"}`} src={require("./images/GithubIcon.png")} alt="Github icon"/>
          </a>

          {!isPortraitMode && 
            <>
              <Tooltip 
                className='SourceTooltip' 
                anchorSelect={".SourceIcon"} 
                place="bottom"
                offset="7">
                  View data
              </Tooltip>
              <Tooltip 
                className='GithubTooltip' 
                anchorSelect={".GithubIcon"} 
                place="bottom"
                offset="7">
                  View on Github
              </Tooltip>
            </>
          }

        </div>
      </div>
    </div>
  );
}

export default App;

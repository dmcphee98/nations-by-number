import React, { useState, useEffect } from 'react';
import Flag from "./Flag";
import decodeAlpha03 from "./Alpha03Decoder";
import tokenGray from "../images/TokenGray.png";
import tokenGreen from "../images/TokenGreen.png";
import tokenRed from "../images/TokenRed.png";
import tick from "../images/Tick.png";
import cross from "../images/Cross.png";
import Globe from "./Globe";

import "./CountryStat.css";

function CountryStat({ index, cidA, cidB, userRanking, answer, onResultsPage, isPlayingGameA, onClick }) {

  const [prevUserRanking, setPrevUserRanking] = useState(-1);
  const [showResult, setShowResult] = useState(false);

  const values = {11: 30, 12: 29, 13: 28, 21: 32, 22: 31, 23: 31, 31: 35, 32: 33, 33: 33};
  const numPosAdjustments = new Map(Object.entries(values));

  const localOnClick = () => {
    setPrevUserRanking((prevUserRanking) => {return userRanking;})
    onClick();
  }

  useEffect(() => {
    setShowResult(onResultsPage);
  }, [onResultsPage]);


  const renderToken = (game) => {
    if (isPlayingGameA && game === "B") return;
    if (!isPlayingGameA && game === "A") return;

    return (
      <div className={`TokenContainer ${onResultsPage ? 'Hoverable' : ''}`}>
        <div 
          className={`Token ${userRanking > 0 ? 'Visible' : 'Invisible'} ${showResult ? 'Flipped' : ''}`} 
          style={{
            paddingLeft: `${numPosAdjustments.get(String(index+1) + userRanking)}%`
          }}
          onClick={() => {if (onResultsPage) {setShowResult(!showResult)};}} 
        >
          <img src={tokenGray} alt="" style={{rotate: `${(index-1)*55}deg`}} />
          <h1 className="NoTextHighlight" style={{rotate: '0deg'}}>
            {userRanking === 0 ? prevUserRanking : userRanking}
          </h1>
        </div>
        <div 
          className={`Token ${userRanking > 0 ? 'Visible' : 'Invisible'} ${showResult ? '' : 'Flipped'}`} 
          style={{
            paddingLeft: `${numPosAdjustments.get(String(index+1) + userRanking)}%`
          }}
          onClick={() => {if (onResultsPage) {setShowResult(!showResult)};}}
        >
          <img className="NoDrag" src={userRanking === answer ? tokenGreen : tokenRed} alt="" style={{rotate: `${(index-1)*55}deg`}} />
          <img 
            className="CrossTick NoDrag" 
            src={userRanking === answer ? tick : cross} 
            alt={userRanking === answer ? 'Tick' : 'Cross'} 
            style={{left: `${50+(index-1)*3}%`}}
          />
        </div>

      </div>
    )
  }

  return (
    <div className={`CountryStat ${cidA === "NIL" ? 'Loading' : 'Loaded'}`}>
      <div className="Card">
        <img src={require(`../images/CardStack${index}.png`)} alt="" className="CardStack" />
        <div className={`CardFace Top ${isPlayingGameA ? 'FaceUp' : 'FaceDown'} ${onResultsPage ? '' : 'Hoverable'} NoTextHighlight NoDrag`}>
          <img className="Border"src={require("../images/CardBorder2.png")}/>
          <Flag cid={cidA} onClick={localOnClick}/>
          { cidA === "NIL" &&
            <Globe />
          }
          {renderToken("A")}
        </div>
        <div className={`CardFace Bottom ${isPlayingGameA ? 'FaceDown' : 'FaceUp'} ${onResultsPage ? '' : 'Hoverable'} NoTextHighlight NoDrag`}>
          <img className="Border" src={require("../images/CardBorder2.png")}/>
          <Flag cid={cidB} onClick={localOnClick}/>
          {renderToken("B")}
        </div>
      </div>
      <div className={`Name Top ${isPlayingGameA ? '' : 'Hidden'} NoTextHighlight`}>{!!cidA ? decodeAlpha03(cidA).toUpperCase() : ""}</div>
      <div className={`Name Bottom ${isPlayingGameA ? 'Hidden' : ''} NoTextHighlight`}>{!!cidB ? decodeAlpha03(cidB).toUpperCase() : ""}</div>
    </div>
  )
}

export default CountryStat
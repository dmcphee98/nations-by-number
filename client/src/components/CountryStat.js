import React, { useState, useEffect } from 'react';
import Flag from "./Flag";
import decodeAlpha03 from "./Alpha03Decoder";
import firstStamp from "../images/First.png";
import secondStamp from "../images/Second.png";
import thirdStamp from "../images/Third.png";
import Globe from "./Globe";

import "./CountryStat.css";

function CountryStat({ cidA, cidB, isPlayingGameA, userRanking, onClick }) {

  const [prevUserRanking, setPrevUserRanking] = useState(-1); 
  const [rotation, setRotation] = useState(0);
  const stamps = [firstStamp, secondStamp, thirdStamp];

  const localOnClick = () => {
    setPrevUserRanking((prevUserRanking) => {return userRanking;})
    if (userRanking === 0) setRotation((rotation) => {return getRandomInt(-18, 18)});
    onClick();
  }

  const getStampImgSrc = () => { 
    if (userRanking > 0) {
      return stamps[userRanking-1];
    }
    if (prevUserRanking > 0) {
      return stamps[prevUserRanking-1];    
    }
    return null;
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div className={`CountryStat ${cidA === "NIL" ? 'Loading' : 'Loaded'}`}>
      <div className="Card">
        <div className={`CardFace Top ${isPlayingGameA ? 'FaceUp' : 'FaceDown'}`}>
          <img className="Border"src={require("../images/CardBorder4.png")}/>
          <Flag cid={cidA} onClick={localOnClick}/>
          { cidA === "NIL" &&
            <Globe />
          }
          <div className="StampContainer">
            {isPlayingGameA &&
              <img 
                className={`Stamp ${userRanking !== 0 ? 'Visible' : 'Invisible'}`} 
                src={getStampImgSrc()}
                style={{rotate: `${rotation}deg`}}
              />
            }
          </div>
        </div>
        <div className={`CardFace Bottom ${isPlayingGameA ? 'FaceDown' : 'FaceUp'}`}>
          <img className="Border" src={require("../images/CardBorder4.png")}/>
          <Flag cid={cidB} onClick={localOnClick}/>
          <div className="StampContainer">
            {!isPlayingGameA &&
              <img 
                className={`Stamp ${userRanking !== 0 ? 'Visible' : 'Invisible'}`} 
                src={getStampImgSrc()}
                style={{rotate: `${rotation}deg`}}
              />
            }
          </div>
        </div>
      </div>
      <div className={`Name Top ${isPlayingGameA ? '' : 'Hidden'}`}>{!!cidA ? decodeAlpha03(cidA).toUpperCase() : ""}</div>
      <div className={`Name Bottom ${isPlayingGameA ? 'Hidden' : ''}`}>{!!cidB ? decodeAlpha03(cidB).toUpperCase() : ""}</div>
    </div>
  )
}

export default CountryStat
import React, { useState, useEffect } from 'react';
import Flag from "./Flag";
import decodeAlpha03 from "./Alpha03Decoder";
import firstStamp from "../images/First.png";
import secondStamp from "../images/Second.png";
import thirdStamp from "../images/Third.png";

import "./CountryStat.css";

function CountryStat({countryCode, userRanking, stat, unit, onClick}) {

  const [prevUserRanking, setPrevUserRanking] = useState(-1); 
  const [rotation, setRotation] = useState(0);
  const stamps = [firstStamp, secondStamp, thirdStamp];

  const localOnClick = () => {
    setPrevUserRanking((prevUserRanking) => {return userRanking;})
    if (userRanking === 0) setRotation((rotation) => {return getRandomInt(-18, 18)});
    onClick();
  }

  useEffect(() => {
    console.log(prevUserRanking)

  }, [prevUserRanking]);
  
  const getImgSrc = () => { 
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
    <div className="CountryStat">
      <div className="FlagContainer">
        <img className="CardBorder"src={require("../images/CardBorder4.png")}/>
        <Flag code={countryCode} onClick={localOnClick}/>
        <div className="StampContainer">
          <img 
            className={`Stamp ${userRanking !== 0 ? 'Visible' : 'Invisible'}`} 
            src={getImgSrc()}
            style={{rotate: `${rotation}deg`}}
          />
        </div>
      </div>
      <div className="Name">{decodeAlpha03(countryCode).toUpperCase()}</div>
    </div>
  )
}

export default CountryStat
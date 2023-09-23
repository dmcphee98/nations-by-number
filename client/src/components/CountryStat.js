import React from "react";
import Flag from "./Flag";
import decodeAlpha03 from "./Alpha03Decoder";
import "./CountryStat.css";

function CountryStat({countryCode, userRanking, stat, unit, onClick}) {

  return (
    <div className="CountryStat">
      <div className="FlagContainer">
        <img className="CardBorder"src={require("../images/CardBorder4.png")}/>
        <Flag code={countryCode} onClick={onClick}/>
        {userRanking !== 0 && 
          <img className="Stamp" src={require(`../images/${["First", "Second", "Third"][userRanking-1]}.png`)}/>
        }
      </div>
      <div className="Name">{decodeAlpha03(countryCode).toUpperCase()}</div>
    </div>
  )
}

export default CountryStat
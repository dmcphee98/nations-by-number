import React, { useState, useEffect } from 'react';
import Flag from "./Flag";
import decodeAlpha03 from "./Alpha03Decoder";
import firstStamp from "../images/First.png";
import secondStamp from "../images/Second.png";
import thirdStamp from "../images/Third.png";
import Globe from "./Globe";

import "./CountryStat.css";

function CountryStat({ cid, nextCid, topFaceActive, userRanking, onClick }) {

  const [prevUserRanking, setPrevUserRanking] = useState(-1); 
  const [rotation, setRotation] = useState(0);
  const stamps = [firstStamp, secondStamp, thirdStamp];
  const [topFaceCid, setTopFaceCid] = useState(cid); 
  const [bottomFaceCid, setBottomFaceCid] = useState(nextCid); 

  const localOnClick = () => {
    setPrevUserRanking((prevUserRanking) => {return userRanking;})
    if (userRanking === 0) setRotation((rotation) => {return getRandomInt(-18, 18)});
    onClick();
  }

  const flipFace = async () => {
    // TODO: need to put edge-case logic here to populate both faces of the card after first load
    if (bottomFaceCid === "NIL") setBottomFaceCid(cid); 

    await new Promise(resolve => setTimeout(resolve, 800));
    if (!topFaceActive) {
      // Flipped from top face to bottom face
      setTopFaceCid(nextCid);
    } else {
      setBottomFaceCid(nextCid);
    }
  }

  useEffect(() => {
    flipFace();
  }, [topFaceActive]);
  
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
    <div className={`CountryStat ${topFaceCid === "NIL" ? 'Loading' : 'Loaded'}`}>
      <div className="Card">
        <div className={`CardFace Top ${topFaceActive ? 'FaceUp' : 'FaceDown'}`}>
          <img className="Border"src={require("../images/CardBorder4.png")}/>
          <Flag cid={topFaceCid} onClick={localOnClick}/>
          { topFaceCid === "NIL" &&
            <Globe />
          }
          <div className="StampContainer">
            {topFaceActive &&
              <img 
                className={`Stamp ${userRanking !== 0 ? 'Visible' : 'Invisible'}`} 
                src={getImgSrc()}
                style={{rotate: `${rotation}deg`}}
              />
            }
          </div>
        </div>
        <div className={`CardFace Bottom ${topFaceActive ? 'FaceDown' : 'FaceUp'}`}>
          <img className="Border" src={require("../images/CardBorder4.png")}/>
          <Flag cid={bottomFaceCid} onClick={localOnClick}/>
          <div className="StampContainer">
            {!topFaceActive &&
              <img 
                className={`Stamp ${userRanking !== 0 ? 'Visible' : 'Invisible'}`} 
                src={getImgSrc()}
                style={{rotate: `${rotation}deg`}}
              />
            }
          </div>
        </div>
      </div>

      <div className={`Name Top ${topFaceActive ? '' : 'Hidden'}`}>{!!topFaceCid ? decodeAlpha03(topFaceCid).toUpperCase() : ""}</div>
      <div className={`Name Bottom ${topFaceActive ? 'Hidden' : ''}`}>{!!bottomFaceCid ? decodeAlpha03(bottomFaceCid).toUpperCase() : ""}</div>

    </div>
  )
}

export default CountryStat
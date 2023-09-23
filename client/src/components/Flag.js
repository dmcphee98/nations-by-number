import React from "react";
import decodeAlpha03 from "./Alpha03Decoder";

function Flag({code, onClick}) {

  const resolveImgSrc = (code) => {
    try {
      return require(`../images/flags/${code}.png`);
    } catch (e) {
      return require(`../images/flags/ERR.png`);
    }
  }

  return (
    <img 
      className="Flag"
      src={resolveImgSrc(code)} 
      alt={`Flag of ${decodeAlpha03(code)}`}
      onClick={onClick}
    />
  )
}

export default Flag
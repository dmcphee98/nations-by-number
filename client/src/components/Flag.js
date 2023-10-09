import React from "react";
import decodeAlpha03 from "./Alpha03Decoder";

function Flag({cid, onClick}) {

  const resolveImgSrc = (code) => {
    try {
      return require(`../images/flags/${code}.png`);
    } catch (e) {
      return require(`../images/flags/NIL.png`);
    }
  }

  return (
    <img 
      className="Flag"
      src={resolveImgSrc(cid)} 
      alt={!!cid ? 'Flag of ' + decodeAlpha03(cid) : 'Unknown flag'}
      onClick={onClick}
    />
  )
}

export default Flag
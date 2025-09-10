import React from "react";
import decodeAlpha03 from "./Alpha03Decoder";

function Flag({cid, onClick, setImageLoaded}) {

  const resolveImgSrc = (code) => {
    try {
      return require(`../images/flags/${code}.png`);
    } catch (e) {
      return process.env.PUBLIC_URL + "/images/NIL.png";
    }
  }

  // Increment the `imageLoaded` count whenever this flag loads a new image
  const onLoad = (code) => {
    if (code !== "NIL") {
      setImageLoaded(imageLoaded => imageLoaded+1)
    }
  }

  return (
    <img 
      className="Flag"
      src={resolveImgSrc(cid)} 
      alt={!!cid ? 'Flag of ' + decodeAlpha03(cid) : 'Unknown flag'}
      onClick={onClick}
      onLoad={() => onLoad(cid)} 
    />
  )
}

export default Flag
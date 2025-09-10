import React from "react";
import "./Globe.scss";
import earth from "../images/globe.png";

function Globe() {
  return (
    <div className="Globe">
        <div className="WorldMap">
            <img src={earth} className="Front" alt=""/>
        </div>
    </div>  
    )
}

export default Globe
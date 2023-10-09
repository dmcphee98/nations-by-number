import React from "react";
import "./Globe.css";
import earth from "../images/globe.png";

function Globe() {
  return (
    <div className="Globe">
        <div className="WorldMap">
            <img src={earth} className="Front"/>
        </div>
    </div>  
    )
}

export default Globe
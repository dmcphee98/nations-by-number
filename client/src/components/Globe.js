import React from "react";
import "./Globe.scss";

function Globe() {
  return (
    <div className="Globe">
        <div className="WorldMap">
            <img src={`${process.env.PUBLIC_URL}/images/globe.png`} className="Front" alt="" draggable="false"/>
        </div>
    </div>  
    )
}

export default Globe
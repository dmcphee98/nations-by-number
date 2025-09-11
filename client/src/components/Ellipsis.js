import React from "react";
import "./Ellipsis.scss";

const Ellipsis = ({isVisible}) => {
  return (
    <div className={`lds-ellipsis ${isVisible ? "Visible" : "Hidden"}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>  
    );
}

export default Ellipsis
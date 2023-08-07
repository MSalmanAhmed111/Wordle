import './Tries.css'
import React from "react";

export default function Tries(props) {
  return (
    <div className="letterBox" style={{backgroundColor:props.bgColor}}>
      <h3>{props.letter}</h3>
    </div>
  );
}

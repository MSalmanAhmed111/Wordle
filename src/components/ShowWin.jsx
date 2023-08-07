import React from "react";
import './ShowWin.css'
export default function ShowWin(props) {
  return (
    <>
      <div className="showwindiv">
        <div className="context">
        <h1>{props.win ? "Congratulations" : "Oh No, You Lose !!"}</h1>
        <h2>{props.win ? "You Win !!" : "Why Not Try Again"}</h2>
        <p>The Mistery Word Was <span>"{props.word}"</span> </p>
      </div>
        </div>
      <button
          className="playagainbtn"
          onClick={() => {
            props.SetEnteredWord("");
            props.SetTryNo(0);
            props.setInput("");
            props.setword();
            props.setWin(false);
          }}
        >
          PLAY AGAIN
        </button>
    </>
  );
}

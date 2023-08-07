import "./WordInput.css";
import { React, useRef, useState } from "react";

export default function WordInput(props) {

  const [emptyInput, setEmptyInput] = useState();
  const [sameWord, setsameWord] = useState();

  const inputChangeHandler = (event) => {
    const obj = {
      [event.target.name]: event.target.value,
    };
    props.setInput(obj);
  };

  function handleSubmit(event) {
    event.preventDefault();

    //check if the player entered any word or not
    if (props.input.solution === undefined || props.input.solution === "") {
      //if not set emptyinput state to true
      setEmptyInput(true);

      //set same word state to false
      setsameWord(false);

      //now return without performing anything below
      return;
    }
    //check if the entered word is equal to the previously entered word
    else if (props.enteredWord === props.input.solution.toUpperCase()) {
      //if not set emptyinput state to false
      setEmptyInput(false);

      //set same word state to true
      setsameWord(true);

      //here also set input to "" so that the input field should become empty
      props.setInput({ ...props.input, solution: "" });

      //now return without performing anything below
      return;
    }

    setEmptyInput(false);

    props.SetEnteredWord(props.input.solution.toUpperCase());
    props.SetTryNo((tryNo) => {
      return tryNo + 1;
    });
    props.setInput({ ...props.input, solution: "" });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="triesDisplay">
        <h3 style={props.win ? { display: "none" } : { display: "block" }}>
          You have 3 tries to guess the word
        </h3>
        <h3
          style={props.tryNo >= 3 ? { display: "none" } : { display: "flex" }}
        >
          Try Number : {props.tryNo + 1}
        </h3>
        <h2
          style={props.tryNo <=3 ? { display: "none" } : { display: "flex" }}
        >
          {props.win
            ? "Congratulation You WIN"
            : "Oh no you loose why not try again"}
        </h2>
        <input
          onChange={inputChangeHandler}
          type="text"
          value={props.input.solution}
          maxLength={props.lettercount}
          minLength={props.lettercount}
          placeholder={`Enter Some ${props.lettercount} letter word...`}
          name="solution"
        />
        <p style={emptyInput ? { display: "flex" } : { display: "none" }}>
          {`Please make a guess by entering any ${props.lettercount} letter word!`}
        </p>
        <p style={sameWord ? { display: "flex" } : { display: "none" }}>
          Its tha same word as before <br /> Please enter a new Word!
        </p>
        <button
          className="checkBtn"
          type="submit"
          style={props.win ? { background: "grey" } : { background: "black" }}
          disabled={props.tryNo >= 3 || props.win ? true : false}
        >
          CHECK
        </button>
        {/* <button
          className="checkBtn"
          disabled={props.tryNo >= 3 || props.win ? false : true}
          style={props.win ? { background: "black" } : { background: "grey" }}
          onClick={() => {
            props.SetEnteredWord("");
            props.SetTryNo(0);
            props.setWin(false);
            props.setInput("");
            props.setword();
          }}
        >
          PLAY AGAIN
        </button> */}
      </div>
    </form>
  );
}

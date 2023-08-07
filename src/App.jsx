import "./App.css";

import words from "./WordleData";

import { React, useState, useMemo, useEffect } from "react";

import WordInput from "./components/WordInput";
import Tries from "./components/Tries";
import ShowWin from "./components/ShowWin";

let word = words[Math.floor(Math.random() * words.length)];
function setword() {
  word = words[Math.floor(Math.random() * words.length)];
}

export default function App() {
  const lettercount = word.length;

  const [input, setInput] = useState("");

  const [tryNo, SetTryNo] = useState(0);

  const [firstGuess, SetFirstGuess] = useState([]);
  const [secondGuess, SetSecondGuess] = useState([]);
  const [thirdGuess, SetThirdGuess] = useState([]);
  // const [guesses,setGuesses] = useState(new Array(5).fill(null))
  const [win, setWin] = useState(false);

  const [enteredWord, SetEnteredWord] = useState("");

  let found = false;

  function creatsetobject(letter, color) {
    //create object and store the letter and bgcolor green
    let obj = {
      letter: letter,
      bgColor: color,
    };
    if (tryNo === 1) {
      SetFirstGuess((firstGuess) => {
        return firstGuess.concat(obj);
      });
    } else if (tryNo === 2) {
      SetSecondGuess((secondGuess) => {
        return secondGuess.concat(obj);
      });
    } else if (tryNo === 3) {
      SetThirdGuess((thirdGuess) => {
        return thirdGuess.concat(obj);
      });
    }
  }

  function check(enteredWord) {
    console.log(enteredWord);
    if (enteredWord === "") {
      SetFirstGuess([]);
      SetSecondGuess([]);
      SetThirdGuess([]);
    }
    if (enteredWord === word) {
      setWin(true);
    }
    //loop through the letters in word variable
    for (let i = 0; i < lettercount; i++) {
      //check if the letters in word and enteredword is same
      if (enteredWord[i] === word[i]) {
        creatsetobject(enteredWord[i], "#38cb38");

        // //if letters are not same than
      } else if (enteredWord[i] !== word[i]) {
        //loop through the remaining letters in the word variable
        for (let j = 0; j < lettercount; j++) {
          //check if the letter can be found in all of word variable's letters
          if (enteredWord[i] === word[j]) {
            //if found then set
            found = true;
            break;
          } else {
            found = false;
            continue;
          }
        }
        if (found === true) {
          creatsetobject(enteredWord[i], "#ffcf00bd");
        } else if (found === false) {
          //then check if enteredword is undefined (means player hasn't entered anything yet)
          if (enteredWord[i] === undefined) {
            //do nothing
            //else (the only possibility remains now is the wnteredword letter is not in the word variable)
          } else {
            creatsetobject(enteredWord[i], "crimson");
          }
        }
      }
    }
  }

  useEffect(() => {
    console.log(word);
    console.log(enteredWord);
    check(enteredWord);
  }, [enteredWord]);

  return (
    <>
      {(tryNo >= 3 || win) && (
        <ShowWin
          word={word}
          setInput={setInput}
          enteredWord={enteredWord}
          SetEnteredWord={SetEnteredWord}
          lettercount={lettercount}
          SetTryNo={SetTryNo}
          tryNo={tryNo}
          win={win}
          setWin={setWin}
          setword={setword}
        />
      )}
      <div className="tryBox">
        <h1 className="wordleheading">WORDLE</h1>
        <div className="container">
          <div>
            <h3 className="trynoheading">1st Guess :</h3>
          </div>
          <dic className="lettercontainer">
            {firstGuess.map((firstGuess) => {
              return (
                <Tries
                  letter={firstGuess.letter}
                  bgColor={firstGuess.bgColor}
                />
              );
            })}
          </dic>
        </div>

                <div className="container">
          <div>
            <h3 className="trynoheading">2nd Guess :</h3>
          </div>
          <dic className="lettercontainer">
            {secondGuess.map((secondGuess) => {
              return (
                <Tries
                  letter={secondGuess.letter}
                  bgColor={secondGuess.bgColor}
                />
              );
            })}
          </dic>
        </div>
        
        <div className="container">
          <div>
            <h3 className="trynoheading" >3rd Guess :</h3>
          </div>
          <dic className="lettercontainer">
            {thirdGuess.map((thirdGuess) => {
              return (
                <Tries
                  letter={thirdGuess.letter}
                  bgColor={thirdGuess.bgColor}
                />
              );
            })}
          </dic>
        </div>

      </div>
      <div className="textField">
        <WordInput
          word={word}
          input={input}
          setInput={setInput}
          enteredWord={enteredWord}
          SetEnteredWord={SetEnteredWord}
          lettercount={lettercount}
          SetTryNo={SetTryNo}
          tryNo={tryNo}
          win={win}
          setWin={setWin}
          setword={setword}
        />
      </div>
    </>
  );
}

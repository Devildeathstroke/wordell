import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [chancesleft, setchancesleft] = useState("Start Game");
  const [wordlength, setwordlength] = useState(" Start Game");

  const startGame = (async () => {
    //function to run api
    const secretWord = await APIfetchWord();
    //set the chancesleft
    setchancesleft(secretWord.length + 1);
    setwordlength(secretWord.length);
    const word = document.getElementById("wordbox");
    word.textContent = "XXXXX";
    //const guess = word.textContent;
    const guessbutton = document.getElementById("guessbutton");
    guessbutton.addEventListener("click", () => {

      const input = document.getElementById("userinput");
      //INPUT SIZE IS SMALLER THAN SECRET WORD
      if (input.value.length < secretWord.length) {
        alert("DHANG SE DAAL");
        input.value = "";
      }
      // var guess ="";
      // const correctword = secretWord.toString();
      // const data =input.value;
      // var flag =0;
      // map<char,int> correctdata;
      // for(var i=0;i<correctword.length;i++){
      //   correctdata.insert(correctword[i]);
      // }
      // for(var i=0;i<data.length;i++){

      //   var found = correctdata.find(data[i]);
      //   console.log(found);
      //   if(found ==-1 || correctdata[data[i]]===0){
      //        guess+=data[i].toLowerCase();
      //        flag =1;

      //   }
      //   else {
      //     correctdata[data[i]]--;
      //     guess+=data[i];
      //   }

      // }




      let guess = "";
      const correctWord = secretWord.toString(); // Assuming secretWord is already defined
      const data = input.value; // Assuming input is the DOM element for user input
      let flag = 0;

      // Using a JavaScript Map to store character counts
      const correctData = new Map();

      // Initialize the map with character counts from correctWord
      for (let i = 0; i < correctWord.length; i++) {
        const char = correctWord[i];
        correctData.set(char, (correctData.get(char) || 0) + 1);
      }

      // Iterate through each character in the user's input
      for (let i = 0; i < data.length; i++) {
        const char = data[i];
        const count = correctData.get(char); // Get the count of the character from the map

        if (!count || count === 0) {
          // If character is not found or count is zero
          guess += char.toLowerCase();
          flag = 1;
        } else {
          // If character is found, decrement its count in the map
          correctData.set(char, count - 1);
          guess += char; // Keep the original case
        }
      }


      word.textContent = guess;
      if (flag === 0) {
        //won the game
        console.log("congrats");
        input.hidden = true;
      }
      else {
        setchancesleft((prevChances) => {
          if (prevChances <= 1) {
            console.log("LOST THE GAME");
            return 0; // Set chances to 0 if it reaches the end
          }
          else {
            console.log("try again");
            return prevChances - 1;
          }// Decrease chances
        });
        //  if(chancesleft=='1') console.log("LOST THE GAME");
        //  else {
        //   setchancesleft((prevChances)=>Math.max(prevChances-1,0));
        //   console.log("try again");
        // }
      }
      input.value = "";
    });



  });



  const APIfetchWord = (async () => {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
    const data = await response.json();
    console.log(data);
    const word = data[0].toUpperCase();
    console.log(word);
    return word;

  })
  return (
    <div className="App">
      <h1>Guess The Word</h1>
      <button id='startbutton' onClick={startGame}>Start Game</button>
      <div id='wordbox' onClick={startGame}></div>
      <h2>Chances left:{chancesleft}</h2>
      {/* //if chancesleft = 10 it should be written as click on start game */}
      <h2>Word Length:{wordlength}</h2>
      <input id='userinput' type='text' style={{ textTransform: "uppercase" }} maxLength="5" placeholder='Enter 5-letter Word'></input>
      <button id='guessbutton'> Guess</button><br />
      <button id='reloadbutton'>Reload Game</button>
    </div>
  );
}

export default App;

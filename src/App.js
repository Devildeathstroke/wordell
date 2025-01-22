
import React, { useState } from 'react';
import './App.css';


const App=()=> {
  const [chancesleft,setchancesleft] = useState(10);
  const [wordlength,setwordlength] = useState();
  const startGame=(()=>{
    //function to run api
    const secretWord = APIfetchWord();
    //set the chancesleft
    setchancesleft(secretWord.length+1);
    setwordlength(secretWord.length);





  });

  const APIfetchWord=(async()=>{
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
     <button id='startbutton'onClick={startGame}>Start Game</button>
     <h2>Chances left:{chancesleft} onChange={}</h2> 
     {/* //if chancesleft = 10 it should be written as click on start game */}
     <h2>Word Length:{wordlength}</h2>
     <input></input>
     <button id='guessbutton'> Guess</button><br/>
     <button id='reloadbutton'>Reload Game</button>
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import './App.css';


const App=()=> {
  const [chancesleft,setchancesleft] = useState(10);
  const [wordlength,setwordlength] = useState();
  
  const startGame=(async()=>{
    //function to run api
    const secretWord =  await APIfetchWord();
    //set the chancesleft
    setchancesleft(secretWord.length+1);
    setwordlength(secretWord.length);
    const word = document.getElementById("wordbox");
    word.textContent = "XXXXX";
    //const guess = word.textContent;
    const guessbutton = document.getElementById("guessbutton");
    guessbutton.addEventListener("click",()=>{
      
      const input = document.getElementById("userinput");
      //INPUT SIZE IS SMALLER THAN SECRET WORD
      if(input.value.length< secretWord.length){
        alert("DHANG SE DAAL");
        input.value = "";
      }
      var guess ="";
      const correctword = secretWord.toString();
      const data =input.value;
      for(var i=0;i<data.length;i++){

        var found = correctword.search(data[i]);
        console.log(found);
        if(found ==-1){
             guess+=data[i].toLowerCase();
    
        }
        else {
          guess+=data[i];
        }
         
      }
      word.textContent = guess;
      input.value ="";
    });

     
    
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
     <div id='wordbox'onClick={startGame}></div>
     <h2>Chances left:{chancesleft}</h2> 
     {/* //if chancesleft = 10 it should be written as click on start game */}
     <h2>Word Length:{wordlength}</h2>
     <input id='userinput' type='text'style={{ textTransform: "uppercase" }} maxLength="5"placeholder='Enter 5-letter Word'></input>
     <button id='guessbutton'> Guess</button><br/>
     <button id='reloadbutton'>Reload Game</button>
    </div>
  );
}

export default App;

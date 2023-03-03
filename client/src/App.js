import './App.css';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { io } from 'socket.io-client'

var socket = io('http://localhost:3001',{transports: ['polling', 'websocket',
'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});

function App() {
  const [player, setPlayer] = useState('')
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState("");
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");


  const handleClick = (event) => {
    event.preventDefault();
    setChoice(event.target.value);
    socket.emit("choice", event.target.value);
  };

  
  socket.on("result", (data) => {
    setResult(data);
    setPlayer1Choice(data.player1Choice);
    setPlayer2Choice(data.player2Choice);
  });

  socket.on('player1Choice', (data) => {
    setPlayer1Choice(data)
  })
  socket.on('player2Choice', (data) => {
    setPlayer2Choice(data)
  })

  useEffect(() => {
    socket.on("receive_name", (data) => {
      setPlayer(data.message)
      console.log(player)
    })
  },[socket])

  

  
  return (
    <div className="App">
      <div className='btns'>
      <button value="rock" onClick={handleClick}>Rock</button>
          <button value="paper" onClick={handleClick}>Paper</button>
          <button value="scissors" onClick={handleClick}>Scissors</button>
      </div>
          
          <p>You choose: {choice}</p>
          <p>Result: {result}</p>
          <p>1 chose: {player1Choice}</p>
          <p> 2 chose: {player2Choice}</p>
        
    </div>
  );
  
}

export default App;

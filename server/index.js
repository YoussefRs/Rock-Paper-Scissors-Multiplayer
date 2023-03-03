const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);
app.use(express.static('public'));

const io = new Server(server, {
  cors: {
    origin : '*',
    methods: ['GET', 'POST']
  }
});


let player1Choice = "";
let player2Choice = "";

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('choice', (data) => {
    console.log(data)
    if (!player1Choice) {
      player1Choice = data;
      socket.emit('player1Choice', data);
    } else {
      player2Choice = data;
      let result = "";
      if (player1Choice === "rock" && player2Choice === "scissors" || 
          player1Choice === "paper" && player2Choice === "rock" || 
          player1Choice === "scissors" && player2Choice === "paper") {
        result = "Player 1 wins!";
      } else if (player1Choice === player2Choice) {
        result = "It's a tie!";
      } else {
        result = "Player 2 wins!";
      }
      io.emit('result', result);
      io.emit('player1Choice', player1Choice);
      io.emit('player2Choice', player2Choice);
      player1Choice = "";
      player2Choice = "";
    }
  });
  socket.on('send_name', (data) => {
    socket.emit("receive_name", data)
  })
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors"); // socket io has cors issue
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  },
});

io.on("connection", (socket) => {

  console.log(socket.id,"connected");

    socket.on("join", (roomId) => {
        socket.join(roomId);
        console.log(`user with id ${socket.id} joined room ${roomId}`);
    });

socket.on("sendMessage", (data) => {
    console.log(data);
    // socket.to(data.room).emit("message", data);
    socket.to(data.room).emit("receive_message", data);
});

  socket.on("disconnect", () => {
    console.log("user disconnected",socket.id);
  });
});

server.listen(4000, () => {
  console.log("listening on port:4000");
});

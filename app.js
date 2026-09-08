const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const port = 5000;
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", msg);
    });

    socket.on('disconnect',(socket )=>{
        console.log("Disconnedted Successfully");
    })
});

server.listen(port, () => {
    console.log("Server is Listening...");
});